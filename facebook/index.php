<?php
/*set_time_limit(0);                   // ignore php timeout
ignore_user_abort(true);             // keep on going even if user pulls the plug*
while(ob_get_level())ob_end_clean(); // remove output buffers
ob_implicit_flush(true);             // output stuff directly
*/
require_once 'facebook.php';
  // include '../key/fbKey.php';

  $config = array();
  $config['appId'] = '527859597304472';
  $config['secret'] = 'secret';
  $config['fileUpload'] = false; // optional
  $fb = new Facebook($config);
   
  $params = array(
    // this is the access token for Fan Page
    "access_token" => "secret",
    "message" => time()."Testing Here is a blog post about auto posting on Facebook using PHP #php #facebook"
  );
   
  try {
    $ret = $fb->api('/230852547094689/feed', 'POST', $params);
    echo 'Successfully posted to Facebook Fan Page';
  } catch(Exception $e) {
    echo $e->getMessage();
  }
?>