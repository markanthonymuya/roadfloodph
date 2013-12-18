<?php

require ('../globelabsapi/GlobeApi.php');
echo "muya ";
$appId = "6KLXKFjgxGEu67iaoxTxxzu8oLxoFp4z";
$appSecret = "b079889f98602660c7f666ad8a593221ce376bad5287f7b2a94ef92952d2526e";

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
	echo $_SESSION['subscriber_number']." ".$_SESSION['access_token'];
}

?>