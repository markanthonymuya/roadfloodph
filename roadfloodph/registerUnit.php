<?php
 
 require('../key/access.php');

 $unitCode = $_POST['unitCode'];
 $unitNumber = $_POST['unitNumber'];
 $unitViewing = $_POST['unitViewing'];
 $unitRegion = $_POST['unitRegion'];
 $unitName = $_POST['unitName'];
 $unitStatus = "not activated";
 $ownerId = $_POST['ownerId'];
 $dateAdded = date("Y/m/d");
 $timeAdded = date("H:i:s A");

 //check if the unit has the same number
 $result = mysqli_query($con, "INSERT INTO unitregistration VALUES ('$unitCode', '$unitNumber', '$unitViewing', '$unitRegion', '$unitName', '$unitStatus', '$ownerId', '$dateAdded', '$timeAdded', '')");

 ?>