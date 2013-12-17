<?php


 $result = mysql_query("SELECT logId FROM roadfloodlogs");

 echo mysql_num_rows($result);

 ?> 