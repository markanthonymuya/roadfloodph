<?php
 // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
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

if(mysqli_num_rows($resultUnitSearch) == 1){
	if($unitSimNumber  != $unitNumber){
		mysqli_query($con, "UPDATE unitregistration SET accessToken='' WHERE unitSimNumber='$unitSimNumber '");
	}

	$affectedRow = mysqli_query($con, "UPDATE unitregistration SET unitSimNumber='$unitNumber', unitViewing='$unitViewing', unitRegion='$unitRegion', unitName='$unitName', frequency='$unitFrequency', unitSmsNotif='$unitSmsNotif' WHERE unitId='$unitId'");

	if($affectedRow > 0){
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