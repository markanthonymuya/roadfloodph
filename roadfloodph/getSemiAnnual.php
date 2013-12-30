<?php

	$year = $_GET['year'];
	$point = $_GET['point'];

	$startDate = array("/01/01 00:00:00", "/07/01 00:00:00");
	$endDate = array("/06/30 00:00:00", "/12/31 00:00:00");

 	$selection = array();
	$selection['startPoint'] = strtotime($year.$startDate[$point], "2013/01/01 00:00:00");
	$selection['endPoint'] = strtotime($year.$endDate[$point], "2013/01/01 00:00:00");
	
	header("Content-type:application/json");
	echo json_encode($selection);

?>