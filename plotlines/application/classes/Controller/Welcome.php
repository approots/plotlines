<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Welcome extends Controller {

	public function action_index()
	{
	    // todo
		$this->response->body(View::factory('appwrite/index'));
	}

} // End Welcome
