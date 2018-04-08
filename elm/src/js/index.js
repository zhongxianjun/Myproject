//scss样式导入
import '../scss/common.scss';
import '../scss/index.scss';

import $ from 'jquery';

import BScroll from 'better-scroll';
import api from '../api/indexCateApi.js';

const topCateScroll = new BScroll('.top-cate-wrapper',{
	click:true,
	scrollX:true
});
const fristScroll = new BScroll('.frist-wrapper',{
	click:true,
	scrollY:true
});
const secondScroll = new BScroll('.second-wrapper',{
	click:true,
	scrollY:true
});	
const resScroll = new BScroll('.restaurant-wrapper',{
	click:true,
	scrollY:true,
	pullUpLoad:{
		threshold: -50
	}
});

const category = {
	data:[],
	firstCateIndex:1,
	deepFirstCateIndex:1,
	secondCateIndex:0
}

$(function(){

	//加载更多处理
	var offsetVal = 0;

	resScroll.on('pullingUp',function(){
		offsetVal += 8;
		let id = '';

		if(category.deepFirstCateIndex === 1 && category.secondCateIndex === 0){
			let subCate = category.data[1].sub_categories;
			subCate.forEach(function(item,k){
				id += '&restaurant_category_ids[]=' + item.id;
			});
		}else{
			id += '&restaurant_category_ids[]=' + category.data[category.deepFirstCateIndex].sub_categories[category.secondCateIndex].id;
		}

		$.ajax({
			url: api.resCateApi02,
			data:{cate_id:id,offset:offsetVal},
			dataType:'jsonp',
			jsonpCallback:'jsonp',
			beforeSend:function(){
				$('.loading').css('top','calc(100vh - 40px - 50px)');
				$('.restaurant-wrapper').css('height','calc(100vh - 40px - 50px - 25px)');
				loadingCtrl();
			},
			success:function(data){
				loadingCtrl();
				//餐馆html结构生成
				getRestaurantHtml(data.items,'append');

				resScroll.finishPullUp();
				resScroll.refresh();

				$('.restaurant-wrapper').css('height','calc(100vh - 40px - 50px)');
				$('.loading').css('top','40px');
			}
		});
	});

	let cateStep1 = new Promise(function(resolve,reject){
		$.ajax({
			url:api.categoryApi,
			type:'get',
			dataType:'jsonp',
			jsonpCallback:'jsonp',
			success:function(data){
				category.data = data;
				// console.log(category.data);
				let cateArr = category.data[category.firstCateIndex].sub_categories;

				// 生成topCate头部菜单分类
				getTopCateHtml(cateArr);

				//生成所有菜单分类
				getCategories(category.data);

				resolve(data);
			}
		});
	});

	//默认获取餐馆信息
	cateStep1.then(function(res){
		let id = '';
		let subCate = category.data[1].sub_categories;
		subCate.forEach(function(item,k){
			id += '&restaurant_category_ids[]=' + item.id;
		});
		$.ajax({
			url: api.resCateApi02,
			data:{cate_id:id},
			dataType:'jsonp',
			jsonpCallback:'jsonp',
			beforeSend:function(){
				$('.restaurant-list').empty();
				loadingCtrl();
			},
			success:function(data){
				loadingCtrl();
				//餐馆html结构生成
				getRestaurantHtml(data.items);
			}
		});
	});

	

	//头部菜单选择
		$('.top-cate-wrapper .content').delegate('li','click', function() {

			category.secondCateIndex = parseInt($(this).attr('index'));
			let cateArr = category.data[category.firstCateIndex].sub_categories;
			getTopCateHtml(cateArr);

			//数据获取
			let id = category.data[category.firstCateIndex].sub_categories[category.secondCateIndex].id;

			$.ajax({
				url: api.resCateApi,
				data:{cate_id:id},
				dataType:'jsonp',
				jsonpCallback:'jsonp',
				beforeSend:function(){
					$('.restaurant-list').empty();
					loadingCtrl();
				},
				success:function(data){
					loadingCtrl();
					//餐馆html结构生成
					getRestaurantHtml(data.items);
				}
			});

			//餐馆信息的隐藏和显示
		});

	//餐馆html结构生成
	function getRestaurantHtml(data,mode = 'replace'){
		let resHtml = '';
		data.forEach(function(val,key){
			//图片地址的构建
			const suffixArr = ['png','jpeg','jpg','gif','svg'];
			let dir01 = val.restaurant.image_path[0];
			let dir02 = val.restaurant.image_path[1] + val.restaurant.image_path[2];
			let src = val.restaurant.image_path.substr(3);
			var suffix = '';
			for(let j=0; j<=suffixArr.length-1; j++){

				let startIndex = val.restaurant.image_path.indexOf(suffixArr[j]);
				if(startIndex !== -1){
					suffix = '.' + val.restaurant.image_path.substr(startIndex);
					break;
				}
			}

			let thumb = "http://fuss10.elemecdn.com/" + dir01 + "/" + dir02 + "/" + src + suffix + "?imageMogr/format/webp/thumbnail/!80x80r/gravity/Center/crop/80x80/";
			
			//活动结构构建
			let activitesHtml = '';

			val.restaurant.activities.map(function(v,k){
				let classVal = '';
				if(k>1){
					classVal = 'hide';
				}

				activitesHtml += `<li class="`+ classVal +`"><span class="icon" style="background-color:#`+ v.icon_color +`">`+ v.icon_name +`</span>`+ v.name +`</li>`;
			});



			// 口碑人气好店 结构构建
			let sayReason = '';
			for(let i in val.restaurant){
				if(i == 'recommend'){
					
					if( val.restaurant.recommend.reason == "口碑人气好店"){
						//图片路径构建
						const suffixArrSay = ['png','jpeg','jpg','gif','svg'];
						let dir03 = val.restaurant.recommend.image_hash[0];
						let dir04 = val.restaurant.recommend.image_hash[1] + val.restaurant.recommend.image_hash[2];
						let dir05 = val.restaurant.recommend.image_hash.substr(3);
						var suffixSay = '';
						for(let s=0; s<=suffixArrSay.length-1; s++){

							let startIndexSay = val.restaurant.recommend.image_hash.indexOf(suffixArrSay[s]);
							if(startIndexSay !== -1){
								suffixSay = '.' + val.restaurant.recommend.image_hash.substr(startIndexSay);
								break;
							}
						}
						var thumbSay = "http://fuss10.elemecdn.com/" + dir03 + "/" + dir04 + "/" + dir05 + suffixSay + "?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/";
						sayReason = '<img src="'+ thumbSay +'"><span>'+ val.restaurant.recommend.reason +'</span>';
						break;
					}
				}
			};
			
			//蜂鸟专送结构构建 
			let text = '';
			
			for(let i in val.restaurant){
				if(i == 'delivery_mode'){
					text = '<span>'+ val.restaurant.delivery_mode.text +'</span>';
					break;
				}
			};

			resHtml += `<div class="restaurant-item">
							<div class="pic">
								<img src="`+ thumb +`">
							</div>
							<div class="info">
								<h3>`+ val.restaurant.name +`</h3>
								<div class="data">
									<div class="d-top">
										<p>
											<span>`+ val.restaurant.rating +`</span>
											<span>月售`+ val.restaurant.recent_order_num +`单</span>
										</p>
										<p class="text">
											`+ text +`
										</p>
									</div>
									<div class="d-bottom">
										<p>
											<span>￥`+ val.restaurant.float_minimum_order_amount +`起送 |</span>
											<span>配送费￥`+ val.restaurant.float_delivery_fee +`</span>
										</p>
										<p>
											<span>`+ val.restaurant.distance +`m</span>
											<span>`+ val.restaurant.order_lead_time +`分钟</span>
										</p>
									</div>
									<div class="tags">
										`+ sayReason +`
									</div>
								</div>
								<div class="activities">
									<div class="act-list">
										<ul>
											`+ activitesHtml +`
										</ul>
									</div>
									<div class="act-op">
										`+ val.restaurant.activities.length +`个活动
									</div>
								</div>
							</div>
						</div>`;
		});

		if(mode === 'replace'){
			$('.restaurant-list').html(resHtml);
		}else if(mode === 'append'){
			$('.restaurant-list').append(resHtml);
		}
		

	};

	//显示|隐藏 更多活动信息
	$('.restaurant-wrapper').delegate('.act-op','click', function() {
		let hideNode = $(this).siblings('.act-list').find('.hide');
		hideNode.toggle();
	});

	//一级菜单选择
	$('.content-first .content').delegate('li','click', function() {

		//动态生成当前二级菜单
		category.firstCateIndex = parseInt($(this).attr('index'));

		getCategories(category.data);
	});

	//二级菜单选择
	$('.content-second .content').delegate('li','click', function() {
		
		category.secondCateIndex = parseInt($(this).attr('index'));
		category.deepFirstCateIndex = category.firstCateIndex;
		
		getCategories(category.data);

		//自动跳转到头部菜单
		$('.top-cate-all').css('display','none');

		let cateArr = category.data[category.firstCateIndex].sub_categories;
		getTopCateHtml(cateArr);

		//获取餐馆信息
			//数据获取
			let id = category.data[category.firstCateIndex].sub_categories[category.secondCateIndex].id;

			$.ajax({
				url: api.resCateApi,
				data:{cate_id:id},
				dataType:'jsonp',
				jsonpCallback:'jsonp',
				beforeSend:function(){
					$(".restaurant-list").empty();
					loadingCtrl();
				},
				success:function(data){
					loadingCtrl();
					//餐馆html结构生成
					getRestaurantHtml(data.items);
				}
			});

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
			topCateHtml += '<li index="'+ index +'" class="'+ curClass +'"><span>'+ elem.name +'</span></li>';
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
			if(i === category.secondCateIndex && category.firstCateIndex == category.deepFirstCateIndex){
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


	//正在加载...loading控制
	function loadingCtrl(){
		let state = $('.loading').attr('state');

		if(state == 'none'){
			$('.loading').css('display','block');
			$('.loading').attr('state','block');
			$('.loading-icon').css('animation-play-state','running');
		}else{
			$('.loading').css('display','none');
			$('.loading').attr('state','none');
			$('.loading-icon').css('animation-play-state','paused');
		}
	}

});


