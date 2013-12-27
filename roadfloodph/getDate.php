<?php
	//converter from timestampt to human readable date
	$currentDate = $_GET['currentDateTs'];
	$nextDate = $_GET['nextDateTs'];

	$timeline = Array();

	$timeline['currentDate'] = getDate($currentDate);
	$timeline['nextDate'] = getDate($nextDate);

	header("Content-type:application/json");
	echo json_encode($timeline);
?>