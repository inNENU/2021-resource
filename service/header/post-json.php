<?php

/**
 * Request Header for posts that return json
 *
 * PHP version 7
 *
 * @category  header
 * @package   header/post-json
 * @author    Mr.Hope <zhangbowang1998@gmail.com>
 * @copyright 2020 Mr.Hope
 * @license   No License
 * @link      https://mrhope.site
 */

header("Content-Type: text/json; charset=utf-8");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header('Access-Control-Allow-Methods:POST');

if (isset($_SERVER['HTTP_ORIGIN'])) {
  $origin = $_SERVER['HTTP_ORIGIN'];
  if (strpos($origin, 'innenu.com') !== FALSE) {
    header("Access-Control-Allow-Origin: " . $origin);
  } else if (strpos($origin, 'localhost') !== FALSE) {
    header("Access-Control-Allow-Origin: " . $origin);
  }
}
