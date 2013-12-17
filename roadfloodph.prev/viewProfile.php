<?php

 $result = mysql_query("SELECT * FROM roadfloodowner");

 $selection = array();
 $counter = 1;
 while($row = mysql_fetch_array($result))
   {
    $selection['userNumber'.$counter] = $row['firstName'] . " " . $row['lastName'];
    $counter++;
   }

 header("Content-type:application/json");
 echo json_encode($selection);

 mysql_close($con);
 ?> 