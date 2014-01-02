<?php

require ('../globelabsapi/GlobeApi.php');

$json = file_get_contents('php://input');
$json = stripslashes($json);
$message = json_decode($json, true);

//if we received a message
if($message) {

	$globe = new GlobeApi('v1');
	$sms = $globe->sms(1668);
	
	$greetmessage = "i received your message";
	$sms->sendMessage("m61UThl6s0PimODh7HcGHxzcjC3TF9H1uo0qA77sI_k", "9275628107", $greetmessage);
}	

?>