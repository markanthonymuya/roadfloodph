<?php
echo "hellow world";

require ('../globelabsapi/GlobeApi.php');
echo "hellow world";

$json = file_get_contents('php://input');
$json = stripslashes($json);
$message = json_decode($json, true);


//if we received a message
/*if($message) {*/
	$globe = new GlobeApi('v1');
	$sms = $globe->sms(6775);

	//check if valid json
	/*if(!isset($message['inboundSMSMessageList']['inboundSMSMessage'])) {
		return 'Not Set inboundSMSMessage';
	}
*/
	echo "connecting...<br>";

	$con=mysqli_connect("localhost","markmuya_rfdb","roadfloodJKJK","roadfloodph");
	
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	//parse all items in the received message
/*	foreach($message['inboundSMSMessageList']['inboundSMSMessage'] as $item) {
		//if valid
		if(!isset($item['message'], $item['senderAddress'])) {
			continue;	
		}
*/	

		$item = array();
		$item['senderAddress'] = "tel:+639275628107";
		echo "results: <br>";
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
			/*$con=mysqli_connect("localhost","markmuya_rfdb","roadfloodJKJK","markmuya_roadflood_db");
			echo "connecting to another db";
			if (mysqli_connect_errno())
			{
				echo "Failed to connect to MySQL: " . mysqli_connect_error();
				echo "failed to connect to another db";
			}*/
			$message = $user['1']." ".$user['2']." ".'i received your message: '.$item['message'];
			echo $message;
	    	$response = $sms->sendMessage($user['1'], $user['2'], $message);
		}
	/*}
}	
*/
?>