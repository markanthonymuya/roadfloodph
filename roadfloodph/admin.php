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
	

	$email = $_POST['username'];
	$password = $_POST['password'];
	$password = md5($password);

 	$resultAdmin = mysqli_query($con, "SELECT adminName FROM admin WHERE adminEmail='$email' AND adminPassword='$password'");
	$adminSearch = mysqli_fetch_array($resultAdmin);

	$resultOwner = mysqli_query($con, "SELECT ownerName FROM unitowner WHERE ownerEmail='$email' AND ownerPassword='$password'");
	$ownerSearch = mysqli_fetch_array($resultOwner);


 	$selection = array();

 	if(mysqli_num_rows($resultAdmin) == 1){
 		$selection['username'] = $adminSearch['adminName'];
	    $selection['adminLinks'] = '<li role="presentation"><a tabindex="-1" role="menuitem" href="" data-toggle="modal" data-target="" id="registerOwner">Add New Unit Owner</a></li><li role="presentation"><a tabindex="-1" role="menuitem" href="" data-toggle="modal" data-target="" id="registerAdmin">Add New Admin</a></li><li role="presentation"><a tabindex="-1" role="menuitem" href="" data-toggle="modal" data-target="#registerUnit">Register New Unit</a></li><li role="presentation"><a tabindex="-1" role="menuitem" href="" data-toggle="modal" data-target="#manageUnit">Manage</a></li>';
	    $selection['query'] = true;
	    $selection['type'] = "admin";
	}
	elseif(mysqli_num_rows($resultOwner) == 1){
		$selection['username'] = $ownerSearch['ownerName'];
	    $selection['adminLinks'] = '<li role="presentation"><a tabindex="-1" role="menuitem" href="" data-toggle="modal" data-target="#registerUnit">Register New Unit</a></li><li role="presentation"><a tabindex="-1" role="menuitem" href="" data-toggle="modal" data-target="#manageUnit">Manage</a></li>';
	    $selection['query'] = true;
	    $selection['type'] = "owner";
	}
	else{
		$selection['query'] = false;
	}

    header("Content-type:application/json");
	echo json_encode($selection);

	mysqli_close($con);
?>
