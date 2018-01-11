<?php
	
$tentk =  $_GET['username'] ;
$tenfile = $_GET['tenfile'];
$tenfile_ngay = $_GET['tenfile']."_ngay";
required("../../conn.php");
$delete_data= " DELETE from dulieufileaqi where tentaikhoan='$tentk' and tenfile='$tenfile'";
$drop_tbl = "DROP TABLE $tenfile";
$drop_tbl_ngay = "DROP TABLE $tenfile_ngay";
pg_query($conn,"$delete_data");
pg_query($conn,"$drop_tbl");
pg_query($conn,"$drop_tbl_ngay");

?>
