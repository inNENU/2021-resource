<?php

/**
 * Page Handler
 *
 * PHP version 7
 *
 * @category  Get
 * @package   Get
 * @author    Mr.Hope <zhangbowang1998@gmail.com>
 * @copyright 2020 Mr.Hope
 * @license   No License
 * @link      https://mrhope.site
 */

declare(strict_types=1);

header("content-type:application/json;charset=utf-8");

chdir("../resource/");

$handle = @fopen("version.json", "r");
if ($handle) {
  $contents = fread($handle, filesize("version.json"));
  fclose($handle);
  echo $contents;
} else {
  echo 'error';
}
