<?php
 

 mysql_select_db("markmuya_roadflood_db", $con);

 $result = mysql_query("SELECT unitBarangay, unitCity, unitRegion, unitStatus FROM roadfloodunit");

 $selection = array();
 $counter = 1;
 $generalCounter = 0;
 while($row = mysql_fetch_array($result))
   {
   	$generalCounter++;
    $selection['unitBarangay'.$counter] = $row['unitBarangay'];
    $selection['unitCity'.$counter] = $row['unitCity'];
    $selection['unitRegion'.$counter] = $row['unitRegion'];
    $selection['unitStatus'.$counter] = $row['unitStatus'];
    $counter++;
   }

$selection['generalCounter'] = $generalCounter;

header("Content-type:application/json");
 echo json_encode($selection);

 mysql_close($con);
 ?> 