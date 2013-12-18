<?php

 require('../key/access.php');

 $result = mysqli_query($con, "SELECT updateLogId FROM unitsmsupdatelogs ORDER BY updateLogId DESC LIMIT 1");

 $selection = 0;
$row = mysqli_fetch_array($result);


 $selection = $row['updateLogId'];

echo $selection;

 ?>