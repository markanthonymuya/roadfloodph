<?php

require ('../globelabsapi/GlobeApi.php');
require ('../../key/globeKey.php');
require ('../../key/access.php');


$globe = new GlobeApi();
$auth = $globe->auth($appId, $appSecret);

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

	$unitSimNumber = $_SESSION['subscriber_number'];
	$access_token = $_SESSION['access_token'];

	$affectedRows = mysqli_query($con, "UPDATE unitregistration SET accessToken='$access_token' WHERE unitSimNumber='$unitSimNumber'");
	echo $affectedRows;
	if($affectedRows > 0){
		header('Location: http://roadfloodph.cloudapp.net/admin/');
		exit;
	}
	else{
		echo '[RoadFloodPH website message]: We found no record of your number '.$unitSimNumber.' in our database. Please recheck your number registered for your unit.<br>';
		echo '<a href="http://roadfloodph.cloudapp.net/admin/">Back to Admin Page</a>';
	}
}

?>