//scss样式导入
import '../scss/common.scss';
import '../scss/resDetail.scss';

import $ from 'jquery';

import BScroll from 'better-scroll';


$(function(){

	// tab选项卡功能实现
	$('.tab').delegate('a','click',function(){
		$(this).addClass('on').siblings().removeClass('on');
		var index = $(this).attr('index');
		$('.tab-index').eq(index).addClass('on').siblings('div').removeClass('on');
	});
	
	



});
