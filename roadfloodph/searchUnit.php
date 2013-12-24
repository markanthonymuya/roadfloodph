<?php
 
 require('../key/access.php');

 $ownerId = $_POST['ownerId'];
 

 //check if the unit has the same number
 $result = mysqli_query($con, "SELECT * from unitregistration WHERE ownerId='$ownerId'");

 $selection = array();
 $counter = 1;
 $generalCounter = 0;

 while($row = mysqli_fetch_array($result))
   {
   	$generalCounter++;
    $selection['unitId'.$counter] = $row['unitId'];
    $unitId = $selection['unitId'.$counter];
    $unitList = mysqli_query($con, "SELECT unitCode from unitlist WHERE ownerId='$ownerId' AND unitId='$unitId'");
    $unitCodeDB = mysqli_fetch_array($unitList);
    $selection['unitCode'.$counter] = $unitCodeDB['unitCode'];
    $selection['unitSimNumber'.$counter] = $row['unitSimNumber'];
    $selection['unitViewing'.$counter] = $row['unitViewing'];
    $selection['unitRegion'.$counter] = $row['unitRegion'];
    $selection['unitName'.$counter] = $row['unitName'];
    $selection['unitStatus'.$counter] = $row['unitStatus'];
    $selection['unitAT'.$counter] = $row['accessToken'];
    $selection['unitFreq'.$counter] = $row['frequency'];
    $selection['unitSmsCode'.$counter] = $row['unitSmsCode'];
    $counter++;
   }


	$selection['generalCounter'] = $generalCounter;

	header("Content-type:application/json");
	echo json_encode($selection);

 ?>