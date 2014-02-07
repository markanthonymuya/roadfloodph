<?php



 require('../key/access.php');

 $resultFlood = mysqli_query($con, "SELECT updateLogId FROM unitsmsupdatelogs ORDER BY updateLogId DESC LIMIT 1");


$selection = array();
$rowFlood = mysqli_fetch_array($resultFlood);


$selection['floodUpdate'] = $rowFlood['updateLogId'];

header("Content-type:application/json");
echo json_encode($selection);

mysqli_close($con);
?>