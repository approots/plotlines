<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Read extends Controller {

    public function action_index()
    {
        $view = View::factory('appread/index');

        $config = Kohana::$config->load('database')->get('default');
        //$config = $config->get('connection');
        $hostname = $config['connection']['hostname'];
        $database = $config['connection']['database'];
        $username = $config['connection']['username'];
        $password = $config['connection']['password'];

        $connection = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

        $sql = 'select * from story';
        $query = $connection->query($sql);
        $stories = $query->fetchAll();

        $view->test = "a test message";
        $view->stories = $stories;
        $this->response->body($view);
    }

    public function action_story()
    {
        $id = $this->request->param('id',FALSE);
        echo "hi: " . $id;
    }

}