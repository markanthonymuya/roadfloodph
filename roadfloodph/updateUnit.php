<?php
 
require('../key/access.php');

 $unitCode = $_POST['unitCode'];
 $unitNumber = $_POST['unitNumber'];
 $unitViewing = $_POST['unitViewing'];
 $unitRegion = $_POST['unitRegion'];
 $unitName = $_POST['unitName'];
 $unitStatus = $_POST['unitStatus'];
 $frequency = $_POST['unitFrequency'];


 //check if the unit has the same number
 $result = mysqli_query($con, "UPDATE unitregistration SET unitSimNumber='$unitNumber', unitViewing='$unitViewing', unitRegion='$unitRegion', unitName='$unitName', unitStatus='$unitStatus', frequency='$frequency' WHERE unitId='$unitCode'");

 ?>