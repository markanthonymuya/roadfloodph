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
    $selection['unitSimNumber'.$counter] = $row['unitSimNumber'];
    $selection['unitViewing'.$counter] = $row['unitViewing'];
    $selection['unitRegion'.$counter] = $row['unitRegion'];
    $selection['unitName'.$counter] = $row['unitName'];
    $selection['unitStatus'.$counter] = $row['unitStatus'];
    $selection['unitAT'.$counter] = $row['accessToken'];
    $counter++;
   }

	$selection['generalCounter'] = $generalCounter;

	header("Content-type:application/json");
	echo json_encode($selection);

 ?>