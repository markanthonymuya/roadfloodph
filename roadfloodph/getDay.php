<?php

 	$selection = array();
	$dateToday = date("Y/m/d")." "."00:00:00";
	$selection['today'] = strtotime($dateToday, "2013/01/01 00:00:00");
	$tomorrow = strtotime('+1 day', strtotime($dateToday));
	$dateTomorrow = date('Y/m/d', $tomorrow);
	$selection['tomorrow'] = strtotime($dateTomorrow, "2013/01/01 00:00:00");
	
	header("Content-type:application/json");
	echo json_encode($selection);

?>