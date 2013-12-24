<?php
 
 require('../key/access.php');

 $unitCode = $_POST['unitCode'];
 $unitNumber = $_POST['unitNumber'];
 $unitViewing = $_POST['unitViewing'];
 $unitRegion = $_POST['unitRegion'];
 $unitName = $_POST['unitName'];
 $unitStatus = "not activated";
 $ownerId = $_POST['ownerId'];
 $unitSmsKeyword = $_POST['unitSmsKeyword'];
 date_default_timezone_set("Asia/Manila");
 $dateAdded = date("Y/m/d");
 $timeAdded = date("H:i:s");

 //checks availability of unit code during registration
 $resultUnitSearch = mysqli_query($con,"SELECT unitCode FROM unitlist WHERE ownerId='0' AND unitId ='0' AND unitCode='$unitCode' LIMIT 1");
 $unit = mysqli_fetch_array($resultUnitSearch);

 $smsKeywordSearch = mysqli_query($con,"SELECT unitSmsCode FROM unitregistration WHERE unitSmsCode='$unitSmsKeyword'");
 $keyword = mysqli_fetch_array($smsKeywordSearch);

if($unit){
	 if(!$keyword){
		 mysqli_query($con, "INSERT INTO unitregistration (unitSimNumber, unitViewing, unitRegion, unitName, unitStatus, frequency, ownerId, dateAdded, timeAdded, accessToken, unitSmsCode) VALUES ('$unitNumber', '$unitViewing', '$unitRegion', '$unitName', '$unitStatus', '2.0', $ownerId, '$dateAdded', '$timeAdded', '', '$unitSmsKeyword')");

		 $getUnitRegId = mysqli_query($con,"SELECT unitId FROM unitregistration WHERE unitSimNumber='$unitNumber' AND unitName='$unitName' AND dateAdded='$dateAdded' AND timeAdded='$timeAdded' AND unitSmsCode='$unitSmsKeyword' LIMIT 1");
	 	 $registration = mysqli_fetch_array($getUnitRegId);
	 	 $unitId = $registration['unitId'];

		 mysqli_query($con, "UPDATE unitlist SET dateAdded='$dateAdded', timeAdded='$timeAdded', ownerId='$ownerId', unitId='$unitId' WHERE unitCode='$unitCode'");
		 $resultMsg = "successful";
	 }
	 else{
		$resultMsg = "keyword unavailable";
	 }
}
else{
	$resultMsg = "unit code unavailable";
}

 header("Content-type:application/json");
 echo json_encode($resultMsg);

 ?>