<?php
 
 require('../key/access.php');

 $emailAddress = $_POST['emailAddress'];
 // $emailAddress = "jethdeguzman@outlook.com";


 if($emailAddress != "public"){

     $resultAdmin = mysqli_query($con,"SELECT adminId FROM admin WHERE adminEmail='$emailAddress'");
     $admin = mysqli_fetch_array($resultAdmin);

     $resultOwnerId = mysqli_query($con,"SELECT ownerId FROM unitowner WHERE ownerEmail='$emailAddress'");
     $owner = mysqli_fetch_array($resultOwnerId);

     $ownerId;
     $resultUnit;

     if(mysqli_num_rows($resultOwnerId) == 1){
         $ownerId = $owner['ownerId'];
         //check if the unit has the same number
         $resultUnit = mysqli_query($con, "SELECT * from unitregistration WHERE ownerId='$ownerId'");
     }
     elseif(mysqli_num_rows($resultAdmin) == 1){
         $resultUnit = mysqli_query($con, "SELECT * from unitregistration");  
     }

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
        $unitList;
        $unitCodeDB;
        if(mysqli_num_rows($resultOwnerId) == 1){
            $unitList = mysqli_query($con, "SELECT unitCode from unitlist WHERE ownerId='$ownerId' AND unitId='$unitId'");
            $unitCodeDB = mysqli_fetch_array($unitList);
        }
        elseif(mysqli_num_rows($resultAdmin) == 1){
            $unitList = mysqli_query($con, "SELECT unitCode from unitlist WHERE unitId='$unitId'");
            $unitCodeDB = mysqli_fetch_array($unitList);   
        }
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

    $selection['generalCounter'] = $generalCounter;
}

header("Content-type:application/json");
echo json_encode($selection);

mysqli_close($con);
 ?>