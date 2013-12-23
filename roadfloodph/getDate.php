<?php
	$myTimestamp = $_GET['timestamp'];

	$hellow = getDate($myTimestamp);

	header("Content-type:application/json");
	echo json_encode($hellow);
?>