<?php

 mysql_select_db("markmuya_roadflood_db", $con);

 $result = mysql_query("SELECT logId FROM roadfloodlogs ORDER BY logId DESC LIMIT 1");

 $selection = 0;
 $counter = 1;
 while($row = mysql_fetch_array($result))
   {
    $selection = $row['logId'];
    $counter++;
   }

 echo $selection;

 mysql_close($con);
 ?> 