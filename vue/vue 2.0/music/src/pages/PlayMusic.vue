<template>
  <div class="play-music">
    <div class="main">
      <!-- S  头部 -->
  	  <div class="header">
        <h1><i @click="_getBack"></i>{{getCurSong.musicData.singer[0].name}}</h1>
        <span>{{getCurSong.musicData.songname}}</span>
      </div>
      <!-- E  头部 -->

      <!-- S  图片动画 -->
      <div class="thumb-playing">
        <img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+mid+'.jpg?max_age=2592000'">
      </div>
      <!-- E  图片动画 -->

      <!-- S  播放按钮 -->
      <div class="play-btn">
        <a href="javascript:void(0);" class="mode"></a>
        <a href="javascript:void(0);" class="prev" @click="prev"></a>
        <a href="javascript:void(0);" class="playPauseplay" :class="{pausePlay:getPalyState}" @click="_playPauseplay"></a>
        <a href="javascript:void(0);" class="next" @click="next"></a>
        <a href="javascript:void(0);" class="like"></a>
      </div>
      <!-- S  播放按钮 -->

      <!-- S  大背景图片 -->
      <div class="bg-album">
        <img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+mid+'.jpg?max_age=2592000'">
      </div>
      <!-- E  大背景图片 -->

    </div>
  </div>
</template>

<script>
//引入jsonp
import jsonp from 'jsonp';

//引入api接口地址文件
import api from '../api/songApi';

import {mapGetters,mapMutations} from 'vuex';

export default {
  name: '',
  data(){
  	return {
      smid:'',
      mid:'',
      src:''
  	}
  },
  computed:{
    ...mapGetters([
      'getPlaySrc',
      'getCurSong',
      'getPalyState',
      'getCurIndex',
      'getSongListArr'
    ])
  },
  created(){
    //获取歌曲播放地址
    this._getMusicAdress();

  },
  methods:{
  	_getMusicAdress(){ //歌曲播放地址
      //获取路由参数 smid歌曲 mid , 专辑封面 mid
      this.smid = this.$route.params.smid;
      this.mid = this.$route.params.mid;

      //1、获取 vkey
      let url = api.vKeyApi + `&songmid=${this.smid}&filename=C400${this.smid}.m4a`;

      jsonp(url,{param:'callback'},(err,data)=>{
        // console.log(data);
        let vkey = data.data.items[0].vkey;
        
        //2、使用 smid和vKey取得歌曲播放地址
        this.src = `http://dl.stream.qqmusic.qq.com/C400${this.smid}.m4a?vkey=${vkey}&guid=7120953682&uin=0&fromtag=66`;

        //获取当前播放地址
        this.setSrc(this.src);
      });

      this.setMiniState(true);
    },

    _getBack(){ //回退功能
      this.$router.go(-1);
    },

    _playPauseplay(){ //控制audio播放与暂停
      let thumbPlaying = document.querySelector(".thumb-playing");
      let player = document.querySelector("#player");
      //控制按钮
      this.palyState(!this.getPalyState);
      //控制播放功能与动画
      if(!this.getPalyState){
        thumbPlaying.style.animationPlayState = 'running';
        player.play();  
      }else{
        thumbPlaying.style.animationPlayState = 'paused';
        player.pause();
      }
    },

    prev(){ //播放上一曲
      let num = 0;
      num = this.getCurIndex;
      num--;
      this.setCurIndex(num);
      this.getSongListArr.forEach((item,i)=>{
        if(item.index == num){
          this.setCurSong(item);
        }
      });
    },

    next(){ //播放下一曲
      let num = 0;
      num = this.getCurIndex;
      num++;
      this.setCurIndex(num);
    },

    ...mapMutations({
        'setSrc':'setPlaySrc',
        'palyState':'setPalyState',
        'setMiniState':'setMiniState',
        'setCurIndex':'setCurIndex',
        'setCurSong':'setCurSong'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_themes';
.play-music{
	color:$white;
  .main{
    position: relative;
    z-index: 1010;
  }
  .header{
    text-align: center;
    color: $white;
    position: relative;
    z-index: 999;
    h1{
      font-weight: 400;
      font-size: 22px;
      line-height: 55px;
      i{
        display: inline-block;
        width: 25px;
        height: 25px;
        padding: 15px;
        background:url("../assets/icon/arrow_down.png") no-repeat;
        background-size: 25px 25px;
        background-position: 50%;
        position: absolute;
        left: 0;
      }
    }
    span{
      font-size: 15px;
    }
  }

  .thumb-playing{
    width: 255px;
    margin:0 auto;
    text-align: center;
    margin-top: 35px;
    position: relative;
    z-index: 999;
    animation: playCicle 5s linear infinite;
    animation-play-state: running;
    @keyframes playCicle{
      from{
        transform: rotateZ(0deg)
      }to{
        transform: rotateZ(360deg)
      }
    }
    img{
      width: 235px;
      height: 235px;
      border-radius: 50%;
      border: 10px solid #000;
    }
  }

  .play-btn{
    display:flex;
    position: fixed;
    z-index: 999;
    bottom: 50px;
    width: 100%;
    justify-content:space-around;
    a{
      width: 30px;
      height: 30px;
      &.mode{
        background:url("../assets/icon/mode.png") no-repeat;
        background-size: 100% 100%;
      }
      &.prev{
        background:url("../assets/icon/prev.png") no-repeat;
        background-size: 100% 100%;
      }
      &.playPauseplay{
        background:url("../assets/icon/pause.png") no-repeat;
        background-size: 100% 100%;
      }
      &.pausePlay{
        background:url("../assets/icon/play.png") no-repeat;
        background-size: 100% 100%;
      }
      &.next{
        background:url("../assets/icon/next.png") no-repeat;
        background-size: 100% 100%;
      }
      &.like{
        background:url("../assets/icon/like.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .bg-album{
    height: 100vh;
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    transform-origin: center center;
    background:$black;
    img{
      width: 100%;
      height: 100vh;
      position: absolute;
      top: 0;
      left:0;
      -webkit-filter: blur(20px);
      filter: blur(20px);
    }
  }
}
</style>