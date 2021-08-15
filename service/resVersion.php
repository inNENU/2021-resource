<?php

/**
 * Page Handler
 *
 * PHP version 8
 *
 * @category  version
 * @package   version
 * @author    Mr.Hope <zhangbowang1998@gmail.com>
 * @copyright 2018-2021 Mr.Hope
 * @license   No License
 * @link      https://mrhope.site
 */

declare(strict_types=1);

require_once('./header/get-json.php');

chdir("../resource/");

$name = $_GET['res'];

$filename = $name . "Version.json";

$handle = @fopen($filename, "r");
if ($handle) {
  $contents = fread($handle, filesize($filename));
  fclose($handle);
  echo $contents;
} else {
  echo 'error';
}
