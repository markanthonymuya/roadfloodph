<?php

require ('../globelabsapi/GlobeApi.php');

	$globe = new GlobeApi('v1');
	$sms = $globe->sms(3567);
    $response = $sms->sendMessage("eP2OOz04U54NT93Pr74X-XSs2Bdv6KDnzNSHAYcd5w0", "9275628107", "Testing accepted.");
    if($response){
    	echo "sent";
    }
?>