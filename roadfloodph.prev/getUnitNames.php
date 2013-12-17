<?php


 mysql_select_db("markmuya_roadflood_db", $con);

 $result = mysql_query("SELECT unitName FROM roadfloodunit");

 $selection = array();
 $counter = 1;
 $generalCounter = 0;
 while($row = mysql_fetch_array($result))
   {
   	$generalCounter++;
    $selection['unitName'.$counter] = $row['unitName'];
    $counter++;
   }

$selection['generalCounter'] = $generalCounter;

header("Content-type:application/json");
 echo json_encode($selection);

 mysql_close($con);
 ?> 