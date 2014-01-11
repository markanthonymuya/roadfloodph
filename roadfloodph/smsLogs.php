<?php
require('../key/access.php');

date_default_timezone_set("Asia/Manila");

$unitSimNumber = $_GET['unitSimNumber'];

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