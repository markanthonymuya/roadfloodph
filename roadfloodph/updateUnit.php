<?php
 
require('../key/access.php');

 $unitCode = $_POST['unitCode'];
 $unitNumber = $_POST['unitNumber'];
 $unitViewing = $_POST['unitViewing'];
 $unitRegion = $_POST['unitRegion'];
 $unitName = $_POST['unitName'];

 //check if the unit has the same number
 $result = mysqli_query($con, "UPDATE unitregistration SET unitSimNumber='$unitNumber', unitViewing='$unitViewing', unitRegion='$unitRegion', unitName='$unitName' WHERE unitId='$unitCode'");

 ?>