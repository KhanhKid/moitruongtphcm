<?php
include("config.inc.php");


$tentram = $_POST['station_name'];
$thoigian = $_POST['time'];

$aqi= pg_query($link, "SELECT x, y, aqi_ngay_tram, thongso_ngay_max
						from aqi_hcm_2016_ngay
						WHERE tentram = "."'".$tentram."'".
						" and thoigian = "."'".$thoigian."'");
$arr = pg_fetch_all($aqi);
	echo json_encode($arr);
?>