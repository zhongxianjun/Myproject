<template>
  <div class="singer">
	<!-- S	头部 -->
	<HeaderTab></HeaderTab>
	<!-- E	头部 -->

	<div class="wrapper singer-wrapper">
		<div class="content">
			<!-- S  歌手列表 -->
			<div class="singer-item" v-for="(s,k) in singerList" :key="k" v-if="showState">
				<h3>{{s.index}}</h3>
				<ul>
					<router-link :to="'/singer/'+singer.Fsinger_mid" tag="div" v-for="(singer,i) in s.singer" :key="i">
						<li>
							<img v-lazy="'https://y.gtimg.cn/music/photo_new/T001R150x150M000'+ singer.Fsinger_mid +'.jpg?max_age=2592000'">
							<span>{{singer.Fsinger_name}}</span>
						</li>
					</router-link>
				</ul>
			</div>
			<!-- E  歌手列表 -->
		</div>

		<!-- S  索引导航 -->
		<div class="index-tool" v-if="showState">
			<ul>
				<li v-for="(item,j) in indexTool" :key="j" :class="{active:curIndex == j}" v-text="item"></li>
			</ul>
		</div>
		<!-- E  索引导航 -->
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
import api from '../api/singerApi';

//引入better-scroll
import BScroll from 'better-scroll';

export default {
  name: '',
  data(){
  	return {
  		singerList:[{index:'热门',singer:[]}],
  		indexTool:null,
  		showState:false,
  		scroll:null,
  		loadingState:true,
  		tContent:'歌手列表加载...',
  		curIndex:0
  	}
  },
  mounted(){

  	jsonp(api.singerListApi,{param:'jsonpCallback'},(err,data)=>{
  		//获取歌手列表排序
  		this._getOrderSingerList(data.data.list);
  		
  		//实例化 better-scroll
		this.scroll = new BScroll('.singer-wrapper',{
			scrollY: true,
			click: true,
			probeType:3
		});

		this.scroll.on('scroll',(pos)=>{
			let posY = Math.abs(pos.y);

			let singerList = this.singerList;
			let indexMax = singerList.length - 1;
			for(let i=0;i<=indexMax;i++){
				if(posY <= singerList[i].distance){
					this.curIndex = i;
					break;
				}
			}
		});

  		this.$nextTick(()=>{
			//获取滚动距离
			this._getDistance();
	  	});
  	});

  	

  	
  },
  methods:{
  	
  	_getOrderSingerList(data){ //歌手列表 从 (热 A~Z) 排序
  		this._getIndexTool();
  		//生成热门歌手顺序结构
  		this.singerList[0].singer = data.splice(0,10);

  		//生成A~Z歌手顺序结构
  		for(let i=1;i<=26;i++){
  			let curIndex = this.indexTool[i];
  			let temp = {index:curIndex,singer:[]};
  			data.map((elem,k)=>{
  				if(elem.Findex === curIndex){
  					temp.singer.push(elem);
  					data.splice(k,1);
  				}
  			});
  			this.singerList.push(temp);
  		}


  		//剔除没有内容的歌手结构 及 索引
  		let tempIndexArr = []
		let tempSingerArr = [];
  		this.singerList.map((item,index)=>{
	  		let len = item.singer.length;
	  		if(len > 0){
	  			tempSingerArr.push(item);
	  			tempIndexArr.push(item.index.slice(0, 1));
	  		}
  		});
  		this.singerList = tempSingerArr;
  		this.indexTool = tempIndexArr;


  		//loading状态值的更改
  		this.loadingState = false;

  		this.showState = true;
  	},

  	_getIndexTool(){ //生成index歌曲索引
  		let indexArr = ['热'];
  		for(let code=65;code<=90;code++){
  			indexArr.push(String.fromCharCode(code));
  		}
  		this.indexTool = indexArr;
  	},

  	_getDistance(){ //滚动距离
		let singerItemNode = document.querySelectorAll('.singer-item');
		let offset = 0;

		this.singerList.map((singerItem,i)=>{
			offset += singerItemNode[i].offsetHeight;
			this.singerList[i].distance = offset;
		});
  	}
  },
  components:{
  	HeaderTab,
  	Loading
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_themes';
.singer{
	.singer-wrapper{
		height:calc(100vh - 105px);
		overflow:hidden;
	}
	.singer-item{
		h3{
			font-size: 16px;
		    line-height: 30px;
		    background: #131313;
		    font-weight: 400;
		    text-indent: 1em;
		    color: $white;
		    text-align:left;
		}
		ul{
			padding-left: 25px;
    		padding-bottom: 20px;
			li{
				display: flex;
			    line-height: 50px;
			    margin-top: 20px;
			    img{
			    	width: 50px;
				    height: 50px;
				    border-radius: 50%;
			    }
			    span{
				    color: $white;
				    flex-grow: 1;
				    margin-left: 20px;
				    white-space: nowrap;
				    overflow: hidden;
				    text-overflow: ellipsis;
				    padding-right: 8px;
				    text-align:left;
			    }
			}
		}
	}
	.index-tool{
		width: 16px;
	    position: fixed;
	    top: 50%;
	    right: 10px;
	    margin-top: -145px;
	    background-color: hsla(0,0%,92%,.1);
	    font-size: 12px;
	    border-radius: 10px;
	    padding: 5px 0;
	    color: #c8c8c8;
	    li.active{
	    	color: #d3442c;
	    }
	}
}
</style>