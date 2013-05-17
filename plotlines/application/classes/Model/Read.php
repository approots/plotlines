<?php defined('SYSPATH') or die('No direct script access.');

class Model_Read {

    public static function stories()
    {
        $sql = 'select * from story';
        $query = Model_Database::connection()->query($sql);
        return $query->fetchAll();
    }

    public static function story($id)
    {
        $sql = 'select * from story where id = :id';

        $query = Model_Database::connection()->prepare($sql);
        if (! $query->execute(array(":id" => $id))) {
            $error = $query->errorInfo();
            throw new Exception($query->errorInfo($error[2]));
        }

        return $query->fetch();
    }

    // TODO verify link destinations resolve to a passage. Do this here?
    public static function passages($storyId)
    {
        $result = array();
        $passage = null;
        $link = null;

        $sql = 'SELECT passage.id, passage.title, passage.body, link.choice, link.destination_id
            FROM passage left join link on passage.id = link.passage_id
            WHERE passage.story_id = :story_id order by passage.id';

        $query = Model_Database::connection()->prepare($sql);
        if (! $query->execute(array(":story_id" => $storyId))) {
            $error = $query->errorInfo();
            throw new Exception($query->errorInfo($error[2]));
        }

        while ($row = $query->fetch())
        {
            // only add link if there is a destination
            if ($row['destination_id'])
            {
                $link = array('choice' => $row['choice'], 'destination_id' => $row['destination_id']);
            }
            else
            {
                $link = null;
            }


            if (isset($result[$row['id']]))
            {
                if ($link)
                {
                    $result[$row['id']]['links'][] = $link;
                }
            }
            else
            {
                $passage = array(
                    'id' => $row['id'],
                    'title' => $row['title'],
                    'body' => $row['body'],
                );

                if ($link)
                {
                    $passage['links'] = array($link);
                }

                $result[$row['id']] = $passage;
            }


        }
        return $result;
    }
}