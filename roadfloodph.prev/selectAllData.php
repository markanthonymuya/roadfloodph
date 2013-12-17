<?php


 $result = mysql_query("SELECT unitId, roadFloodLevel, asOf FROM roadfloodlevel");

 $selection = array();
 $counter = 1;
 $generalCounter = 0;
 while($row = mysql_fetch_array($result))
   {
   	$generalCounter++;
    $selection['unitId'.$counter] = $row['unitId'];
    $selection['roadFloodLevel'.$counter] = $row['roadFloodLevel'];
    $selection['asOf'.$counter] = $row['asOf'];
    $counter++;
   }

$selection['generalCounter'] = $generalCounter;

header("Content-type:application/json");
 echo json_encode($selection);

 mysql_close($con);
 ?> 