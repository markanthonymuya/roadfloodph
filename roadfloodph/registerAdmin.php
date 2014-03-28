<?php
	
	// Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
 
 require('../key/access.php');

 $fullName = $_POST['adminFullName'];
 $desiredEmail = $_POST['adminEmail'];
 $simNumber = $_POST['adminSimNumber'];
 $desiredPassword = md5($_POST['adminPassword']);
 $myAdminEmail = $_POST['myAdminEmail'];
 $myAdminPassword = md5($_POST['myAdminPassword']);
 $regType = $_POST['regType'];
 date_default_timezone_set("Asia/Manila");
 $dateAdded = date("Y/m/d");
 $timeAdded = date("H:i:s");

 //checks admin creator credentials
 $resultAdminSearch = mysqli_query($con,"SELECT adminId FROM admin WHERE adminEmail='$myAdminEmail' AND adminPassword = '$myAdminPassword'");
 $admin = mysqli_fetch_array($resultAdminSearch);

if(mysqli_num_rows($resultAdminSearch) == 1){
	if($regType == "admin"){
		$resultEmailSearch = mysqli_query($con,"SELECT adminEmail FROM admin WHERE adminEmail='$desiredEmail'");
 		$email = mysqli_fetch_array($resultEmailSearch);
		if(!$email){
			mysqli_query($con, "INSERT INTO admin (adminName, adminEmail, adminContact, adminPassword, dateAdded, timeAdded) VALUES ('$fullName', '$desiredEmail', '$simNumber', '$desiredPassword', '$dateAdded', '$timeAdded')");
			$resultMsg = "successful";
		}
		else{
			$resultMsg = "email existing";
		}
	}
	elseif($regType == "owner"){
		$resultEmailSearch = mysqli_query($con,"SELECT ownerEmail FROM unitowner WHERE ownerEmail='$desiredEmail'");
 		$email = mysqli_fetch_array($resultEmailSearch);
		if(!$email){
			mysqli_query($con, "INSERT INTO unitowner (ownerName, ownerEmail, ownerContact, ownerPassword, dateAdded, timeAdded) VALUES ('$fullName', '$desiredEmail', '$simNumber', '$desiredPassword', '$dateAdded', '$timeAdded')");
			$resultMsg = "successful";
		}
		else{
			$resultMsg = "email existing";
		}
	}
}
else{
	$resultMsg = "not valid admin password";
}

 header("Content-type:application/json");
 echo json_encode($resultMsg);

 mysqli_close($con);
 ?>