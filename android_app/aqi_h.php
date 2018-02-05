<?php
include("config.inc.php");
$tentram = $_POST['station_name'];
$thoigian = $_POST['time'];

$aqi= pg_query($link, "SELECT thoigian::time, aqi_h_tram, aqi_h_so2, aqi_h_co, aqi_h_no2,
									aqi_h_o3, aqi_h_tsp, aqi_h_pm25, aqi_h_pm10, aqi_h_pb, thongso_h_max
							FROM aqi_hcm_2016
							WHERE tentram = "."'".$tentram."'".
							" and thoigian::date = "."'".$thoigian."'"." Order by thoigian::time");

// $aqi= pg_query($link, "SELECT thoigian, aqi_h_tram, aqi_h_so2, aqi_h_co, aqi_h_no2,
// 									aqi_h_o3, aqi_h_tsp, aqi_h_pm25, aqi_h_pm10, aqi_h_pb, thongso_h_max
// 							FROM aqi_hcm_thang3_2011 
// 							WHERE tentram= 'An Sương' and thoigian::date = '2011-03-07'");
$arr = pg_fetch_all($aqi);
	echo json_encode($arr);
?>