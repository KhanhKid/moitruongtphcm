<?php
$tentk = '';
$tenfile ='';
$tenfile_ngay='';


if(isset($_GET['username'])){
	$tentk = $_GET['username'];
	$tenfile = $_GET['tenfile'];
	$tenfile_ngay = $_GET['tenfile']."_ngay";
}
required("../../conn.php");
 
?>
