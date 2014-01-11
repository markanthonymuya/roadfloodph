<?php
 
 require('../key/access.php');

 $emailAddress = $_POST['emailAddress'];
 // $emailAddress = "jethdeguzman@outlook.com";


 if($emailAddress != "public"){

     $resultOwnerId = mysqli_query($con,"SELECT ownerId FROM unitowner WHERE ownerEmail='$emailAddress'");
     $owners = mysqli_fetch_array($resultOwnerId);

     $ownerId = $owners['ownerId'];

     //check if the unit has the same number
     $resultUnit = mysqli_query($con, "SELECT * from unitregistration WHERE ownerId='$ownerId'");

     $selection = array();
     $generalCounter = 0;
     $counter = 1;
     $unitIdList = array();

    while($rowUnits = mysqli_fetch_array($resultUnit))
    {
       	$generalCounter++;
        $unitId = $rowUnits['unitId'];
        $unitIdList[$counter] = $unitId;
        $selection['unitId'.$counter] = $unitId;
        $unitList = mysqli_query($con, "SELECT unitCode from unitlist WHERE ownerId='$ownerId' AND unitId='$unitId'");
        $unitCodeDB = mysqli_fetch_array($unitList);
        $selection['unitCode'.$counter] = $unitCodeDB['unitCode'];
        $selection['unitSimNumber'.$counter] = $rowUnits['unitSimNumber'];
        $selection['unitViewing'.$counter] = $rowUnits['unitViewing'];
        $selection['unitRegion'.$counter] = $rowUnits['unitRegion'];
        $selection['unitName'.$counter] = $rowUnits['unitName'];
        $selection['unitStatus'.$counter] = $rowUnits['unitStatus'];
        $selection['unitAT'.$counter] = $rowUnits['accessToken'];
        $selection['unitFreq'.$counter] = $rowUnits['frequency'];
        $selection['unitSmsCode'.$counter] = $rowUnits['unitSmsCode'];
        $selection['unitSmsNotif'.$counter] = $rowUnits['unitSmsNotif'];
        $counter++;
    }
     
    $resultPower = mysqli_query($con, "SELECT unitId, unitPowerLevel from unitpowermonitoring");
    $counter = 1;

    while($rowPower = mysqli_fetch_array($resultPower))
    {
        if($rowPower['unitId'] == $unitIdList[$counter]){
            $selection['unitPowerLevel'.$counter] = $rowPower['unitPowerLevel'];
        }
        $counter++;
    }

    $selection['generalCounter'] = $generalCounter;
}
else{
    //check if the unit has the same number
     $resultUnit = mysqli_query($con, "SELECT * from unitregistration WHERE unitViewing='public' AND unitStatus='ACTIVATED'");

     $selection = array();
     $generalCounter = 0;
     $counter = 1;
     $unitIdList = array();

    while($rowUnits = mysqli_fetch_array($resultUnit))
    {
        $generalCounter++;
        $unitId = $rowUnits['unitId'];
        $unitIdList[$counter] = $unitId;
        $selection['unitId'.$counter] = $unitId;
        $selection['unitSimNumber'.$counter] = $rowUnits['unitSimNumber'];
        $selection['unitViewing'.$counter] = $rowUnits['unitViewing'];
        $selection['unitRegion'.$counter] = $rowUnits['unitRegion'];
        $selection['unitName'.$counter] = $rowUnits['unitName'];
        $selection['unitStatus'.$counter] = $rowUnits['unitStatus'];
        $selection['unitAT'.$counter] = $rowUnits['accessToken'];
        $selection['unitFreq'.$counter] = $rowUnits['frequency'];
        $selection['unitSmsCode'.$counter] = $rowUnits['unitSmsCode'];
        $selection['unitSmsNotif'.$counter] = $rowUnits['unitSmsNotif'];
        $counter++;
    }
     
    $resultPower = mysqli_query($con, "SELECT unitId, unitPowerLevel from unitpowermonitoring");
    $counter = 1;

    while($rowPower = mysqli_fetch_array($resultPower))
    {
        if($rowPower['unitId'] == $unitIdList[$counter]){
            $selection['unitPowerLevel'.$counter] = $rowPower['unitPowerLevel'];
        }
        $counter++;
    }

    $selection['generalCounter'] = $generalCounter;
}

header("Content-type:application/json");
echo json_encode($selection);

mysqli_close($con);
 ?>