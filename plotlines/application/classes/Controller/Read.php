<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Read extends Controller {

    public function action_index()
    {
        $view = View::factory('appread/index');




/*
        $sql = 'select * from story';
        $query = $connection->query($sql);
        $stories = $query->fetchAll();
*/
        $stories = Model_Read::stories();
        $view->test = "a test message";
        $view->stories = $stories;
        $this->response->body($view);
    }

    public function action_story()
    {
        $id = $this->request->param('id',FALSE);

        $view = View::factory('appread/story');
        $view->story = Model_Read::story($id);
        $view->passages = Model_Read::passages($id);

        $this->response->body($view);
    }

}