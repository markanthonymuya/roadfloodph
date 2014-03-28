<?php
 $con = mysql_connect("localhost","root","root");
 if (!$con)
   {
   die('Could not connect: ' . mysql_error());
   }

 mysql_select_db("roadfloodph", $con);

 $result = mysql_query("SELECT unitName FROM unitregistration");

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