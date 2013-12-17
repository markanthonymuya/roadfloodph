<?php

require ('../globelabsapi/GlobeApi.php');

$json = file_get_contents('php://input');
$json = stripslashes($json);
$message = json_decode($json, true);

//if we received a message
if($message) {
	$globe = new GlobeApi('v1');
	$sms = $globe->sms(6775);
	$unitNumber = 0;
	
	//check if valid json
	if(!isset($message['inboundSMSMessageList']['inboundSMSMessage'])) {
		return 'Not Set inboundSMSMessage';
	}

	$con=mysqli_connect("localhost","markmuya_rfdb","roadfloodJKJK","roadfloodph");
	
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	//parse all items in the received message
	foreach($message['inboundSMSMessageList']['inboundSMSMessage'] as $item) {
		
		//if valid
		if(!isset($item['message'], $item['senderAddress'])) {
			continue;	
		}
	
		//replace tel:+63 of outbound into ''
		$result = mysqli_query($con,'SELECT * FROM subscriber WHERE subscriberContact = \''.str_replace('tel:+63', '', $item['senderAddress']).'\' LIMIT 1');
		$user = mysqli_fetch_array($result);

		// user
		// user[0] => userId
		// user[1] => access_token
		// user[2] => phonenumber
		// $item['message']

		if($user) {
			date_default_timezone_set("Asia/Manila");
			$asOfDate = date("Y-m-d");
			$asOfTime = date("g:i A");
			//$message = 'i received your message: '.$item['message']." as of".$asOfVar;
	    	$roadFloodLevel = $item['message'];
			mysqli_query($con, "UPDATE unitleveldetection SET unitWaterLevel='$roadFloodLevel', unitDateAsOf='$asOfDate', unitTimeAsOf='$asOfTime' WHERE unitId='$unitNumber'");
			mysqli_query($con, "INSERT INTO roadfloodlogs (unitId, roadFloodLevel, unitSIMNumber, unitStatus, asOf) VALUES ('$unitNumber', '$roadFloodLevel', 'somethingNumber', 'Active', '$asOfVar')");
	    	$response = $sms->sendMessage($user['1'], $user['2'], $message);
		}
	}
}	

?>