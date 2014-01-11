<?php
	$con=mysqli_connect("localhost","secret","secret","secret");
	
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to DB: " . mysqli_connect_error();
	}
?>