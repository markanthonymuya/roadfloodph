<?php
  require_once 'facebook.php';
  include '../key/fbKey.php';

  $message = $_POST['fbMessage'];

  $config = array();
  $config['appId'] = $appId;
  $config['secret'] = $appSecret;
  $config['fileUpload'] = false; // optional
  $fb = new Facebook($config);
   
  $params = array(
    // this is the access token for Fan Page
    "access_token" => $accessToken,
    "message" => $message,
    "link" => "http://roadfloodph.cloudapp.net/"
    /*"picture" => "http://roadfloodph.cloudapp.net/",
    "name" => "Road Flood Update",
    "caption" => "",
    "description" => ""*/
  );
 
  try {
    //posting to facebook page
    $ret = $fb->api('/'.$fbPage.'/feed', 'POST', $params);
    echo "successful";
  }
  catch(Exception $e) {
    echo $e->getMessage();
  }
?>