<?php
	include('../eden/eden.php');
	//start session
	session_start();
	//get auth
	$auth = eden('facebook')->auth('527859597304472', '93afb1aa46abdd71410fe6b2d30e7d6b', 'http://roadfloodph.cloudapp.net/auth');
	 
	//if no code and no session
	if(!isset($_GET['code']) && !isset($_SESSION['fb_token'])) {
	    //redirect to login
	    $login = $auth->getLoginUrl();
	     
	    header('Location: '.$login);
	    exit;
	}
	 
	//Code is returned back from facebook
	if(isset($_GET['code'])) {
	    //save it to session
	    $access = $auth->getAccess($_GET['code']);
	    $_SESSION['fb_token'] = $access['access_token'];
	}


	$graph = eden('facebook')->graph($_SESSION['fb_token']);
	$url = 'http://roadfloodph.cloudapp.net/';
	
	$post = $graph->post('Testing RoadFloodPh Facebook App...');
	$post->setLink($url);
	$post->create();

?>