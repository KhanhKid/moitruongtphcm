<?php
	
// $tentk =  $_GET['username'] ;
// $tenfile = $_GET['tenfile'];
// $tenfile_ngay = $_GET['tenfile']."_ngay";
$tentk = '';
$tenfile ='';
$tenfile_ngay='';


if(isset($_GET['username'])){
	$tentk = $_GET['username'];
	$tenfile = $_GET['tenfile'];
	$tenfile_ngay = $_GET['tenfile']."_ngay";
}
$conn = pg_connect("host=ec2-54-225-237-64.compute-1.amazonaws.com port=5432 dbname=dcbsjgvtij2fj6 user=xgooqxakkzsaje password=b9d572757b80869354e69328b813e8e471f9556c366986756fcd95fa4a8e21a1"); 
$delete_data= " DELETE from dulieufileaqi where tentaikhoan='$tentk' and tenfile='$tenfile'";
$drop_tbl = "DROP TABLE $tenfile";
$drop_tbl_ngay = "DROP TABLE $tenfile_ngay";
pg_query($conn,"$delete_data");
pg_query($conn,"$drop_tbl");
pg_query($conn,"$drop_tbl_ngay");

$result =pg_query($conn,"$delete_data");
if($result== true){
	echo "<h3>Bạn đã xóa dữ liệu thành công, bấm vào"."<a href=\"dashboard-aqi.php?username=$tentk&active=dulieudauvao\"> đây </a>". "để quay lại !</h3>";
}

?>
