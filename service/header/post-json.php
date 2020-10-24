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
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
