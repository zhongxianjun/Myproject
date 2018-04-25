<template>
  <div class="index">
	<HeaderTab></HeaderTab>
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
  </div>
</template>

<script>
//引入HeaderTab组件
import HeaderTab from '@/components/HeaderTab';

//引入jsonp
import jsonp from 'jsonp';

//引入api接口地址文件
import api from '../api/indexApi';

//引入swiper插件
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

export default {
  name: '',
  data(){
  	return {
  		slider:[]
  	}
  },
  mounted:function(){
  	jsonp(api.bannerApi,{param:'jsonpCallback'},(err,data)=>{
  		this.slider = data.data.slider;

  		this.$nextTick(function(){
  			let mySwiper = new Swiper('.swiper-container',{
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
  methods:{

  },
  components:{
  	HeaderTab
  }
}
</script>

<style lang="scss">
.index{
	.slider{
		img{
			width:100%;
			height:100%;
		}
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
</style>