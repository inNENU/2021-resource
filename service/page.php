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

require_once('./header/post-json.php');

if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
  chdir("../resource/");

  $data = json_decode(file_get_contents('php://input'));

  $filename = $data->path . ".json";

  $handle = @fopen($filename, "r");
  if ($handle) {
    $contents = fread($handle, filesize($filename));
    fclose($handle);
    echo $contents;
  } else {
    echo 'error';
  }
}
