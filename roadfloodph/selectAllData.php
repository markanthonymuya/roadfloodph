<?php
require('../key/access.php');

$emailAddress = $_POST['emailAddress'];

if($emailAddress != "public"){
	$resultAdminSearch = mysqli_query($con, "SELECT adminId FROM admin WHERE adminEmail='$emailAddress'");
	$rowAdminSearch = mysqli_fetch_array($resultAdminSearch);

	$resultOwnerSearch = mysqli_query($con, "SELECT ownerId FROM unitowner WHERE ownerEmail='$emailAddress'");
	$rowOwnerSearch = mysqli_fetch_array($resultOwnerSearch);

	$resultUnitReg;

	if(mysqli_num_rows($resultOwnerSearch) == 1){
		$ownerId = $rowOwnerSearch['ownerId'];
		$resultUnitReg = mysqli_query($con, "SELECT unitId, unitViewing, unitName, unitRegion, unitStatus FROM unitregistration WHERE unitViewing='public' AND unitStatus='ACTIVATED' OR ownerId='$ownerId'");
	}
	elseif(mysqli_num_rows($resultAdminSearch) == 1){
		$resultUnitReg = mysqli_query($con, "SELECT unitId, unitViewing, unitName, unitRegion, unitStatus FROM unitregistration");
	}


	$selection = array();
	$publicUnitsId = array();
	$counter = 1;
	$generalCounter = 0;


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
}
else{

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
}

	$selection['generalCounter'] = $generalCounter;

	header("Content-type:application/json");
	echo json_encode($selection);

	mysqli_close($con);

?> 