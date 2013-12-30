<?php
require('../key/access.php');

$resultUnitReg = mysqli_query($con, "SELECT unitId, unitViewing, unitName, unitRegion, unitStatus FROM unitregistration");
$resultUnitLevel = mysqli_query($con, "SELECT unitId, unitWaterLevel, unitDateAsOf, unitTimeAsOf FROM unitleveldetection");

$selection = array();
$counter = 1;

$publicUnits = array();

while($row = mysqli_fetch_array($resultUnitReg)){
	//allowing to view public units only
	if($row['unitViewing'] == "public"){
    	$publicUnits['unitViewing'.$row['unitId']] = "public";
    	$selection['unitName'.$counter] = $row['unitName'];
	    $selection['unitRegion'.$counter] = $row['unitRegion'];
	    $selection['unitStatus'.$counter] = $row['unitStatus'];
	    $counter++;
	}
	else{
    	$publicUnits['unitViewing'.$row['unitId']] = "private";
	}
}

$counter = 1;
$generalCounter = 0;

while($row = mysqli_fetch_array($resultUnitLevel)){
	$unitId = $row['unitId'];
	if($publicUnits['unitViewing'.$unitId] == "public"){
		$generalCounter++;
	    $selection['unitId'.$counter] = $unitId;
	    $selection['roadFloodLevel'.$counter] = $row['unitWaterLevel'];
	    $selection['asOf'.$counter] = $row['unitDateAsOf']." ".$row['unitTimeAsOf'];
	    $counter++;
	}
}

$selection['generalCounter'] = $generalCounter;

header("Content-type:application/json");
echo json_encode($selection);

?> 