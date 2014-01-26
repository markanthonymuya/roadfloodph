<?php

require ('../globelabsapi/GlobeApi.php');
require ('../../key/globeKey.php');
require ('../../key/access.php');

$globe = new GlobeApi();
$auth = $globe->auth($appId, $appSecret);
$sms = $globe->sms($shortCodeFromGlobe);

$access_token = "";
$subscriber_number = "";

if(isset($_GET['access_token']) && isset($_GET['subscriber_number'])){
	$access_token = $_GET['access_token'];
	$subscriber_number = $_GET['subscriber_number'];
	
	$resultUnitSearch = mysqli_query($con,"SELECT unitId, unitSimNumber, accessToken FROM unitregistration WHERE unitSimNumber = '$subscriber_number' LIMIT 1");
	$unitSearch = mysqli_fetch_array($resultUnitSearch);

	$resultSubscriberSearch = mysqli_query($con,"SELECT subscriberId, subscriberContact, subscriberAT FROM subscriber WHERE subscriberContact = '$subscriber_number' LIMIT 1");
	$subscriberSearch = mysqli_fetch_array($resultSubscriberSearch);

	if(mysqli_num_rows($resultUnitSearch) == 1){
		$affectedRows = mysqli_query($con, "UPDATE unitregistration SET accessToken='$access_token' WHERE unitSimNumber='$subscriber_number'");
		if($affectedRows > 0){
			$response = $sms->sendMessage($access_token, $subscriber_number, "Your road flood unit SIM number registration has been renewed.");
			exit;
		}
	}
	elseif(mysqli_num_rows($resultSubscriberSearch) == 1){
		$affectedRows = mysqli_query($con, "UPDATE subscriber SET subscriberAT='$access_token' WHERE subscriberContact='$subscriber_number'");
		if($affectedRows > 0){
			$response = $sms->sendMessage($access_token, $subscriber_number, "Thank you for coming back. You may visit our website at http://roadfloodph.cloudapp.net/. To start, text 'RF HELP' to 2158".$shortCodeFromGlobe.".");
			exit;
		}
	}
	else{
		date_default_timezone_set("Asia/Manila");
		$asOfDate = date("Y/m/d");
	 	$asOfTime = date("H:i:s");
		$affectedRows = mysqli_query($con, "INSERT INTO subscriber (subscriberAT, subscriberContact, subscriberTotalSubscriptions, subscriberCredit, subscriberStatus, dateAdded, timeAdded) VALUES ('$access_token', '$subscriber_number', 0, 0.00, 'ACTIVE', '$asOfDate', '$asOfTime')");
		if($affectedRows > 0){
			$response = $sms->sendMessage($access_token, $subscriber_number, "Welcome to RoadFloodPH. You may visit our website at http://roadfloodph.cloudapp.net/. To start, text 'RF HELP' to 2158".$shortCodeFromGlobe.".");
			exit;
		}
	}
}


if(isset($_GET['code'])){
	$_SESSION['code'] = $_GET['code'];
}

	    
if(!isset($_SESSION['code'])) {
	$loginUrl = $auth->getLoginUrl();
	header('Location: '.$loginUrl);
	exit;
}
	    
if(!isset($_SESSION['access_token'])) {
	$response = $auth->getAccessToken($_SESSION['code']);
	$_SESSION['access_token'] = $response['access_token'];
	$_SESSION['subscriber_number'] = $response['subscriber_number'];

	$subscriber_number = $_SESSION['subscriber_number'];
	$access_token = $_SESSION['access_token'];
	
	$resultUnitSearch = mysqli_query($con,"SELECT unitId, unitSimNumber, accessToken FROM unitregistration WHERE unitSimNumber = '$subscriber_number' LIMIT 1");
	$unitSearch = mysqli_fetch_array($resultUnitSearch);

	$resultSubscriberSearch = mysqli_query($con,"SELECT subscriberId, subscriberContact, subscriberAT FROM subscriber WHERE subscriberContact = '$subscriber_number' LIMIT 1");
	$subscriberSearch = mysqli_fetch_array($resultSubscriberSearch);

	if(mysqli_num_rows($resultUnitSearch) == 1){
		$affectedRows = mysqli_query($con, "UPDATE unitregistration SET accessToken='$access_token' WHERE unitSimNumber='$subscriber_number'");
		if($affectedRows > 0){
			$response = $sms->sendMessage($access_token, $subscriber_number, "Your road flood unit SIM number registration has been renewed.");
			header('Location: http://roadfloodph.cloudapp.net/admin/');
			exit;
		}
	}
	elseif(mysqli_num_rows($resultSubscriberSearch) == 1){
		$affectedRows = mysqli_query($con, "UPDATE subscriber SET subscriberAT='$access_token' WHERE subscriberContact='$subscriber_number'");
		if($affectedRows > 0){
			$response = $sms->sendMessage($access_token, $subscriber_number, "Thank you for coming back. You may visit our website at http://roadfloodph.cloudapp.net/. To start, text 'RF HELP' to 2158".$shortCodeFromGlobe.".");
			header('Location: http://roadfloodph.cloudapp.net/');
			exit;
		}
	}
	else{
		date_default_timezone_set("Asia/Manila");
		$asOfDate = date("Y/m/d");
	 	$asOfTime = date("H:i:s");
		$affectedRows = mysqli_query($con, "INSERT INTO subscriber (subscriberAT, subscriberContact, subscriberTotalSubscriptions, subscriberCredit, subscriberStatus, dateAdded, timeAdded) VALUES ('$access_token', '$subscriber_number', 1, 0.00, 'active', '$asOfDate', '$asOfTime')");
		if($affectedRows > 0){
			$response = $sms->sendMessage($access_token, $subscriber_number, "Welcome to RoadFloodPH. You may visit our website at http://roadfloodph.cloudapp.net/. To start, text 'RF HELP' to 2158".$shortCodeFromGlobe.".");
			header('Location: http://roadfloodph.cloudapp.net/');
			exit;
		}
	}
}

?>