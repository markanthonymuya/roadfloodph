<?php

 require('../key/access.php');

 $resultFlood = mysqli_query($con, "SELECT updateLogId FROM unitsmsupdatelogs ORDER BY updateLogId DESC LIMIT 1");
 $resultPower = mysqli_query($con, "SELECT updateLogId FROM unitsmspowerupdatelogs ORDER BY updateLogId DESC LIMIT 1");


$selection = array();
$rowFlood = mysqli_fetch_array($resultFlood);
$rowPower = mysqli_fetch_array($resultPower);


$selection['floodUpdate'] = $rowFlood['updateLogId'];
$selection['powerUpdate'] = $rowPower['updateLogId'];

header("Content-type:application/json");
echo json_encode($selection);

mysqli_close($con);
?>