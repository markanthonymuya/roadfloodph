<?php
 
 require('../key/access.php');

 $adminFullName = $_POST['adminFullName'];
 $desiredAdminEmail = $_POST['adminEmail'];
 $adminSimNumber = $_POST['adminSimNumber'];
 $desiredPassword = md5($_POST['adminPassword']);
 $myAdminEmail = $_POST['myAdminEmail'];
 $myAdminPassword = md5($_POST['myAdminPassword']);
 date_default_timezone_set("Asia/Manila");
 $dateAdded = date("Y/m/d");
 $timeAdded = date("H:i:s");

 //checks admin creator credentials
 $resultAdminSearch = mysqli_query($con,"SELECT adminId FROM admin WHERE adminEmail='$myAdminEmail' AND adminPassword = '$myAdminPassword'");
 $admin = mysqli_fetch_array($resultAdminSearch);

 $resultEmailSearch = mysqli_query($con,"SELECT adminEmail FROM admin WHERE adminEmail='$desiredAdminEmail'");
 $email = mysqli_fetch_array($resultEmailSearch);

if($admin){
	 if(!$email){
		 mysqli_query($con, "INSERT INTO admin (adminName, adminEmail, adminContact, adminPassword, dateAdded, timeAdded) VALUES ('$adminFullName', '$desiredAdminEmail', '$adminSimNumber', '$desiredPassword', '$dateAdded', '$timeAdded')");
		 $resultMsg = "successful";
	 }
	 else{
		$resultMsg = "email existing";
	 }
}
else{
	$resultMsg = "not valid admin password";
}

 header("Content-type:application/json");
 echo json_encode($resultMsg);

 ?>