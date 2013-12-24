<?php

require ('../globelabsapi/GlobeApi.php');

$json = file_get_contents('php://input');
$json = stripslashes($json);
$message = json_decode($json, true);

//if we received a message
if($message) {
	$globe = new GlobeApi('v1');
	$sms = $globe->sms(6775);
	
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
		$senderNumber = str_replace('tel:+63', '', $item['senderAddress']);
		$resultUnitSearch = mysqli_query($con,"SELECT unitId, unitSimNumber FROM unitregistration WHERE unitSimNumber = '$senderNumber' LIMIT 1");
		$user = mysqli_fetch_array($resultUnitSearch);

		$resultTemp = mysqli_query($con,"SELECT unitSimNumber, reportedFloodLevel FROM unitsmstemplogs WHERE unitSimNumber = '$senderNumber' ORDER BY tempLogId DESC LIMIT 1");
		$inTemp = mysqli_fetch_array($result);
		
		//check temporary storage for previous reported flood level
		if($inTemp['reportedFloodLevel'] ==  $item['message']){
			$inTemp = true;
		}
		else{
			$inTemp = false;	
		}

		// user
		// user[0] => userId
		// user[1] => access_token
		// user[2] => phonenumber
		// $item['message']

		date_default_timezone_set("Asia/Manila");
		$asOfDate = date("Y/m/d");
		$asOfTime = date("g:i A");
	    $roadFloodLevel = $item['message'];
	    $unitNumber = $user['unitId'];


		if($user && $inTemp) {
			mysqli_query($con, "UPDATE unitleveldetection SET unitWaterLevel='$roadFloodLevel', unitDateAsOf='$asOfDate', unitTimeAsOf='$asOfTime' WHERE unitId='$unitNumber'");
			mysqli_query($con, "INSERT INTO unitsmsupdatelogs VALUES ('','$senderNumber', '$roadFloodLevel', '$asOfDate', '$asOfTime')");
		}
		elseif($user){
			mysqli_query($con, "INSERT INTO unitsmstemplogs VALUES ('','$senderNumber', '$roadFloodLevel', '$asOfDate', '$asOfTime')");
	    	$response = $sms->sendMessage("RESEND");
		}
		else{
			//no response for unregistered unit numbers
			//instead, those messages will remain in temp db log
		}
	}
}	

?>