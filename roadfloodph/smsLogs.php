<?php
	date_default_timezone_set("Asia/Manila");
	echo(strtotime("now")."<br>");
	echo("<br>");
	echo(strtotime('last day of january 2014', "2013/12/01")."<br>");
	echo(strtotime("2013/12/18", "2013/12/01")."<br>");		// day
	echo(strtotime("2013/12/15", "2013/12/01")."<br>");
	echo(strtotime('2014/01/01', "2013/12/01")."<br>");
?>