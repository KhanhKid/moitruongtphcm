<?php
include("config.inc.php");

$tentram= pg_query($link, "SELECT DISTINCT tentram, from aqi_hcm_thang3_2011_ngay");
$arr = pg_fetch_all($tentram);
	echo json_encode($arr);
?>