<?php
 
 require('../key/access.php');
 $emailAddress = "jethdeguzman@outlook.com";

 // $emailAddress = $_POST['emailAddress'];

 if($emailAddress != "public"){

     $resultOwnerId = mysqli_query($con,"SELECT ownerId FROM unitowner WHERE ownerEmail='$emailAddress'");
     $owners = mysqli_fetch_array($resultOwnerId);

     $ownerId = $owners['ownerId'];

     //check if the unit has the same number
     $result = mysqli_query($con, "SELECT * from unitregistration WHERE ownerId='$ownerId'");

     $selection = array();
     $generalCounter = 0;

    while($row = mysqli_fetch_array($result))
    {
       	$generalCounter++;
        $unitId = $row['unitId'];
        $selection['unitId'.$unitId] = $row['unitId'];
        $unitList = mysqli_query($con, "SELECT unitCode from unitlist WHERE ownerId='$ownerId' AND unitId='$unitId'");
        $unitCodeDB = mysqli_fetch_array($unitList);
        $selection['unitCode'.$unitId] = $unitCodeDB['unitCode'];
        $selection['unitSimNumber'.$unitId] = $row['unitSimNumber'];
        $selection['unitViewing'.$unitId] = $row['unitViewing'];
        $selection['unitRegion'.$unitId] = $row['unitRegion'];
        $selection['unitName'.$unitId] = $row['unitName'];
        $selection['unitStatus'.$unitId] = $row['unitStatus'];
        $selection['unitAT'.$unitId] = $row['accessToken'];
        $selection['unitFreq'.$unitId] = $row['frequency'];
        $selection['unitSmsCode'.$unitId] = $row['unitSmsCode'];
        $selection['unitSmsNotif'.$unitId] = $row['unitSmsNotif'];
    }
     
    $resultPower = mysqli_query($con, "SELECT unitId, unitPowerLevel from unitpowermonitoring");

    while($row = mysqli_fetch_array($resultPower))
    {
        $unitId = $row['unitId'];
        $selection['unitPowerLevel'.$unitId] = $row['unitPowerLevel'];
    }

    $selection['generalCounter'] = $generalCounter;
}
else{
    //check if the unit has the same number
     $result = mysqli_query($con, "SELECT * from unitregistration WHERE unitViewing='public'");

     $selection = array();
     $generalCounter = 0;

    while($row = mysqli_fetch_array($result))
    {
        $generalCounter++;
        $unitId = $row['unitId'];
        $selection['unitId'.$unitId] = $row['unitId'];
        $selection['unitSimNumber'.$unitId] = $row['unitSimNumber'];
        $selection['unitViewing'.$unitId] = $row['unitViewing'];
        $selection['unitRegion'.$unitId] = $row['unitRegion'];
        $selection['unitName'.$unitId] = $row['unitName'];
        $selection['unitStatus'.$unitId] = $row['unitStatus'];
        $selection['unitAT'.$unitId] = $row['accessToken'];
        $selection['unitFreq'.$unitId] = $row['frequency'];
        $selection['unitSmsCode'.$unitId] = $row['unitSmsCode'];
        $selection['unitSmsNotif'.$unitId] = $row['unitSmsNotif'];
    }
     
    $resultPower = mysqli_query($con, "SELECT unitId, unitPowerLevel from unitpowermonitoring");

    while($row = mysqli_fetch_array($resultPower))
    {
        $unitId = $row['unitId'];
        $selection['unitPowerLevel'.$unitId] = $row['unitPowerLevel'];
    }

    $selection['generalCounter'] = $generalCounter;
}

header("Content-type:application/json");
echo json_encode($selection);

mysqli_close($con);
 ?>