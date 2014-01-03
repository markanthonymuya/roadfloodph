<?php

require ('../globelabsapi/GlobeApi.php');

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

	date_default_timezone_set("Asia/Manila");
	$asOfDate = date("Y/m/d");
 	$asOfTime = date("H:i:s");

	include('../key/access.php');
	
	//parse all items in the received message
	foreach($message['inboundSMSMessageList']['inboundSMSMessage'] as $item) {
		
		//if valid
		if(!isset($item['message'], $item['senderAddress'])) {
			continue;
		}

		$senderNumber = $item['senderAddress'];
		$senderNumber = str_replace('tel:+63', '', $senderNumber);
		$requestSms = $item['message'];

		$resultUnitSearch = mysqli_query($con,"SELECT unitId, unitSimNumber, accessToken FROM unitregistration WHERE unitSimNumber = '$senderNumber' LIMIT 1");
		$unitSearch = mysqli_fetch_array($resultUnitSearch);

		$unitId = $unitSearch['unitId'];

		$resultTemp = mysqli_query($con,"SELECT smsRequest FROM unitsmstemplogs WHERE unitSimNumber = '$senderNumber' ORDER BY tempLogId DESC LIMIT 1");
		$inTemp = mysqli_fetch_array($resultTemp);

		$inTempBoolean = false;

		//checks for temporary log of reported flood level
		if($inTemp['smsRequest'] ==  $requestSms){
			$inTempBoolean = true;
		}

		//search for 6 letter keyword for service request
		if(substr_compare($item['message'], "FLUPDATE", 0, 6) == 0){
			//extracting data from text message
			$roadFloodLevel = str_replace('FLUPDATE ', '', $item['message']);

			$presentValue = mysqli_query($con,"SELECT unitWaterLevel FROM unitleveldetection WHERE unitId = '$unitId'");
			$current = mysqli_fetch_array($presentValue);
			
			if($unitSearch && $current['unitWaterLevel'] != $roadFloodLevel){	
				if($inTempBoolean){
					mysqli_query($con, "UPDATE unitleveldetection SET unitWaterLevel='$roadFloodLevel', unitDateAsOf='$asOfDate', unitTimeAsOf='$asOfTime' WHERE unitId='$unitId'");
					mysqli_query($con, "INSERT INTO unitsmsupdatelogs (unitSimNumber, reportedFloodLevel, receivedDate, receivedTime) VALUES ('$senderNumber', '$roadFloodLevel', '$asOfDate', '$asOfTime')");
		    		$response = $sms->sendMessage($unitSearch["accessToken"], $unitSearch["unitSimNumber"], "UPDATED");
				}
				elseif($inTempBoolean==false){
					mysqli_query($con, "INSERT INTO unitsmstemplogs (unitSimNumber, smsRequest, receivedDate, receivedTime) VALUES ('$senderNumber', '$requestSms', '$asOfDate', '$asOfTime')");
		    		$response = $sms->sendMessage($unitSearch["accessToken"], $unitSearch["unitSimNumber"], "RESEND");
				}
			}
		}
		elseif(substr_compare($item['message'], "PWUPDATE", 0, 6) == 0){
			//extracting data from text message
			$powerLevel = str_replace('PWUPDATE ', '', $item['message']);

			$presentValue = mysqli_query($con,"SELECT unitPowerLevel FROM unitpowermonitoring WHERE unitId = '$unitId'");
			$current = mysqli_fetch_array($presentValue);
			
			if($unitSearch && $current['unitPowerLevel'] != $powerLevel){	
				if($inTempBoolean){
					mysqli_query($con, "UPDATE unitpowermonitoring SET unitPowerLevel='$powerLevel', unitDateAsOf='$asOfDate', unitTimeAsOf='$asOfTime' WHERE unitId='$unitId'");
		    		mysqli_query($con, "INSERT INTO unitsmspowerupdatelogs (unitSimNumber, reportedPowerLevel, receivedDate, receivedTime) VALUES ('$senderNumber', '$powerLevel', '$asOfDate', '$asOfTime')");
		    		$response = $sms->sendMessage($unitSearch["accessToken"], $unitSearch["unitSimNumber"], "UPDATED");
				}
				elseif($inTempBoolean==false){
					mysqli_query($con, "INSERT INTO unitsmstemplogs (unitSimNumber, smsRequest, receivedDate, receivedTime) VALUES ('$senderNumber', '$requestSms', '$asOfDate', '$asOfTime')");
		    		$response = $sms->sendMessage($unitSearch["accessToken"], $unitSearch["unitSimNumber"], "RESEND");
				}
			}
		}
	}
}


?>