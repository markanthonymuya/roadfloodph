<?php
	

$asOfVar = date("Y-m-d")." ".date("g:i A");

mysql_query("UPDATE roadfloodlevel SET roadfloodlevel='$roadFloodLevel', asOf='$asOfVar' WHERE unitId='$unitNumber'");

mysql_query("INSERT INTO roadfloodlogs (unitId, roadFloodLevel, unitSIMNumber, unitStatus, asOf) VALUES ('$unitNumber', '$roadFloodLevel', 'somethingNumber', 'Active', '$asOfVar')");

 mysql_close($con);
 ?> 