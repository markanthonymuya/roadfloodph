<?php
 require('../key/access.php');

 $result = mysqli_query("SELECT updateLogId FROM unitsmsupdatelogs ORDER BY updateLogId DESC LIMIT 1");

 $selection = 0;
 $counter = 1;
 while($row = mysqli_fetch_array($result))
   {
    $selection = $row['updateLogId'];
    $counter++;
   }

 echo $selection;

 ?>