<?php
 
    require('../key/access.php');

    $unitSimNumber = $_POST['unitSimNumber'];
    $resultUnitReg = mysqli_query($con, "SELECT unitId from unitregistration WHERE unitSimNumber='$unitSimNumber'");
    $row = mysqli_fetch_array($resultUnitReg);
    $unitId = $row['unitId'];
     
    $selection = 0;
    $result = mysqli_query($con, "SELECT unitPowerLevel from unitpowermonitoring WHERE unitId='$unitId'");
    $row = mysqli_fetch_array($result);

    echo $selection = $row['unitPowerLevel'];

    mysqli_close($con);

?>