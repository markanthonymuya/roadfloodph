<?php

	date_default_timezone_set("Asia/Manila");
	$asOfDate = date("Y/m/d");
 	$asOfTime = date("H:i:s");
	
		
		//eto po ung two requirement data ng php file
 		//it needs 2 strings from our vb to post a facebook post.
		$senderNumber = $_POST['senderAddress'];
		$senderMessage = $_POST['message'];
		//kung kaya, sa ating vb ay may ganito
		//request.Method = "POST"
        //Dim postData As String
        //postData = "senderAddress=" & citizenNumber & "&message=" & citizenMessage
        //kailangan same name po ang maibabato sa php file
        // in this case, it should be 'senderAddress' and 'message'

			//search for 6 letter keyword for service request
			if(substr_compare($senderMessage, "RF CITIZEN", 0, 9) == 0){

				$credential = $senderNumber;
				for($i=2; $i<=6; $i++){
					$credential[$i] = "*";
				}
				
				$citizenMessage = "[CITIZEN REPORT] ".str_replace('RF CITIZEN ', '', $senderMessage)." ---> FROM RoadFloodPH SMS Subscriber 0".$credential." [FBPOST ".time()."]";

				require_once('../facebook/facebook.php');
				require_once('../key/fbKey.php');						        
			    				
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
								$numberOfSearch = "successful to FB.";
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
		

			}

	
		$selection['senderNumber'] = $senderNumber;
		$selection['senderMessage'] = $senderMessage;
		$selection['numberOfSearch'] = $numberOfSearch;
		$selection['floodUpdate'] = "ok";

		header("Content-type:application/json");
		echo json_encode($selection);

?>