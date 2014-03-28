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
	$point = $_GET['point'];

	$startDate = array("/01/01 00:00:00", "/07/01 00:00:00");
	$endDate = array("/06/30 00:00:00", "/12/31 00:00:00");

 	$selection = array();
	$selection['startPoint'] = strtotime($year.$startDate[$point], "2013/01/01 00:00:00");
	$selection['endPoint'] = strtotime($year.$endDate[$point], "2013/01/01 00:00:00");
	
	header("Content-type:application/json");
	echo json_encode($selection);

?>