//scss样式导入
import '../scss/common.scss';
import '../scss/index.scss';

import $ from 'jquery';

import BScroll from 'better-scroll';
import api from '../api/indexApi.js';

let scroll = new BScroll('.wrapper',{
	scrollX:true
});

$(function(){
	$.ajax({
		url:api.categoryApi,
		type:'get',
		dataType:'jsonp',
		jsonpCallback:'jsonp',
		success:function(data){
			console.log(data);
		}
	});
});