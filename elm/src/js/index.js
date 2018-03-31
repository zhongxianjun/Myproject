//scss样式导入
import '../scss/common.scss';
import '../scss/index.scss';

import $ from 'jquery';

import BScroll from 'better-scroll';
import api from '../api/indexCateApi.js';

const topCateScroll = new BScroll('.top-cate-wrapper',{
	scrollX:true
});
/*const fristScroll = new BScroll('.frist-wrapper',{
	scrollY:true
});
const secondScroll = new BScroll('.second-wrapper',{
	scrollY:true
});*/

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

/*//头部菜单选择
$('.top-cate-all .content').delegate('li','click', function() {

	//动态生成当前二级菜单
	category.secondCateIndex = parseInt($(this).attr('index'));
	let cateArr = category.data[category.firstCateIndex].sub_categories;
	getTopCateHtml(cateArr);
});*/

//一级菜单选择
$('.content-first .content').delegate('li','click', function() {

	//动态生成当前二级菜单
	category.firstCateIndex = parseInt($(this).attr('index'));
	category.secondCateIndex = 0;
	getCategories(category.data);


});

//二级菜单选择
$('.content-second .content').delegate('li','click', function() {
	category.secondCateIndex = parseInt($(this).attr('index'));
	getCategories(category.data);

	//自动跳转到头部菜单
	$('.top-cate-all').css('display','none');

	let cateArr = category.data[category.firstCateIndex].sub_categories;
	getTopCateHtml(cateArr);

});

//开关控制
$('.top-cate-op').click(function(){
	$('.top-cate-all').css('display','block');
});
$('.close').click(function(){
	$('.top-cate-all').css('display','none');
});


//获取footer当前信息
$(".footer a").click(function(){
	$(this).addClass("active").siblings().removeClass('active');
});


//生成topCate头部菜单分类函数
function getTopCateHtml(cate){
	let topCateHtml = '';
	cate.map(function(elem,index) {
		var curClass = '';
		if(index === category.secondCateIndex){
			curClass = 'active';
		}
		topCateHtml += '<li index="'+ (index+1) +'" class="'+ curClass +'"><span>'+ elem.name +'</span></li>';
	});

	$('.top-cate-wrapper .content').html(topCateHtml);

	let totolW = 0;
	$('.top-cate-wrapper .content li').each(function(i){
		totolW += $(this).innerWidth();
	});

	$('.top-cate-wrapper .content').css('width',totolW+'px');
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
		firstCateHtml += '<li index="'+ i +'" class="'+ curClass +'"><span>' + categories[i].name + '</span><i>'+ categories[i].count +'</i></li>';
	}

	$('.content-first .content').html(firstCateHtml);

	//动态获取一级菜单的高度
	let totolFristH = 0;
	$('.content-first .content li').each(function(i){
		totolFristH += $(this).innerHeight();
	});

	$('.content-first .content').css('height',totolFristH+'px');


	//生成二级菜单分类
	let secondCateHtml = '';

	const tempArr = categories[category.firstCateIndex].sub_categories;
	const suffixArr = ['png','jpeg','jpg','gif','svg'];
	for(var i=0; i<=tempArr.length-1; i++){
		var curClass = '';
		if(i === category.secondCateIndex){
			curClass = 'active';
		}
		let dir01 = tempArr[i].image_url[0];
		let dir02 = tempArr[i].image_url[1] + tempArr[i].image_url[2];
		let src = tempArr[i].image_url.substr(3);
		var suffix = '';
		
		for(let j=0; j<=suffixArr.length-1; j++){
			var startIndex = tempArr[i].image_url.indexOf(suffixArr[j]);
			if(startIndex !== -1){
				suffix = '.' + tempArr[i].image_url.substr(startIndex);
				break;
			}
		}

		let thumb = "http://fuss10.elemecdn.com/" + dir01 + "/" + dir02 + "/" + src + suffix + "?imageMogr/format/webp/thumbnail/!80x80r/gravity/Center/crop/80x80/";
		secondCateHtml += '<li index="'+ i +'" class="'+ curClass +'"><img src="'+ thumb +'"><span>' + tempArr[i].name + '</span><i>'+ tempArr[i].count +'</i></li>';
	}
	$('.content-second .content').html(secondCateHtml);

	//动态获取二级菜单的高度
	let totolSecondH = 0;
	$('.content-second .content li').each(function(i){
		totolSecondH += $(this).innerHeight();
	});

	$('.content-second .content').css('height',totolSecondH+'px');
}


