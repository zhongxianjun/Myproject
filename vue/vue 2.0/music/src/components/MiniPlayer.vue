<template>
  <div class="mini-player" @click="toPlayMusic" v-if="getMiniState">
   	<!-- S 歌曲封面 -->
   	<div class="thumb playing">
   		<img v-lazy="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+ getCurSong.musicData.albummid +'.jpg'">
   	</div>
   	<!-- E 歌曲封面 -->

   	<!-- S 歌曲信息 -->
    <div class="song-info">
     		<h3>{{getCurSong.musicData.singer[0].name}}</h3>
     		<span>{{getCurSong.musicData.songname}}</span>
    </div>

   	<div class="song-operator" @click.stop>
   		<a href="javascript:void(0);" class="playPauseplay" :class="{pausePlay:getPalyState}" @click="_playPauseplay"></a>
      <a href="javascript:void(0);" class="next" @click="next"></a>
      <a href="javascript:void(0);" class="song-list" @click="openSongList"></a>
   	</div>
    <SongList :switchState="switchState" @closeState="closeState"></SongList>
   	<!-- E 歌曲信息 -->

   	<!-- 播放器 -->
    <div class="audio">
      <audio id="player" :src="getPlaySrc" autoplay="autoplay"></audio>
    </div>
  </div>
</template>

<script>
//导入songList 子组件
import SongList from '@/components/SongList';
import PlayMusic from '@/pages/PlayMusic';

//引入jsonp
import jsonp from 'jsonp';

//引入api接口地址文件
import api from '../api/songApi';

import {mapGetters,mapMutations} from 'vuex';

export default {
  name: '',
  data(){
    return {
      switchState:false,
      smid:'',
      mid:'',
      src:'',
      playbackProgress:null
    }
  },
  computed:{
    ...mapGetters([
    	'getPlaySrc',
    	'getCurSong',
    	'getPalyState',
      'getMiniState',
      'getSongListArr',
      'getCurIndex'
    ])
  },
  watch:{
  	getPalyState(){ //监听播放状态
		  this._playOrPause();
  	}
  },
  mounted(){
    //调用第一次 检测音乐播放是否完毕
    this.$nextTick(()=>{
      this._musicEnd();
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
        this.setSrc(this.src);
        // console.log(this.src);
      });

      this.setMiniState(true);
    },

  	_playPauseplay(){ //控制图标播放与暂停
      //控制按钮
      this.palyState(!this.getPalyState);
    },

    _playOrPause(){ //控制audio播放与暂停
      let thumbPlaying = document.querySelector(".thumb.playing");
      let player = document.querySelector("#player");
      //控制播放功能与动画
      if(!this.getPalyState){
        thumbPlaying.style.animationPlayState = 'running';
        player.play();
      }else{
        thumbPlaying.style.animationPlayState = 'paused';
        player.pause();
      }
    },

    toPlayMusic(){ //点击进入歌曲播放页面
      let song = this.getCurSong;
      this.$router.push({path:'/playMusic/'+song.musicData.songmid+'/'+song.musicData.albummid});
    },

    closeState(){ //关闭开关
      this.switchState = false;
    },

    openSongList(){ //打开开关
      this.switchState = true;
    },

    next(){ //播放下一曲
      //重置播放状态
      this.palyState(false);
      let thumbPlaying = document.querySelector(".thumb.playing");
      thumbPlaying.style.animationPlayState = 'running';

      //更换 播放地址 歌曲信息
      let num = 0;
      num = this.getCurIndex;
      if(num == this.getSongListArr.length-1){
        num = 0;
      }else{
        num++;
      }
      this.setCurIndex(num);
      this.getSongListArr.forEach((item,i)=>{
        if(num == i){
          this.setCurSong(item);
          this._getMusicAdress(item.musicData.songmid,item.musicData.albummid);
        }
      });
    },

    _musicEnd(){  //播放完毕切换下一曲
      this.playbackProgress = document.getElementById('player');
      if(this.getMiniState){
        if(this.playbackProgress.ended){
          this.next();
        };
      }
      setTimeout(()=>{ 
          this._musicEnd();
        },1000);
    },

    ...mapMutations({
        'setSrc':'setPlaySrc',
        'palyState':'setPalyState',
        'setCurIndex':'setCurIndex',
        'setCurSong':'setCurSong',
        'setMiniState':'setMiniState'
    })
  },
  components:{
    SongList,
    PlayMusic
  }
}
</script>

<style lang="scss" scoped>
.mini-player{
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  background: #101010;
  display: flex;
  align-items: center;
  padding-left:18px;
  box-sizing: border-box;
  text-align:left;
  
  .thumb{
    &.playing{
      animation:playCicle 5s linear infinite;
    }
  	img{
  		width:45px;
  		height:45px;
  		border-radius: 50%;
  	}
  }
  .song-info{
  	flex:1;
  	margin-left:16px;
    overflow: hidden;
  	h3{
  		color: #fff;
  		font-size:16px;
  		font-weight: 400;
      overflow: hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
  	}
  	span{
  		color: #ccc;
  		font-size:12px;
  	}
  }
  .song-operator{
  	margin-right:10px;
    height:60px;
    display:flex;
    align-items:center;
  	.playPauseplay,.next,.song-list{
      flex:1;
  		width:30px;
  		height:30px;
      margin:0 5px;
  		display: inline-block;
  	}
    .playPauseplay{
  		background:url(../assets/icon/pause.png) no-repeat;
  		background-size:100% 100%;
    }
    .pausePlay{
    	background:url(../assets/icon/play.png) no-repeat;
    	background-size:100% 100%;
    }
    .next{
      background:url(../assets/icon/next.png) no-repeat;
      background-size:100% 100%;
    }
  	.song-list{
		  background:url(../assets/icon/list.png) no-repeat;
  		background-size:100% 100%;
  	}
  }
}

@keyframes playCicle{
  from{
    transform:rotateZ(0deg);
  }
  to{
    transform:rotateZ(360deg);
  }
}
</style>