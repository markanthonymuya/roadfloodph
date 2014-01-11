<?php
require_once("facebook.php");
echo "mark";
require('../key/fbKey.php');

  $facebook = new Facebook($config);
echo "anthony";
  /* make the API call */
echo "muya";
  
	$response = $facebook->api("/545570175517084/feed", "POST", array ('message' => 'This is a test message'));
	/* handle the result */
echo "muya";
?>