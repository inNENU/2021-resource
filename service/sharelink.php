<?php

/**
 * Page Handler
 *
 * PHP version 7
 *
 * @category  Page
 * @package   Page
 * @author    Mr.Hope <zhangbowang1998@gmail.com>
 * @copyright 2019 Mr.Hope
 * @license   No License
 * @link      https://mrhope.site
 */

declare(strict_types=1);

header("Content-Type: text/json; charset=utf-8");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Request-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if (isset($_SERVER['HTTP_ORIGIN'])) {
  $origin = $_SERVER['HTTP_ORIGIN'];
  if (strpos($origin, 'innenu.com') !== FALSE) {
    header("Access-Control-Allow-Origin: " . $origin);
  } else if (strpos($origin, 'localhost') !== FALSE) {
    header("Access-Control-Allow-Origin: " . $origin);
  }
}

if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
  $data = json_decode(file_get_contents('php://input'));

  $appID = $data->appID;
  $id = $data->id;

  $handle = @fopen("../resource/sharelink.json", "r");
  if ($handle) {
    $contents = fread($handle, filesize($filename));
    fclose($handle);
    $data = json_decode($contents);
    if ($data[$appID][$id]) {
      echo "{data:\"" . $data[$appID][$id] . "\"}";
    } else {
      echo "{error:true}";
    }
  } else {
    echo 'error';
  }
}
