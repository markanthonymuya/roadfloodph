<?php

	$year = $_GET['year'];
	$i = $_GET['quarter'];

	$startPoint = array("01", "04", "07", "10");
	$endPoint = array("03", "06", "09", "12");
	$endDay = array("31", "30", "30", "31");

 	$selection = array();
	$selection['startPoint'] = strtotime($year."/".$startPoint[$i]."/01 00:00:00", "2013/01/01 00:00:00");
	$selection['endPoint'] = strtotime($year."/".$endPoint[$i]."/".$endDay[$i]." 00:00:00", "2013/01/01 00:00:00");
	
	header("Content-type:application/json");
	echo json_encode($selection);

?>