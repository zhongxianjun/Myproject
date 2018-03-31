<?php
	// 分类查找餐馆
	header("Content-type: text/html; charset=utf-8"); 
	include './fun.php'; 

	$id = isset($_GET['cate_id'])?$_GET['cate_id']:0;

	$url = "https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=28.227779&longitude=112.938858&keyword=&offset=0&limit=8&extras[]=activities&extras[]=tags&terminal=h5&rank_id=&restaurant_category_ids[]={$id}";

	echo httpCurl($url);
?>