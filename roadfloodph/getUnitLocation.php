<?php
require('../key/access.php');

 $result = mysqli_query($con, "SELECT unitName, unitRegion, unitStatus FROM unitregistration");

 $selection = array();
 $counter = 1;
 $generalCounter = 0;
 while($row = mysqli_fetch_array($result))
   {
   	$generalCounter++;
    $selection['unitName'.$counter] = $row['unitName'];
    $selection['unitRegion'.$counter] = $row['unitRegion'];
    $selection['unitStatus'.$counter] = $row['unitStatus'];
    $counter++;
   }

$selection['generalCounter'] = $generalCounter;

header("Content-type:application/json");
echo json_encode($selection);

 ?> 