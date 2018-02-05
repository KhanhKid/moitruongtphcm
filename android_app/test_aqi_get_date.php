<?php
include("config.inc.php");



$thoigian= pg_query($link, "SELECT DISTINCT thoigian 
	from aqi_hcm_2016_ngay WHERE tentram =  "."'".$_POST['station_name']."'" );

$arr = pg_fetch_all($thoigian);
	echo json_encode($arr);
?>