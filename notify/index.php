<?php

require ('../globelabsapi/GlobeApi.php');
require('../key/access.php');


$json = file_get_contents('php://input');
$json = stripslashes($json);
$message = json_decode($json, true);

//if we received a message
if($message) {
	$globe = new GlobeApi('v1');
	$sms = $globe->sms(1668);
	
	//check if valid json
	if(!isset($message['inboundSMSMessageList']['inboundSMSMessage'])) {
		return 'Not Set inboundSMSMessage';
	}

	
	//parse all items in the received message
	foreach($message['inboundSMSMessageList']['inboundSMSMessage'] as $item) {
		
		//if valid
		if(!isset($item['message'], $item['senderAddress'])) {
			continue;
		}

		//search for 6 letter keyword for service request
		if(substr_compare($item['message'], "FLUPDATE", 0, 6) == 0){

			//extracting data from text message
			$roadFloodLevel = str_replace('FLUPDATE ', '', $item['message']);
			echo $roadFloodLevel." ";
			//replace tel:+63 of outbound into ''
			$senderNumber = str_replace('tel:+63', '', $item['senderAddress']);
			echo $senderNumber;
			$resultUnitSearch = mysqli_query($con,"SELECT unitId, unitSimNumber, accessToken FROM unitregistration WHERE unitSimNumber = '$senderNumber' LIMIT 1");
			$user = mysqli_fetch_array($resultUnitSearch);

			$resultTemp = mysqli_query($con,"SELECT unitSimNumber, reportedFloodLevel FROM unitsmstemplogs WHERE unitSimNumber = '$senderNumber' ORDER BY tempLogId DESC LIMIT 1");
			$inTemp = mysqli_fetch_array($resultTemp);

			$inTempBoolean = false;
			//check temporary storage for previous reported flood level
			if($inTemp['reportedFloodLevel'] ==  $roadFloodLevel){
				$inTempBoolean = true;
			}
			else{
				$inTempBoolean = false;	
			}

			date_default_timezone_set("Asia/Manila");
			$asOfDate = date("Y/m/d");
 			$asOfTime = date("H:i:s");

		    $unitNumber = $user['unitId'];


			if($user && $inTempBoolean) {
				mysqli_query($con, "UPDATE unitleveldetection SET unitWaterLevel='$roadFloodLevel', unitDateAsOf='$asOfDate', unitTimeAsOf='$asOfTime' WHERE unitId='$unitNumber'");
				mysqli_query($con, "INSERT INTO unitsmsupdatelogs (unitSimNumber, reportedFloodLevel, receivedDate, receivedTime) VALUES ('$senderNumber', '$roadFloodLevel', '$asOfDate', '$asOfTime')");
	    		$response = $sms->sendMessage($user["accessToken"], $user["unitSimNumber"], "UPDATED");
			}
			elseif($user){
				mysqli_query($con, "INSERT INTO unitsmstemplogs (unitSimNumber, reportedFloodLevel, receivedDate, receivedTime) VALUES ('$senderNumber', '$roadFloodLevel', '$asOfDate', '$asOfTime')");
	    		$response = $sms->sendMessage($user["accessToken"], $user["unitSimNumber"], "RESEND");
			}
		}

	}
}	

?>