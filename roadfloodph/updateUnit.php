<?php
 
require('../key/access.php');

 $unitCode = $_POST['unitCode'];
 $unitNumber = $_POST['unitNumber'];
 $unitViewing = $_POST['unitViewing'];
 $unitRegion = $_POST['unitRegion'];
 $unitName = $_POST['unitName'];
 $unitFrequency = $_POST['unitFrequency'];
 $unitSmsNotif = $_POST['unitSmsNotif'];

 //get unitId from unitlist
 $resultUnitSearch = mysqli_query($con,"SELECT unitId FROM unitlist WHERE unitCode='$unitCode' LIMIT 1");
 $unit = mysqli_fetch_array($resultUnitSearch);

 $unitId = $unit['unitId'];

 $resultUnitSearch = mysqli_query($con,"SELECT unitSimNumber FROM unitregistration WHERE unitId='$unitId' LIMIT 1");
 $unitReg = mysqli_fetch_array($resultUnitSearch);

 $unitSimNumber = $unitReg['unitSimNumber'];

if($unit){
	if($unitSimNumber  != $unitNumber){
		mysqli_query($con, "UPDATE unitregistration SET accessToken='' WHERE unitSimNumber='$unitSimNumber '");
	}

	$affectedRow = mysqli_query($con, "UPDATE unitregistration SET unitSimNumber='$unitNumber', unitViewing='$unitViewing', unitRegion='$unitRegion', unitName='$unitName', frequency='$unitFrequency', unitSmsNotif='$unitSmsNotif' WHERE unitId='$unitId'");

	if($affectedRow){
		$resultMsg = "successful";
	}
	else{
		$resultMsg = "no affected rows";
	}
}
else{
	$resultMsg = "error getting unitId";
}


header("Content-type:application/json");
echo json_encode($resultMsg);

mysqli_close($con);
?>