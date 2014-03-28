<?php
	date_default_timezone_set("Asia/Manila");
	$roadFloodLevel = $_POST["roadFloodLevel"];
	$unitNumber = $_POST["unitNumber"];

 $con = mysql_connect("localhost","root","root");
 if (!$con)
   {
   die('Could not connect: ' . mysql_error());
   }

 mysql_select_db("roadfloodph", $con);

date_default_timezone_set("Asia/Manila");
 $dateAdded = date("Y/m/d");
 $timeAdded = date("H:i:s");

mysql_query("UPDATE unitleveldetection SET unitWaterLevel='$roadFloodLevel', unitDateAsOf='$dateAdded', unitTimeAsOf='$timeAdded' WHERE unitId='$unitNumber'");

$query = mysql_query("SELECT unitSimNumber FROM unitRegistration WHERE unitId='$unitNumber'");
$unitProfile = mysql_fetch_array($query);

$unitSimNumber = $unitProfile['unitSimNumber'];

mysql_query("INSERT INTO unitsmsupdatelogs (unitSimNumber, reportedFloodLevel, receivedDate, receivedTime) VALUES ('$unitSimNumber', '$roadFloodLevel', '$dateAdded', '$timeAdded')");

 $selection = array();

 $selection['unitSimNumber'] = $unitSimNumber;
 
$selection['unitNumber'] = $unitNumber;
$selection['roadFloodLevel'] = $roadFloodLevel;

header("Content-type:application/json");
 echo json_encode($selection);

 mysql_close($con);
 ?> 