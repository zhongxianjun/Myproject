<template>
  <div class="mini-player" @click="toPlayMusic" v-if="getMiniState">
   	<!-- S 歌曲封面 -->
   	<div class="thumb playing">
   		<img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+ getCurSong.musicData.albummid +'.jpg'">
   	</div>
   	<!-- E 歌曲封面 -->

   	<!-- S 歌曲信息 -->
    <div class="song-info">
     		<h3>{{getCurSong.musicData.singer[0].name}}</h3>
     		<span>{{getCurSong.musicData.songname}}</span>
    </div>

   	<div class="song-operator" @click.stop>
   		<a href="javascript:void(0);" class="playPauseplay" :class="{pausePlay:getPalyState}" @click="_playPauseplay"></a>
      <a href="javascript:void(0);" class="next"></a>
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

import {mapGetters,mapMutations} from 'vuex';

export default {
  name: '',
  data(){
    return {
      switchState:false
    }
  },
  computed:{
    ...mapGetters([
    	'getPlaySrc',
    	'getCurSong',
    	'getPalyState',
      'getMiniState'
    ])
  },
  watch:{
  	getPalyState(){
		  this._playOrPause();
  	}
  },
  methods:{
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

    ...mapMutations({
        'setSrc':'setPlaySrc',
        'palyState':'setPalyState'
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