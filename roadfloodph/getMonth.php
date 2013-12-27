<?php

	$year = $_GET['year'];
	$i = $_GET['month'];

	$month = array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");

 	$selection = array();
	$selection['currentMonth'] = strtotime($year."/".$month[$i]."/01 00:00:00", "2013/01/01 00:00:00");
	$i++;

	if($i == 12){
		$i = 0;
		$year++;
	}

	//next month
	$selection['nextMonth'] = strtotime($year."/".$month[$i]."/01 00:00:00", "2013/01/01 00:00:00");
	
	header("Content-type:application/json");
	echo json_encode($selection);

?>