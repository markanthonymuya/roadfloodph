<?php
	require('../key/access.php');
	

	$email = $_POST['username'];
	$password = $_POST['password'];
	$password = md5($password);

 	$result = mysqli_query($con, "SELECT adminName FROM admin WHERE adminEmail='$email' AND adminPassword='$password'");
	$adminSearch = mysqli_fetch_array($result);


 	$selection = array();

 	if($adminSearch){
 		$selection['username'] = $adminSearch['adminName'];

	    $selection['adminLinks'] = '<li role="presentation"><a tabindex="-1" role="menuitem" href="" data-toggle="modal" data-target="" id="registerOwner">Add New Unit Owner</a></li><li role="presentation"><a tabindex="-1" role="menuitem" href="" data-toggle="modal" data-target="" id="registerAdmin">Add New Admin</a></li><li role="presentation"><a tabindex="-1" role="menuitem" href="" data-toggle="modal" data-target="#registerUnit">Register New Unit</a></li><li role="presentation"><a tabindex="-1" role="menuitem" href="" data-toggle="modal" data-target="#manageUnit">Manage</a></li>';

	    $selection['query'] = true;
	}
	else{
		$selection['query'] = false;
	}

    header("Content-type:application/json");
	echo json_encode($selection);
?>