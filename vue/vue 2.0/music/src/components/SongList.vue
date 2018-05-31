<template>
	<transition name="songlist">	
	  <div class="song-list" v-show="switchState" @click.stop.self="close">
	  	 <div class="list-operator">
	  	 	<span class="play-mode">
		  	 	<i></i>
		  	 	顺序播放
	  	 	</span>
	  	 	<span class="delete-all" @click="deleteAll()"></span>
	  	 </div>

		<div class="song-wrapper">
			<div class="content">
				<div class="list-con">
					<div class="songs">
						<ul>
							<li :class="{active:getCurIndex == k}" v-for="(item,k) in getSongListArr" :key="item.musicData.songid"  @click="playListMusic(item,k)">
								<span class="song-name" v-text="item.musicData.songname"></span>
								<span class="song-operator" @click.stop>
									<i class="icon-op icon-favorate"></i> 
									<i class="icon-op icon-delete" @click="deleteSong(item,k)"></i>
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div class="close-list" @click="close">关闭列表</div>
	  </div>
	</transition>
</template>

<script>
//引入jsonp
import jsonp from 'jsonp';

//引入api接口地址文件
import api from '../api/songApi';

//引入better-scroll
import BScroll from 'better-scroll';

import {mapGetters,mapMutations} from 'vuex';
export default {
  name: '',
  data(){
    return {
    	smid:'',
    	mid:'',
    	src:'',
    	myScroll:null
    }
  },
  computed:{
  	...mapGetters([
  		'getCurIndex',
  		'getSongListArr',
  		'getPlaySrc',
  		'getMiniState'
  	])
  },
  props:{
  	switchState:{
  		type:Boolean,
  		default:true
  	}
  },
  mounted(){
  	this.$nextTick(()=>{
  		this.myScroll = new BScroll('.song-wrapper',{
	  		scrollY: true,
	    	click: true
		});
  	});
  },
  methods:{
  	_getMusicAdress(s,m){ //歌曲播放地址
      this.smid = s;
      this.mid = m;

      //1、获取 vkey
      let url = api.vKeyApi + `&songmid=${this.smid}&filename=C400${this.smid}.m4a`;

      jsonp(url,{param:'callback'},(err,data)=>{
        // console.log(data);
        let vkey = data.data.items[0].vkey;
        
        //2、使用 smid和vKey取得歌曲播放地址
        this.src = `http://dl.stream.qqmusic.qq.com/C400${this.smid}.m4a?vkey=${vkey}&guid=7120953682&uin=0&fromtag=66`;

        //获取当前播放地址
        this.setPlaySrc(this.src);
      });

      if(this.getMiniState == false){
      	this.setMiniState(true);
      }
    },
  	close(){ //关闭列表
  		this.$emit('closeState',false);
  	},

  	playListMusic(item,k){ //播放列表中的歌曲
  		this.setCurSong(item);
  		this.setCurIndex(k);
  		this._getMusicAdress(this.getSongListArr[k].musicData.songmid,this.getSongListArr[k].musicData.albummid);
  	},

  	deleteSong(song,i){ //删除列表中的歌曲
  		let len = this.getSongListArr.length - 1;
  		if(i == 0 && len == 0){	//最后一首歌删除，关闭mini播放器
  			this.getSongListArr.splice(i,1);
  			this.setMiniState(false);
  			return;
  		}else{ //删除点击的歌曲
  			this.getSongListArr.splice(i,1);
  		}

  		if(i == this.getCurIndex){
  			if(i == len){
  				i = 0;
  				//更改播放地址到第一首
  				this._getMusicAdress(this.getSongListArr[i].musicData.songmid,this.getSongListArr[i].musicData.albummid);
  			}else{
  				//更改播放地址到删除歌曲的下一首
  				this._getMusicAdress(this.getSongListArr[i].musicData.songmid,this.getSongListArr[i].musicData.albummid);
  			}
  		}else{
  			if(i < this.getCurIndex){
  				i = this.getCurIndex - 1;
  			}else{
  				i = this.getCurIndex;
  			}
  		}
  		
  		//更改当前歌曲索引
		this.setCurIndex(i);
		//更改当前歌曲信息
  		this.setCurSong(this.getSongListArr[i]);
  	},

  	deleteAll(){	//清楚列表并关闭mini播放器
  		let len = this.getSongListArr.length;
  		this.getSongListArr.splice(0,len);
  		this.setMiniState(false);
  	},

  	...mapMutations({
  		'setCurIndex':'setCurIndex',
  		'setCurSong':'setCurSong',
  		'setPlaySrc':'setPlaySrc',
  		'setMiniState':'setMiniState'
  	})

  }
}
</script>

<style lang="scss" scoped>
.song-list{
	position: fixed;
    left: 0;
    top: 0;
    z-index: 1001;
    width: 100%;
    height: 100vh;
    background: rgba(6,5,6,.5);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    transition:all .3s cubic-bezier(0.82, 0.28, 0.15, 1.01);
	.list-operator{
	    display: flex;
	    align-items: center;
	    height:60px;
	    background: #060506;
	    padding-left:25px;
	    .play-mode{
		    flex: 1;
		    font-size: 13px;
		    color: #8e8e8e;
		    line-height: 25px;
		    i{
		    	display: inline-block;
			    width: 25px;
			    height: 25px;
			    background: url(../assets/icon/mode.png) no-repeat;
			    background-size: 100% 100%;
			    vertical-align: middle;
			    margin-top: -2px;
		    }
	    }
	    .delete-all{
		    width: 18px;
		    height: 18px;
		    margin-right: 20px;
		    background: url(../assets/icon/delete_all.png) no-repeat;
		    background-size: 100% 100%;
	    }
	}
    .song-wrapper{
    	overflow: hidden;
    	background: #060506;
		height:300px;

		.songs{
			li{
				display: flex;
			    line-height: 30px;
			    padding: 2px 20px 2px 50px;
			    color:#fff;
			    .song-name{
			    	flex: 1;
    				position: relative;
    				font-size: 12px;
    				&::before{
    					content: "";
					    display: inline-block;
					    position: absolute;
					    left: -20px;
					    top: 50%;
					    margin-top: -6px;
					    width: 13px;
					    height: 13px;
    				}
			    }
			    &.active{
			    	.song-name{
			    		&::before{
			    			background: url(../assets/icon/play.png) no-repeat;
					    	background-size: 100% 100%;
			    		}
			    	}
			    }

			    .song-operator{
			    	display: flex;
			    	align-items: center;
			    	.icon-op{
			    		width: 15px;
					    height: 15px;
					    display: inline-block;
			    	}
			    	.icon-favorate{
			    		width: 13px;
					    height: 13px;
		    		    background: url(../assets/icon/like.png) no-repeat;
					    background-size: 100% 100%;
					    margin-right: 10px;
			    	}
			    	.icon-delete{
			    		background: url(../assets/icon/delete_red.png) no-repeat;
    					background-size: 100% 100%;
			    	}
			    }
			}
		}
    }

    .close-list{
    	line-height: 50px;
	    background: #101010;
	    color: #3e3d3d;
	    font-size: 15px;
	    text-align: center;
    }
}

// 转场动画
.songlist-enter-active,.songlist-leave{
	transform:translate3d(0,0,0);
}
.songlist-enter,.songlist-leave-to{
	transform:translate3d(0,100%,0);
}
</style>