<template>
  <div class="play-music">
    <!-- S  头部 -->
	  <div class="header">
      <h1><i></i>薛之谦</h1>
      <span>演员</span>
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
      <a href="javascript:void(0);" class="prev"></a>
      <a href="javascript:void(0);" class="playPauseplay"></a>
      <a href="javascript:void(0);" class="next"></a>
      <a href="javascript:void(0);" class="like"></a>
    </div>
    <!-- S  播放按钮 -->

    <!-- S  大背景图片 -->
    <div class="bg-album">
      <img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+mid+'.jpg?max_age=2592000'">
    </div>
    <!-- E  大背景图片 -->

    <!-- S  音乐播放 -->
    <div class="audio">
      <audio id="player" :src="src" autoplay="autoplay"></audio>
    </div>
    <!-- E  音乐播放 -->
  </div>
</template>

<script>
//引入jsonp
import jsonp from 'jsonp';

//引入api接口地址文件
import api from '../api/songApi';

export default {
  name: '',
  data(){
  	return {
      smid:'',
      mid:'',
      src:''
  	}
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
        console.log(data);
        let vkey = data.data.items[0].vkey;
        
        //2、使用 smid和vKey取得歌曲播放地址
        this.src = `http://dl.stream.qqmusic.qq.com/C400${this.smid}.m4a?vkey=${vkey}&guid=7120953682&uin=0&fromtag=66`;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_themes';
.play-music{
	color:$white;
  .header{
    text-align: center;
    color: #fff;
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