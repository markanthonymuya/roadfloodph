<?php

	$year = $_GET['year'];

 	$selection = array();
	$selection['startPoint'] = strtotime($year."/01/01 00:00:00", "2013/01/01 00:00:00");
	$selection['endPoint'] = strtotime($year."/12/31 00:00:00", "2013/01/01 00:00:00");
	
	header("Content-type:application/json");
	echo json_encode($selection);

?>