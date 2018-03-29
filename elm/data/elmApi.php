<?php
    header("Content-type: text/html; charset=utf-8");   
	//初始化
    $curl = curl_init();
    //设置抓取的url
    curl_setopt($curl, CURLOPT_URL, 'https://h5.ele.me/restapi/shopping/v2/restaurant/category?latitude=28.227779&longitude=112.938858');
    //设置头文件的信息作为数据流输出
    curl_setopt($curl, CURLOPT_HEADER, false);

    //设置获取的信息以文件流的形式返回，而不是直接输出。
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    //执行命令
    $data = curl_exec($curl);
    //关闭URL请求
    curl_close($curl);
    //显示获得的数据
    
    echo 'jsonp('.$data.')';
    // print_r($data);
?>