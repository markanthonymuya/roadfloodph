<?php
require('../key/access.php');
// $resultUnitPower = mysqli_query($con, "SELECT unitId, unitPowerLevel FROM unitpowermonitoring"); not yet done that will show power in selection menu

$selection = array();
$publicUnitsId = array();
$counter = 1;
$generalCounter = 0;
$resultUnitReg = mysqli_query($con, "SELECT unitId, unitViewing, unitName, unitRegion, unitStatus FROM unitregistration WHERE unitViewing='public' AND unitStatus='ACTIVATED'");


while($row = mysqli_fetch_array($resultUnitReg)){
	$generalCounter++;
	$publicUnitsId[$counter] = $row['unitId'];
   	$selection['unitName'.$counter] = $row['unitName'];
	$selection['unitRegion'.$counter] = $row['unitRegion'];
	$selection['unitStatus'.$counter] = $row['unitStatus'];
	$counter++;
}

$counter = 1;

$resultUnitLevel = mysqli_query($con, "SELECT unitId, unitWaterLevel, unitDateAsOf, unitTimeAsOf FROM unitleveldetection");

while($row = mysqli_fetch_array($resultUnitLevel)){
	if($row['unitId'] == $publicUnitsId[$counter]){
	    $selection['unitId'.$counter] = $unitId;
	    $selection['roadFloodLevel'.$counter] = $row['unitWaterLevel'];
	    $selection['asOf'.$counter] = $row['unitDateAsOf']." ".$row['unitTimeAsOf'];
	    $counter++;
	}
}

$selection['generalCounter'] = $generalCounter;

header("Content-type:application/json");
echo json_encode($selection);

mysqli_close($con);
?> 