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

	$con=mysqli_connect("http://roadflood.cloudapp.net","roadfloodPH","ro@dfloodph!","roadfloodph");
	
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
	
		//gamit ka ng replace tel:+63 kasi may prefix na tel:+63 yung laman ni outbound
		$result = mysqli_query($con,'SELECT * FROM subscriber WHERE subscriberContact = \''.str_replace('tel:+63', '', $item['senderAddress']).'\' LIMIT 1');
		$user = mysqli_fetch_array($result);

		// user
		// user[0] => userId
		// user[1] => access_token
		// user[2] => phonenumber

		//ito yung gagawin nya pag valid yung user, pwede mo dito iparse yung message using
		// $item['message']

		if($user) {
			$message = 'i received your message: '.$item['message'];
			echo $message;
	    	$response = $sms->sendMessage($user['1'], $user['2'], $message);
		}
	}
}	

?>