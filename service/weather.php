<?php

/**
 * Page Handler
 *
 * PHP version 7
 *
 * @category  weather
 * @package   weather
 * @author    Mr.Hope <zhangbowang1998@gmail.com>
 * @copyright 2018-2020 HopeStudio
 * @license   No License
 * @link      https://mrhope.site
 */

declare(strict_types=1);
require_once('./lib/curl.php');

// 获得通知 html
echo curlGet("https://wis.qq.com/weather/common?source=pc&weather_type=observe%7Cforecast_1h%7Cforecast_24h%7Cindex%7Calarm%7Climit%7Ctips%7Crise&province=%E5%90%89%E6%9E%97&city=%E9%95%BF%E6%98%A5&county=%E5%8D%97%E5%85%B3");
