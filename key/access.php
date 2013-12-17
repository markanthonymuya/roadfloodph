<?php
	$con=mysqli_connect("localhost","markmuya_rfdb","roadfloodJKJK","roadfloodph");
	
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to DB: " . mysqli_connect_error();
	}
?>