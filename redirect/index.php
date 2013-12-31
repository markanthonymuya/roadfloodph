<?php

require ('../globelabsapi/GlobeApi.php');

$appId = "eMGzMHdByBqf4RiLjGTyzefLnGBrHLd8";
$appSecret = "592c401afde0ae158d6a46c088c78119fa0130b0db54a6d76dd7d8c347317f77";

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