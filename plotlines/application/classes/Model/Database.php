<?php defined('SYSPATH') or die('No direct script access.');

class Model_Database
{
    public static function connection()
    {
        $config = Kohana::$config->load('database')->get('default');
        //$config = $config->get('connection');
        $hostname = $config['connection']['hostname'];
        $database = $config['connection']['database'];
        $username = $config['connection']['username'];
        $password = $config['connection']['password'];

        $connection = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

        return $connection;
    }
}