<template>
	<div class="index">
		<!-- S	头部 -->
		<HeaderTab></HeaderTab>
		<!-- E	头部 -->

		<div class="wrapper index-wrapper">
			<div class="content">
				<!-- S	轮播图 -->
				<div class="slider">
					<div class="swiper-container">
					    <div class="swiper-wrapper">
					        <div class="swiper-slide" v-for="(s,i) in slider" :key="i">
					        	<img :src="s.picUrl">
					        </div>
					    </div>
					    <div class="swiper-pagination"></div>
					</div>
				</div>
				<!-- E	轮播图 -->

				<!-- S	歌曲排行榜 -->
				<div class="top-list">
					<h2 class="title">
						歌曲排行榜
					</h2>
					<div class="song-container">
						<ul>
							<li v-for="(elem,k) in topList" :key="elem.data.songid">
								<div class="thumb">
									<img :src="'https://y.gtimg.cn/music/photo_new/T002R90x90M000'+ elem.data.albummid +'.jpg?max_age=2592000'">
								</div>
								<div class="text-info">
									<h3>{{elem.data.songname}}</h3>
									<p>{{elem.data.singer[0].name}}</p>
								</div>
								<div class="play-time">{{elem.data.interval | getTime}}</div>
							</li>
						</ul>
					</div>
				</div>
				<!-- E	歌曲排行榜 -->
			</div>
		</div>

		<!-- S loading -->
		<Loading :title="tContent" :state="loadingState"></Loading>
		<!-- E loading -->
	</div>
</template>

<script>
//引入HeaderTab组件
import HeaderTab from '@/components/HeaderTab';

//引入Loading组件
import Loading from '@/components/base/loading/Loading';

//引入jsonp
import jsonp from 'jsonp';

//引入api接口地址文件
import api from '../api/indexApi';

//引入better-scroll
import BScroll from 'better-scroll';

//引入swiper插件
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';


export default {
  name: '',
  data(){
  	return {
  		slider:[],
  		topList:[],
  		myScroll:null,
  		topListLength:0,
  		loadingState:true,
  		tContent:'歌曲列表加载...'
  	}
  },
  mounted:function(){
  	//获取轮播图
  	this._getSlider();
  	//获取歌曲列表
  	this._getTopList();
  	//实例化 better-scroll
  	this.$nextTick(function(){
  		this.myScroll = new BScroll('.index-wrapper',{
	  		scrollY: true,
	    	click: true,
	    	pullUpLoad:{
	    		threshold: -50
	    	}
	  	});

	  	//上拉加载
  		this.myScroll.on('pullingUp',()=>{
	  		this.loadingState = true;
	        this._getTopList();
	        this.myScroll.finishPullUp();
	        this.myScroll.refresh();
    	});
  	});
  },
  filters:{
  	getTime:function(t){
  		let m = parseInt(t/60);
  		let s = t%60;
  		s = s<10 ? ('0' + s) : s;
  		return m + '分' + s;
  	}
  },
  methods:{
  	_getSlider(){//轮播图
		jsonp(api.bannerApi,{param:'jsonpCallback'},(err,data)=>{
	  		this.slider = data.data.slider;
	  		//使用swiper插件
	  		this.$nextTick(function(){
	  			let mySwiper = new Swiper('.swiper-container',{
	  				loop:true,
	  				autoplay: {
	  					delay:3000,
	  				},
	  				effect : 'cube',
	  				pagination:{
	  					el:'.swiper-pagination',
	  					type:'bullets',
	  					bulletClass:'bullet',
	  					bulletActiveClass:'bullet-active'
	  				}
	  			});
	  		});
	  	});
	},
	_getTopList(){//歌曲列表
		let songBegin = this.topList.length;
		this.topListLength = this.topList.length;
		let url = api.topListApi + songBegin;
		jsonp(url,{param:'jsonpCallback'},(err,data)=>{
			this.topList = this.topList.concat(data.songlist);
			this.loadingState = false;
		});
	}
  },
  components:{
  	HeaderTab,
  	Loading
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_themes';
.index{
	.index-wrapper{
		height:calc(100vh - 105px);
		overflow:hidden;
	}
	.slider{
		img{
			width:100%;
		}
		.bullet{
			width: 8px;
		    height: 8px;
		    display: inline-block;
		    border-radius: 100%;
		    background: #000;
		    opacity: .2;
		    margin:0 4px;
			&.bullet-active{
			    width: 15px;
			    background: #fff;
			    opacity: .3;
			    border-radius: 5px;
			}
		}
	}
	.top-list{
		padding:0 5px;
		.title{
			font-size:16px;
			font-weight:0;
			color:$red;
		    text-align: center;
		    line-height: 64px;
		}
		.song-container{
			li{
				display:flex;
				padding:0 10px;
				margin-bottom:20px;
				.thumb{
					width:60px;
					img{
						width:60px;
						height:60px;
					}
				}
				.text-info{
					flex:1;
					color:$white;
					text-align:left;
					padding-top: 15px;
    				margin-left: 20px;
					h3{
						font-size:16px;
						font-weight:0;
						margin-bottom: 5px;
					}
					p{
						font-size:12px;
					}
				}
				.play-time{
					width:60px;
					color: $gray;
    				padding-top: 15px;
				}
			}
		}
	}
}
</style>