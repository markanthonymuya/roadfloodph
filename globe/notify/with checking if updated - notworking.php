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

	date_default_timezone_set("Asia/Manila");
	$asOfDate = date("Y/m/d");
 	$asOfTime = date("H:i:s");
	
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

			$resultUnitSearch = unitSearch($item['senderAddress']);
			$unit = mysqli_fetch_array($resultUnitSearch);

		    $unitId = $unit['unitId'];

			$presentUpdates = mysqli_query($con,"SELECT unitWaterLevel FROM unitleveldetection WHERE unitId = '$unitId'");
			$current = mysqli_fetch_array($presentUpdates);

			$resultTemp = mysqli_query($con,"SELECT reportedFloodLevel FROM unitsmstemplogs WHERE unitSimNumber = '$senderNumber' ORDER BY tempLogId DESC LIMIT 1");
			$inTemp = mysqli_fetch_array($resultTemp);

			$inTempBoolean = false;
			$updated = false;
			
			//checks for temporary log of reported flood level and to check if it is already in this present updated value
			if($inTemp['reportedFloodLevel'] ==  $roadFloodLevel){
				$inTempBoolean = true;
			}
			
			if($inTemp['reportedFloodLevel'] == $current['unitWaterLevel']){
				$updated = true;
			}
			
			if($unit){
				if($updated && $inTempBoolean) {
					//server is already updated, data update will be disregarded
		    		$response = $sms->sendMessage($unit["accessToken"], $unit["unitSimNumber"], "UPDATED");
				}
				elseif($inTempBoolean){
					mysqli_query($con, "UPDATE unitleveldetection SET unitWaterLevel='$roadFloodLevel', unitDateAsOf='$asOfDate', unitTimeAsOf='$asOfTime' WHERE unitId='$unitId'");
					mysqli_query($con, "INSERT INTO unitsmsupdatelogs (unitSimNumber, reportedFloodLevel, receivedDate, receivedTime) VALUES ('$senderNumber', '$roadFloodLevel', '$asOfDate', '$asOfTime')");
		    		$response = $sms->sendMessage($unit["accessToken"], $unit["unitSimNumber"], "UPDATED");
				}
				elseif($inTempBoolean==false){
					mysqli_query($con, "INSERT INTO unitsmstemplogs (unitSimNumber, reportedFloodLevel, receivedDate, receivedTime) VALUES ('$senderNumber', '$roadFloodLevel', '$asOfDate', '$asOfTime')");
		    		$response = $sms->sendMessage($unit["accessToken"], $unit["unitSimNumber"], "RESEND");
				}
				else{
		    		$response = $sms->sendMessage($unit["accessToken"], $unit["unitSimNumber"], "Something went wrong");
				}
			}
		}
		elseif(substr_compare($item['message'], "PWUPDATE", 0, 6) == 0){
			
			//extracting data from text message
			$unitPowerLevel = str_replace('PWUPDATE ', '', $item['message']);

			$resultUnitSearch = unitSearch($item['senderAddress']);
			$unit = mysqli_fetch_array($resultUnitSearch);

		    $unitId = $unit['unitId'];

			$presentUpdates = mysqli_query($con,"SELECT unitPowerLevel FROM unitpowermonitoring WHERE unitId = '$unitId'");
			$current = mysqli_fetch_array($presentUpdates);

			$resultTemp = mysqli_query($con,"SELECT reportedFloodLevel FROM unitsmstemplogs WHERE unitSimNumber = '$senderNumber' ORDER BY tempLogId DESC LIMIT 1");
			$inTemp = mysqli_fetch_array($resultTemp);

			$inTempBoolean = false;
			$updated = false;
			
			//checks for temporary log of reported flood level and to check if it is already in this present updated value
			if($inTemp['reportedFloodLevel'] ==  $roadFloodLevel){
				$inTempBoolean = true;
			}
			
			if($inTemp['reportedFloodLevel'] == $current['unitWaterLevel']){
				$updated = true;
			}
			
			if($unit){
				if($updated) {
					//server is already updated, data update will be disregarded
		    		$response = $sms->sendMessage($unit["accessToken"], $unit["unitSimNumber"], "UPDATED");
				}
				elseif($inTempBoolean){
					mysqli_query($con, "UPDATE unitleveldetection SET unitWaterLevel='$roadFloodLevel', unitDateAsOf='$asOfDate', unitTimeAsOf='$asOfTime' WHERE unitId='$unitId'");
					mysqli_query($con, "INSERT INTO unitsmsupdatelogs (unitSimNumber, reportedFloodLevel, receivedDate, receivedTime) VALUES ('$senderNumber', '$roadFloodLevel', '$asOfDate', '$asOfTime')");
		    		$response = $sms->sendMessage($unit["accessToken"], $unit["unitSimNumber"], "UPDATED");
				}
				elseif($inTempBoolean==false){
					mysqli_query($con, "INSERT INTO unitsmstemplogs (unitSimNumber, reportedFloodLevel, receivedDate, receivedTime) VALUES ('$senderNumber', '$roadFloodLevel', '$asOfDate', '$asOfTime')");
		    		$response = $sms->sendMessage($unit["accessToken"], $unit["unitSimNumber"], "RESEND");
				}
			}
		}

	}
}

function unitSearch($senderNumber){
	//replace tel:+63 of outbound into ''
	$senderNumber = str_replace('tel:+63', '', $senderNumber);
	$resultUnitSearch = mysqli_query($con,"SELECT unitId, unitSimNumber, accessToken FROM unitregistration WHERE unitSimNumber = '$senderNumber' LIMIT 1");
	return $resultUnitSearch;
}	

?>