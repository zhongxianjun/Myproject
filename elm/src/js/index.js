//scss样式导入
import '../scss/common.scss';
import '../scss/index.scss';

import $ from 'jquery';

import BScroll from 'better-scroll';
import api from '../api/indexCateApi.js';

let scroll = new BScroll('.wrapper',{
	scrollX:true
});

const category = {
	data:[],
	firstCateIndex:1,
	secondCateIndex:0
}

$(function(){
	$.ajax({
		url:api.categoryApi,
		type:'get',
		dataType:'jsonp',
		jsonpCallback:'jsonp',
		success:function(data){
			category.data = data;
			console.log(category.data);
			let cateArr = category.data[category.firstCateIndex].sub_categories;

			// 生成topCate头部菜单分类
			getTopCateHtml(cateArr);

			//生成所有菜单分类
			getCategories(category.data);
		}
	});


});

//生成topCate头部菜单分类函数
function getTopCateHtml(cate){
	let topCateHtml = '';
	cate.map(function(elem,index) {
		topCateHtml += '<li><span>'+ elem.name +'</span></li>';
	});

	$('.top-cate-wrapper content').html(topCateHtml);

	let totolW = 0;
	$('.top-cate-wrapper content li span').each(function(i){
		totolW += $(this).outerWidth();
	});

	$('.top-cate-wrapper content').css('width',totolW+'px');
}

//生成所有菜单分类
function getCategories(categories){

	//生成一级菜单分类
	let firstCateHtml = '';

	for(var i=1; i<=categories.length-1; i++){
		var curClass = '';
		if(i === category.firstCateIndex){
			curClass = 'active';
		}
		firstCateHtml += '<li class="'+ curClass +'"><span>' + categories[i].name + '</span></li>';
	}
	$('.content-first .content').html(firstCateHtml);

	//生成二级菜单分类
	let secondCateHtml = '';

	let tempArr = categories[category.firstCateIndex].sub_categories;
	// console.log(tempArr);
	for(var i=0; i<=tempArr.length-1; i++){
		var curClass = '';
		if(i === category.secondCateIndex){
			curClass = 'active';
		}
		secondCateHtml += '<li class="'+ curClass +'"><span>' + tempArr[i].name + '</span></li>';
	}
	$('.content-second .content').html(secondCateHtml);
}



//获取footer当前信息
$(".footer a").click(function(){
	$(this).addClass("active").siblings().removeClass('active');
});
