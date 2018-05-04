<template>
  <div class="singer-detail">
  	<div class="header">
  		<h1><i @click="_getBack"></i>{{singerDetail.singer_name}}</h1>
  	</div>
	
	<div class="wrapper list-wrapper">
		<div class="content">
			<!-- S  歌曲列表 -->
			<div class="list">
				<ul>
					<router-link :to="'/playMusic/'+item.musicData.songmid+'/'+item.musicData.albummid" tag="div" @click.native="addSong(item)" v-for="(item,k) in singerDetail.list" :key="item.index">
						<li>
							<h2>{{item.musicData.songname}}</h2>
							<span>{{item.musicData.singer[0].name}}-{{item.musicData.albumname}}</span>
						</li>
					</router-link>
				</ul>
			</div>
			<!-- E  歌曲列表 -->
		</div>
	</div>
	
	<!-- S  背景图片 -->
	<div class="thumb" v-html="thumb">
		
	</div>
	<!-- E  背景图片 -->

	<!-- S loading -->
	<Loading :title="tContent" :state="loadingState"></Loading>
	<!-- E loading -->
  </div>
</template>

<script>
//引入Loading组件
import Loading from '@/components/base/loading/Loading';

//引入jsonp
import jsonp from 'jsonp';

//引入api接口地址文件
import api from '../api/singerApi';

//引入better-scroll
import BScroll from 'better-scroll';

import {mapGetters,mapMutations} from 'vuex';


export default {
  name: '',
  data(){
  	return {
  		singerDetail:{},
  		scroll:null,
  		thumb:'',
  		loadingState:true,
  		tContent:'歌曲列表加载中...'
  	}
  },
  computed:{
  	...mapGetters([
  		'getCurSong'
  	])
  },
  mounted(){
  	
  	this.$nextTick(()=>{
  		//获取歌曲列表结构
  		this._getList();


  		//实例化 better-scroll
  		this.scroll = new BScroll('.list-wrapper',{
  			scrollY:true,
  			click:true
  		});
  	});
  },
  methods:{
  	_getList(){ //歌曲列表结构
  		let url = api.singerDetailApi + this.$route.params.sid;
  		jsonp(url,{param:'jsonpCallback'},(err,data)=>{
  			//获取歌曲列表
  			this.singerDetail = data.data;
  			// console.log(data.data);
  		
  			//动态添加歌手背景照片
  			this.thumb = `<img src="https://y.gtimg.cn/music/photo_new/T001R300x300M000${data.data.singer_mid}.jpg">`;

	  		//loading隐藏
	  		this.loadingState = false;
  		});
  	},
  	_getBack(){ //回退功能
  		this.$router.go(-1);
  	},
  	addSong(song){ //点击获取歌曲信息
  		this.setCurSong(song);
  		// console.log(song);
  		this.setPalyState(false);
  	},
  	...mapMutations({
  		'setCurSong':'setCurSong',
  		'setPalyState':'setPalyState'
  	})
  },
  components:{
  	Loading
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_themes';
.singer-detail{
	color:$white;
	height:100vh;
	.wrapper{
		position:fixed;
		left:0;
		bottom:0;
		width:100%;
		height:340px;
		text-align:left;
		overflow:hidden;
	}
	.header{
		text-align: center;
	    line-height: 55px;
	    position: fixed;
	    width:100%;
	    h1{
	    	padding: 0 10px;
    		margin: 0 auto;
    		font-weight:normal;
	    	font-size: 20px;
	    	i{
				display: inline-block;
			    width: 25px;
			    height: 25px;
			    padding: 15px;
			    background: url("../assets/icon/back.png") no-repeat;
			    background-size: 25px 25px;
			    background-position: 50%;
			    position: absolute;
			    left: 0;
			}
	    }
	}
	.list{
		background:$black;
		ul{
			li{
				padding: 0 10px;
   		 		padding-top: 10px;
				h2{
					font-weight: 400;
    				font-size: 18px;
				}
				span{
					font-size: 16px;
				}
			}
		}
	}
	.thumb{
		img{
			width:100%;
		}
	}
}
</style>