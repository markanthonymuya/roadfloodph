<?php

require ('../globelabsapi/GlobeApi.php');
require ('../../key/globeKey.php');
require ('../../key/access.php');

$json = file_get_contents('php://input');
$json = stripslashes($json);
$message = json_decode($json, true);

//if we received a message
if($message) {

	$globe = new GlobeApi();
	$sms = $globe->sms($shortCodeFromGlobe);

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

		$senderNumber = $item['senderAddress'];
		//default value thrown by globe is in this format 'tel:+639271234567'
		//that's why we need to replace 'tel:+63' with ''
		//so that what will be left is the processable number 9271234567
		$senderNumber = str_replace('tel:+63', '', $senderNumber);
		$senderMessage = $item['message'];

		$resultUnitSearch = mysqli_query($con,"SELECT unitId, unitSimNumber, accessToken FROM unitregistration WHERE unitSimNumber = '$senderNumber' LIMIT 1");
		$unitSearch = mysqli_fetch_array($resultUnitSearch);

		$resultSubscriberSearch = mysqli_query($con,"SELECT subscriberId, subscriberContact, subscriberAT, subscriberTotalSubscriptions FROM subscriber WHERE subscriberContact = '$senderNumber' LIMIT 1");
		$subscriberSearch = mysqli_fetch_array($resultSubscriberSearch);

		if(mysqli_num_rows($resultUnitSearch) == 1){
			
			$unitId = $unitSearch['unitId'];

			//for data validation purpose.
			//creator of temporary data update request and resending of information
			//to secure data integrity.
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
				
				if($current['unitWaterLevel'] != $roadFloodLevel){	

					if($inTempBoolean){

						mysqli_query($con, "UPDATE unitleveldetection SET unitWaterLevel='$roadFloodLevel', unitDateAsOf='$asOfDate', unitTimeAsOf='$asOfTime' WHERE unitId='$unitId'");
						mysqli_query($con, "INSERT INTO unitsmsupdatelogs (unitSimNumber, reportedFloodLevel, receivedDate, receivedTime) VALUES ('$senderNumber', '$roadFloodLevel', '$asOfDate', '$asOfTime')");
			    		$response = $sms->sendMessage($unitSearch["accessToken"], $unitSearch["unitSimNumber"], "UPDATED");

			    		//facebook poster upon recieving flood update of a publicly-declared unit
						$regQuery = mysqli_query($con, "SELECT unitId, unitName, unitSmsCode from unitregistration WHERE unitSimNumber='$senderNumber' AND unitStatus='ACTIVATED' AND unitViewing='public'");
						$regDetails = mysqli_fetch_array($regQuery);

			     		if(mysqli_num_rows($regQuery) == 1){	     			
				     		$regId = $regDetails['unitId'];
				     		$regCode = $regDetails['unitSmsCode'];
				     		$regName = $regDetails['unitName'];

			     			$floodLevelQuery = mysqli_query($con, "SELECT unitWaterLevel, unitTimeAsOf from unitleveldetection WHERE unitId='$regId'");

			     			if(mysqli_num_rows($floodLevelQuery) == 1){

						    	$floodDetails = mysqli_fetch_array($floodLevelQuery);
						    	$floodLevel = floatval($floodDetails['unitWaterLevel']);
						    	$floodTime = $floodDetails['unitTimeAsOf'];

						    	$passabilityMsg = " NOT-PASSABLE to ";

						    	if ($floodLevel <= 11) {
						            $passabilityMsg = " Passable to ALL vehicles. ";
						        }
						        elseif ($floodLevel >= 36) {
						            $passabilityMsg = $passabilityMsg."ALL TYPES of vehicles.";
						        }
						        elseif ($floodLevel >= 18) {
						            $passabilityMsg = $passabilityMsg."LIGHT & MEDIUM vehicles.";
						        }
						        elseif ($floodLevel >= 12) {
						            $passabilityMsg = $passabilityMsg."LIGHT vehicles.";
						        }				        

						        require_once('../../facebook/facebook.php');
						        require_once('../../key/fbKey.php');						        

						    	$fbPost = $regCode." detects ".$floodLevel." inches as of ".$floodTime.'.'.$passabilityMsg.' Want auto notification? Text "RF<space>AUTO<space>'.$regCode.'" to 2158'.$shortCodeFromGlobe."."." [FBPOST ".time()."]";
			    				
						    	$config = array();
								$config['appId'] = $appId;
								$config['secret'] = $appSecret;
								$config['fileUpload'] = false; // optional
								$fb = new Facebook($config);
								
								// this is the access token for Fan Page
								$params = array("access_token" => $accessToken, "message" => $fbPost);


						    	$fbSending = "successful";				    	
								
								try {
			    					//$response = $sms->sendMessage($unitSearch["accessToken"], $unitSearch["unitSimNumber"], "Trying to post");
								    $ret = $fb->api($fbPage, 'POST', $params);
								} 
								catch(Exception $e) {
								    $fbSending = "error";
								}
								  
								$delay = 5;
								
								if(strcmp($fbSending, "error") == 0){
			    					//$response = $sms->sendMessage($unitSearch["accessToken"], $unitSearch["unitSimNumber"], "ReTrying to post");
								  	while(strcmp($fbSending, "error") == 0){
									  	if($delay <= 20){
										  	sleep($delay);
											try {
											    $ret = $fb->api($fbPage, 'POST', $params);
												$fbSending = "successful";
											}catch(Exception $e) {
												$fbSending = "error";
												$delay = $delay + 5;
											}
										}
										else{
											//report unsuccessful facebook post.
											$fbSending = "failed to post in facebook page";
										}
									}
			    					//$response = $sms->sendMessage($unitSearch["accessToken"], $unitSearch["unitSimNumber"], $fbSending." ".$delay);
								}
						    	
						    	$floodLevelMessage = $regCode." detects ".$floodLevel." inches as of ".$floodTime.'.'.$passabilityMsg;

								//sender of update to subscribers of automatic subscription
								$resultAutoSubscribers = mysqli_query($con,"SELECT subscriberContact FROM subscription WHERE unitId = '$regId'");

			     				if(mysqli_num_rows($resultAutoSubscribers) > 0){
			     					while($autoSubscribers = mysqli_fetch_array($resultAutoSubscribers)){
			     						$subscriber_number =$autoSubscribers['subscriberContact'];
				     					$resultSubscriberToken = mysqli_query($con,"SELECT subscriberAT FROM subscriber WHERE subscriberContact = '$subscriber_number'");
										$subscriberToken = mysqli_fetch_array($resultSubscriberToken);
										$subscriberToken = $subscriberToken['subscriberAT'];
			    						$response = $sms->sendMessage($subscriberToken, $subscriber_number, $floodLevelMessage);
									}
			     				}
							}
				     	}
					}
					else{
						mysqli_query($con, "INSERT INTO unitsmstemplogs (unitSimNumber, smsRequest, receivedDate, receivedTime) VALUES ('$senderNumber', '$senderMessage', '$asOfDate', '$asOfTime')");
			    		$response = $sms->sendMessage($unitSearch["accessToken"], $unitSearch["unitSimNumber"], "RESEND");
					}
				}
			}
			elseif(substr_compare($item['message'], "TEST ", 0, 4) == 0){
				
				$sendTo = str_replace('TEST ', '', $item['message']);

				$resultUnitSearch = mysqli_query($con,"SELECT unitSimNumber, accessToken FROM unitregistration WHERE unitSimNumber = '$sendTo' LIMIT 1");
				$unitSearch = mysqli_fetch_array($resultUnitSearch);

				$resultSubscriberSearch = mysqli_query($con,"SELECT subscriberContact, subscriberAT FROM subscriber WHERE subscriberContact = '$sendTo' LIMIT 1");
				$subscriberSearch = mysqli_fetch_array($resultSubscriberSearch);

				if(mysqli_num_rows($resultUnitSearch) == 1){
			    	$response = $sms->sendMessage($unitSearch["accessToken"], $unitSearch["unitSimNumber"], "TESTING FROM UNIT TO ANOTHER UNIT/SELF");
			    }
			    elseif(mysqli_num_rows($resultSubscriberSearch) == 1){
			    	$response = $sms->sendMessage($subscriberSearch["subscriberAT"], $subscriberSearch["subscriberContact"], "TESTING FROM UNIT TO SUBSCRIBER");
			    }
			}
		}
		//if not an update from road flood units
		//it will be considered as an sms request from user subscribers
		elseif(mysqli_num_rows($resultSubscriberSearch) == 1){

			//creator of subscribers incoming messages
			mysqli_query($con, "INSERT INTO incomingmessages (incomingContact, incomingMessage, receivedDate, receivedTime) VALUES ('$senderNumber', '$senderMessage', '$asOfDate', '$asOfTime')");

			if(substr_compare($item['message'], "RF LIST", 0, 6) == 0){				

	     		$resultPublicUnits = mysqli_query($con, "SELECT unitName, unitSmsCode from unitregistration WHERE unitViewing='public' AND unitStatus='ACTIVATED'");

				if(mysqli_num_rows($resultPublicUnits) > 0){
	     			
	     			$listOfUnits = "";

					while($row = mysqli_fetch_array($resultPublicUnits)){
						$listOfUnits = $listOfUnits." ".$row['unitSmsCode']." for ".$row['unitName']." --- ";
					}

					$smsMessage = "Available SMSCODE of public units: ".$listOfUnits.'. Text "RF<space><SMSCODE>" to get current update of the unit, or "RF<space><SMSCODE><space>AUTO" for automatic unit notification. Send to 2158'.$shortCodeFromGlobe.".";
					while(strlen($smsMessage) > 0){
						$smsTrim158 = substr($smsMessage, 0, 160);
						$sms->sendMessage($subscriberSearch["subscriberAT"], $subscriberSearch["subscriberContact"], $smsTrim158);
						$smsMessage = str_replace($smsTrim158, '', $smsMessage);
					}
				}
			}
			elseif(substr_compare($item['message'], "RF AUTO", 0, 6) == 0){
	     		$smsCodeRequest = str_replace('RF AUTO ', '', $item['message']);	     		

				$regQuery = mysqli_query($con, "SELECT unitId, unitName from unitregistration WHERE unitSmsCode='$smsCodeRequest' AND unitStatus='ACTIVATED' AND unitViewing='public'");
				$regDetails = mysqli_fetch_array($regQuery);

				$regId = $regDetails['unitId'];
		     	$regCode = $smsCodeRequest;
		     	$regName = $regDetails['unitName'];

		     	$subscriberTotalSubscriptions = intval($subscriberSearch['subscriberTotalSubscriptions']);

	     		if(mysqli_num_rows($regQuery) == 1){

	     			$subscriptionQuery = mysqli_query($con, "SELECT subscriptionId from subscription WHERE subscriberContact='$senderNumber' AND subscriptionStatus='ACTIVE' AND unitId='$regId' LIMIT 1");
					$subscriptionDetails = mysqli_fetch_array($subscriptionQuery);
	     			
	     			//limiting free subscriptions to 5
	     			if(mysqli_num_rows($subscriptionQuery) == 1){
			    		$response = $sms->sendMessage($subscriberSearch["subscriberAT"], $subscriberSearch["subscriberContact"], "You already registered with this automatic notification from ".$regCode.". You will receive notification when the flood unit updates the website.");
					}
					else{
						//insert to subscription table
						$insertQuery = mysqli_query($con, "INSERT INTO subscription (subscriberContact, unitId, subscriptionStatus, subscriptionDate, subscriptionTime) VALUES ('$senderNumber', '$regId', 'ACTIVE', '$asOfDate', '$asOfTime')");
						++$subscriberTotalSubscriptions;
						$updateQuery = mysqli_query($con, "UPDATE subscriber SET subscriberTotalSubscriptions='$subscriberTotalSubscriptions' WHERE subscriberContact='$senderNumber'");

						if($insertQuery && $updateQuery){
			    			$response = $sms->sendMessage($subscriberSearch["subscriberAT"], $subscriberSearch["subscriberContact"], "You are now successfully subscribe to automatic notification from ".$regCode.". Notification will be available when flood unit updates the website.");
			    		}
					}

	     			$floodLevelQuery = mysqli_query($con, "SELECT unitWaterLevel, unitTimeAsOf from unitleveldetection WHERE unitId='$regId'");

	     			if(mysqli_num_rows($floodLevelQuery) == 1){
				    	$floodDetails = mysqli_fetch_array($floodLevelQuery);
				    	$floodLevel = floatval($floodDetails['unitWaterLevel']);
				    	$floodTime = $floodDetails['unitTimeAsOf'];

				    	$passabilityMsg = " NOT-PASSABLE to ";

				    	if ($floodLevel <= 11) {
				            $passabilityMsg = " Passable to ALL vehicles. ";
				        }
				        elseif ($floodLevel >= 36) {
				            $passabilityMsg = $passabilityMsg."ALL TYPES of vehicles.";
				        }
				        elseif ($floodLevel >= 18) {
				            $passabilityMsg = $passabilityMsg."LIGHT & MEDIUM vehicles.";
				        }
				        elseif ($floodLevel >= 12) {
				            $passabilityMsg = $passabilityMsg."LIGHT vehicles.";
				        }				        

				    	$floodLevelMessage = "LATEST UPDATE: ".$regCode." detects ".$floodLevel." inches as of ".$floodTime.'.'.$passabilityMsg;
						$sms->sendMessage($subscriberSearch["subscriberAT"], $subscriberSearch["subscriberContact"], $floodLevelMessage);
					}
		     	}
		     	else{
		     		$errorMessage = "Sorry, ".$smsCodeRequest.' is not a valid public SMSCODE. Text "RF<space>LIST" to 2158'.$shortCodeFromGlobe.' to see available SMSCODEs.';
					$sms->sendMessage($subscriberSearch["subscriberAT"], $subscriberSearch["subscriberContact"], $errorMessage);
		     	}
			}
			elseif(substr_compare($item['message'], "RF CITIZEN", 0, 9) == 0){

				$credential = $senderNumber;
				for($i=2; $i<=6; $i++){
					$credential[$i] = "*";
				}
				
				$citizenMessage = "[CITIZEN REPORT] ".str_replace('RF CITIZEN ', '', $item['message'])." ---> FROM RoadFloodPH SMS Subscriber 0".$credential." [FBPOST ".time()."]";

				require_once('../../facebook/facebook.php');
				require_once('../../key/fbKey.php');						        
			    				
				$config = array();
				$config['appId'] = $appId;
				$config['secret'] = $appSecret;
				$config['fileUpload'] = false; // optional
				$fb = new Facebook($config);
						
				// this is the access token for Fan Page
				$params = array("access_token" => $accessToken, "message" => $citizenMessage);


				$fbSending = "successful";			    	
								
				try {
				    $ret = $fb->api($fbPage, 'POST', $params);
				} 
				catch(Exception $e) {
				    $fbSending = "error";
				}
								  
				$delay = 5;
								
				if(strcmp($fbSending, "error") == 0){
				  	while(strcmp($fbSending, "error") == 0){
					  	if($delay <= 20){
						  	sleep($delay);
							try {
							    $ret = $fb->api($fbPage, 'POST', $params);
								$fbSending = "successful";
							}catch(Exception $e) {
								$fbSending = "error";
								$delay = $delay + 5;
							}
						}
						else{
							//report unsuccessful facebook post.
							$fbSending = "failed to post in facebook page";
						}
					}
				}

				if(strcmp($fbSending, "successful") == 0){
					$gratitudeMessage = "Thank you for being concern to our fellowmen. Your message has been successfully posted on our Facebook Page.";
				}
				else{
					$gratitudeMessage = "Thank you for being concern to our fellowmen. But ur message has not been successfully posted on Facebook Page after we did several tries. Pls try again later.";
				}
				$sms->sendMessage($subscriberSearch["subscriberAT"], $subscriberSearch["subscriberContact"], $gratitudeMessage);	

			}
			elseif(substr_compare($item['message'], "RF HELP", 0, 6) == 0){
				$helpMessage = 'Welcome to RoadFloodPH! Text "RF LIST" to 2158'.$shortCodeFromGlobe.' to see the list of available SMSCODEs.';
				$sms->sendMessage($subscriberSearch["subscriberAT"], $subscriberSearch["subscriberContact"], $helpMessage);
			}
			elseif(substr_compare($item['message'], "RF", 0, 1) == 0){
				$smsCodeRequest = str_replace('RF ', '', $item['message']);

				$regQuery = mysqli_query($con, "SELECT unitId, unitName from unitregistration WHERE unitSmsCode='$smsCodeRequest' AND unitStatus='ACTIVATED' AND unitViewing='public'");
				$regDetails = mysqli_fetch_array($regQuery);

	     		if(mysqli_num_rows($regQuery) == 1){	     			
		     		$regId = $regDetails['unitId'];
		     		$regCode = $smsCodeRequest;
		     		$regName = $regDetails['unitName'];

	     			$floodLevelQuery = mysqli_query($con, "SELECT unitWaterLevel, unitTimeAsOf from unitleveldetection WHERE unitId='$regId'");

	     			if(mysqli_num_rows($floodLevelQuery) == 1){
				    	$floodDetails = mysqli_fetch_array($floodLevelQuery);
				    	$floodLevel = floatval($floodDetails['unitWaterLevel']);
				    	$floodTime = $floodDetails['unitTimeAsOf'];

				    	$passabilityMsg = " NOT-PASSABLE to ";

				    	if ($floodLevel <= 11) {
				            $passabilityMsg = " Passable to ALL vehicles. ";
				        }
				        elseif ($floodLevel >= 36) {
				            $passabilityMsg = $passabilityMsg."ALL TYPES of vehicles.";
				        }
				        elseif ($floodLevel >= 18) {
				            $passabilityMsg = $passabilityMsg."LIGHT & MEDIUM vehicles.";
				        }
				        elseif ($floodLevel >= 12) {
				            $passabilityMsg = $passabilityMsg."LIGHT vehicles.";
				        }				        

				    	$floodLevelMessage = $regCode." detects ".$floodLevel." inches as of ".$floodTime.'.'.$passabilityMsg.' Want auto notification? Text "RF<space>AUTO<space>'.$regCode.'" to 2158'.$shortCodeFromGlobe.".";
						$sms->sendMessage($subscriberSearch["subscriberAT"], $subscriberSearch["subscriberContact"], $floodLevelMessage);
					}
		     	}
		     	else{
		     		$errorMessage = "Sorry, ".$smsCodeRequest.' is not a valid public SMSCODE. Text "RF LIST" to 2158'.$shortCodeFromGlobe.' to see available SMSCODEs.';
					$sms->sendMessage($subscriberSearch["subscriberAT"], $subscriberSearch["subscriberContact"], $errorMessage);
		     	}
			}
			elseif(substr_compare($item['message'], "TEST ", 0, 4) == 0){
				
				$sendTo = str_replace('TEST ', '', $item['message']);

				$resultUnitSearch = mysqli_query($con,"SELECT unitSimNumber, accessToken FROM unitregistration WHERE unitSimNumber = '$sendTo' LIMIT 1");
				$unitSearch = mysqli_fetch_array($resultUnitSearch);

				if(mysqli_num_rows($resultUnitSearch) == 1){
			    	$response = $sms->sendMessage($unitSearch["accessToken"], $unitSearch["unitSimNumber"], "TESTING FROM SUBSCRIBER TO UNIT");
			    }
			    elseif(mysqli_num_rows($resultSubscriberSearch) == 1){
			    	$response = $sms->sendMessage($subscriberSearch["subscriberAT"], $subscriberSearch["subscriberContact"], "TESTING FROM SUBSCRIBER TO ANOTHER SUBSCRIBER/SELF");
			    }
			}
		}
	}
}


?>