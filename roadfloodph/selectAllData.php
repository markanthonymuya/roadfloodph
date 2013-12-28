<?php
require('../key/access.php');

 $result = mysqli_query($con, "SELECT unitId, unitWaterLevel, unitDateAsOf, unitTimeAsOf FROM unitleveldetection");

 $selection = array();
 $counter = 1;
 $generalCounter = 0;
 while($row = mysqli_fetch_array($result))
   {
   	$generalCounter++;
    $selection['unitId'.$counter] = $row['unitId'];
    $selection['roadFloodLevel'.$counter] = $row['unitWaterLevel'];
    $selection['asOf'.$counter] = $row['unitDateAsOf']." ".$row['unitTimeAsOf'];
    $counter++;
   }

$selection['generalCounter'] = $generalCounter;

header("Content-type:application/json");
 echo json_encode($selection);

 ?> 