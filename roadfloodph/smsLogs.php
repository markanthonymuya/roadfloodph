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
    
require('../key/access.php');

date_default_timezone_set("Asia/Manila");

$unitSimNumber = $_POST['unitSimNumber'];

 $result = mysqli_query($con, "SELECT reportedFloodLevel, receivedDate, receivedTime FROM unitsmsupdatelogs where unitSimNumber='$unitSimNumber'");

 $selection = array();
 $counter = 1;
 $generalCounter = 0;
 while($row = mysqli_fetch_array($result))
 {
   	$generalCounter++;
    $selection['reportedFloodLevel'.$counter] = $row['reportedFloodLevel'];
    $selection['receivedDate'.$counter] = $row['receivedDate'];
    $selection['receivedTime'.$counter] = $row['receivedTime'];
    $selection['timestamp'.$counter] = strtotime($row['receivedDate'].' '.$row['receivedTime'], "2013/01/01 00:00:00");
    $counter++;
 }

$selection['generalCounter'] = $generalCounter;

header("Content-type:application/json");
echo json_encode($selection);

mysqli_close($con);
?> 