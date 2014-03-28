<?php
	// Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

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