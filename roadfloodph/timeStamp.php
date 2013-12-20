<?php

	$year = $_GET['year'];
 	$selection = array();
 	$month = array("","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	for ($i=1; $i <= 12; $i++) { 
		$selection['month'.$i] = strtotime($month[$i]." ".$year, "2013/01/01 00:00:00");
	}
	$dateToday = date("Y/m/d")." "."00:00:00";
	$selection['today'] = strtotime($dateToday, "2013/01/01 00:00:00");
	$tomorrow = strtotime('+1 day', strtotime($dateToday));
	$dateTomorrow = date('Y/m/d', $tomorrow);
	$selection['tomorrow'] = strtotime($dateTomorrow, "2013/01/01 00:00:00");
	
	header("Content-type:application/json");
	echo json_encode($selection);

?>