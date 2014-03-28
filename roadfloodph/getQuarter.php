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