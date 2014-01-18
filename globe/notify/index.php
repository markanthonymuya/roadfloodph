<?php

require ('../globelabsapi/GlobeApi.php');
$json = file_get_contents('php://input');
$json = stripslashes($json);
$message = json_decode($json, true);

//if we received a message
if($message) {
	$globe = new GlobeApi('v1');
	$sms = $globe->sms(3567);
	
	//check if valid json
	if(!isset($message['inboundSMSMessageList']['inboundSMSMessage'])) {
		return 'Not Set inboundSMSMessage';
	}

	date_default_timezone_set("Asia/Manila");
	$asOfDate = date("Y/m/d");
 	$asOfTime = date("H:i:s");

	//creating connection to database with username and password
	include('../../key/access.php');
	
	//parse all items in the received message
	foreach($message['inboundSMSMessageList']['inboundSMSMessage'] as $item) {
		
		//if valid
		if(!isset($item['message'], $item['senderAddress'])) {
			continue;
		}

		$senderNumber = $item['senderAddress'];
		//default value thrown by globe is in this format 'tel:+639271234567'
		//that's why we need to replace 'tel:+63' with ''
		//so that what will be left is the processable number 9271234567
		$senderNumber = str_replace('tel:+63', '', $senderNumber);
		$senderMessage = $item['message'];

		$resultUnitSearch = mysqli_query($con,"SELECT unitId, unitSimNumber, accessToken FROM unitregistration WHERE unitSimNumber = '$senderNumber' LIMIT 1");
		$unitSearch = mysqli_fetch_array($resultUnitSearch);

		$resultSubscriberSearch = mysqli_query($con,"SELECT unitId, unitSimNumber, accessToken FROM unitregistration WHERE unitSimNumber = '$senderNumber' LIMIT 1");
		$subscriberSearch = mysqli_fetch_array($resultSubscriberSearch);

		$unitId = $unitSearch['unitId'];

		$resultTemp = mysqli_query($con,"SELECT smsRequest FROM unitsmstemplogs WHERE unitSimNumber = '$senderNumber' ORDER BY tempLogId DESC LIMIT 1");
		$inTemp = mysqli_fetch_array($resultTemp);

		$inTempBoolean = false;


		//checks for temporary log of reported flood level
		if($inTemp['smsRequest'] ==  $senderMessage){
			$inTempBoolean = true;
		}

		//search for 6 letter keyword for service request
		if(substr_compare($item['message'], "FLUPDATE", 0, 7) == 0){
			//extracting data from text message
			$roadFloodLevel = str_replace('FLUPDATE ', '', $item['message']);

			$presentValue = mysqli_query($con,"SELECT unitWaterLevel FROM unitleveldetection WHERE unitId = '$unitId'");
			$current = mysqli_fetch_array($presentValue);
			
			if($unitSearch && $current['unitWaterLevel'] != $roadFloodLevel){	
				if($inTempBoolean){
					mysqli_query($con, "UPDATE unitleveldetection SET unitWaterLevel='$roadFloodLevel', unitDateAsOf='$asOfDate', unitTimeAsOf='$asOfTime' WHERE unitId='$unitId'");
					mysqli_query($con, "INSERT INTO unitsmsupdatelogs (unitSimNumber, reportedFloodLevel, receivedDate, receivedTime) VALUES ('$senderNumber', '$roadFloodLevel', '$asOfDate', '$asOfTime')");
		    		$response = $sms->sendMessage($unitSearch["accessToken"], $unitSearch["unitSimNumber"], "UPDATED jkshdkfjhas");
				}
				elseif($inTempBoolean==false){
					mysqli_query($con, "INSERT INTO unitsmstemplogs (unitSimNumber, smsRequest, receivedDate, receivedTime) VALUES ('$senderNumber', '$senderMessage', '$asOfDate', '$asOfTime')");
		    		$response = $sms->sendMessage($unitSearch["accessToken"], $unitSearch["unitSimNumber"], "RESEND");
				}
			}
		}
		elseif(substr_compare($item['message'], "PWUPDATE", 0, 7) == 0){
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
					mysqli_query($con, "INSERT INTO unitsmstemplogs (unitSimNumber, smsRequest, receivedDate, receivedTime) VALUES ('$senderNumber', '$senderMessage', '$asOfDate', '$asOfTime')");
		    		$response = $sms->sendMessage($unitSearch["accessToken"], $unitSearch["unitSimNumber"], "RESEND");
				}
			}
		}
		elseif(substr_compare($item['message'], "READY", 0, 4) == 0){
			
			if($unitSearch){
				mysqli_query($con, "UPDATE unitregistration SET unitStatus='ACTIVATED' WHERE unitId='$unitId'");
		    	$response = $sms->sendMessage($unitSearch["accessToken"], $unitSearch["unitSimNumber"], "READY OK");
			}
		}
		elseif(substr_compare($item['message'], "UNREADY", 0, 6) == 0){
			
			if($unitSearch){
				mysqli_query($con, "UPDATE unitregistration SET unitStatus='MISALIGNED' WHERE unitId='$unitId'");
			}
		}
		elseif(substr_compare($item['message'], "RF LIST", 0, 6) == 0){
     		$resultPublicUnits = mysqli_query($con, "SELECT unitName, unitSmsCode from unitregistration WHERE unitViewing='public' AND unitStatus='ACTIVATED'");

			if($resultPublicUnits){
     			
     			$listOfUnits = "";

				while($row = mysqli_fetch_array($resultPublicUnits)){
					$listOfUnits = $listOfUnits." ".$row['unitSmsCode']." for ".$row['unitName']." --- ";
				}

				$smsMessage = "Available SMSCODE of public units: ".$listOfUnits.'. Text "RF<space><SMSCODE>" to get current update of the unit, or "RF<space><SMSCODE><space>AUTO" for automatic unit notification. Send to 21583567';
				while(strlen($smsMessage) > 0){
					$smsTrim158 = substr($smsMessage, 0, 160);
					$sms->sendMessage($unitSearch["accessToken"], $unitSearch["unitSimNumber"], $smsTrim158);
					$smsMessage = str_replace($smsTrim158, '', $smsMessage);
				}
			}
		}
		elseif(substr_compare($item['message'], "TEST", 0, 3) == 0){
		    $response = $sms->sendMessage("eP2OOz04U54NT93Pr74X-XSs2Bdv6KDnzNSHAYcd5w0", "9275628107", "Testing accepted.");
		    $response = $sms->sendMessage("Zd1VoHtd-KMtyqlHUOfgNpUmM5238k04NDLy7vyZGh0", "9154677374", "Testing accepted 2.");
		}
	}
}


?>