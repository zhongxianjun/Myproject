<template>
  <div class="search">
    <!-- S  头部 -->
    <HeaderTab></HeaderTab>
    <!-- E  头部 -->

    <!-- S  搜索 -->
    <div class="search-wrap">
      <div class="search-form">
        <input placeholder="搜索歌曲、歌手" v-model="keywords">
        <i class="delete" @click="emptySearch"></i>
      </div>

      <!-- S  热门搜索 -->
      <div class="hotkey" v-if="!showState">
        <h2>热门搜索</h2>
        <div class="hotkey-list">
          <span v-for="(song,i) in hotMusicList" :key="song.n" v-text="song.k" @click="searchHotMusic(song.k)"></span>
        </div>
      </div>
      <!-- E  热门搜索 -->
  
      <div class="song-wrapper">
        <div class="content">
          <!-- S  搜索列表 -->
          <div class="song-list" v-if="showState">
            <ul>
              <!-- S 歌手直达 -->
                <li class="singer" v-if="searchMusicList.zhida.type" v-text="searchMusicList.zhida.singername" @click="searchSinger(searchMusicList)"></li>
              <!-- E 歌手直达 -->

              <router-link :to="'/playMusic/'+ item.songmid +'/'+ item.albummid" v-for="(item,k) in searchMusicList.song.list" :key="item.songid" @click.native="addSong(item)">
                <li>{{item.songname}}-{{item.singer[0].name}}</li>
              </router-link>
            </ul>
          </div>
          <!-- E  搜索列表 -->
        </div>
      </div>
    </div>
    <!-- E  搜索 -->

    <!--  S 弹出层  -->
    <div class="tipsFadeAway" v-show="tipState">
        未搜索到该歌手信息
    </div>
    <!--  E 弹出层  -->
  </div>
</template>

<script>
//引入HeaderTab组件
import HeaderTab from '@/components/HeaderTab';

//引入jsonp
import jsonp from 'jsonp';

//引入api接口地址文件
import api from '../api/searchApi';

//引入better-scroll
import BScroll from 'better-scroll';

import {mapGetters,mapMutations} from 'vuex';

export default {
  name: '',
  data(){
  	return {
      hotMusicList:[],
      keywords:'',
      searchMusicList:{},
      scroll:'',
      showState:false,
      tipState:false
  	}
  },
  computed:{
      ...mapGetters([
        'getSongListArr'
      ])
  },
  watch:{
    keywords(){
      this._searchMusic();
    }
  },
  created(){
    //获取热门歌曲信息
    this._getHotMusic();
  },
  mounted(){
    this.$nextTick(()=>{
      this.scroll = new BScroll('.song-wrapper',{
        click:true
      });
    });
  },
  methods:{
    _getHotMusic(){ //获取热门歌曲信息
      jsonp(api.hotkeyApi,{param:'jsonpCallback'},(err,data)=>{
        this.hotMusicList = data.data.hotkey.splice(0,12);
      });
    },

    emptySearch(){ //清空搜索框
      this.keywords = '';
    },

    searchHotMusic(keywords){ //将热门歌曲添加入搜索框
      this.keywords = keywords;
    },

    _searchMusic(){ //获取热门歌曲信息
      let url = api.searchApi + this.keywords;
      jsonp(url,{param:'jsonpCallback'},(err,data)=>{
        this.searchMusicList = data.data
        // console.log(this.searchMusicList);
        
        if(this.keywords == ''){
			     this.showState = false;
        }else{
			     this.showState = true;
        }
      });
    },

    searchSinger(song){ //搜索歌手信息，并跳转到歌手详情页面
    	if(song.zhida.type == 2){
			this.$router.push({path:'/singer/'+song.zhida.singermid});
    	}else{
        //为搜索到歌手信息，弹出层渐渐消失
    		this._tipsFadeAway();
    	}
    	
    },

    addSong(song){ //点击获取歌曲信息
      song = {musicData:song};
      this.setCurSong(song);
      
      // 初始化播放状态
      this.setPalyState(false);

      //进去列表的歌曲去重
      let tempArr = this.getSongListArr;
      let numFlag = 0;
      tempArr.forEach((elem,i)=>{
        if(elem.musicData.songid == song.musicData.songid){
          numFlag++;
          this.setCurIndex(i);
        }
      });

      if(numFlag <= 0){
        this.setCurIndex(tempArr.length);
        this.setSongListArr(song);
      }
      
    },
    _tipsFadeAway(){  //弹出层渐渐消失效果
      new Promise((resolve,reject)=>{
        this.tipState = true;
        let tip = document.querySelector('.tipsFadeAway');
        tip.style.transition = '';
        tip.style.opacity = '1';

        let timmer = setTimeout(function(){
          tip.style.transition = 'all 2s linear'; 
          tip.style.opacity = '0';
          setTimeout(()=>{
            resolve();
          },2000);
          clearTimeout(timmer);
        },1000);
      })
      .then(()=>{
        this.tipState = false;
      });
      

        
    },

    ...mapMutations({
      'setCurSong':'setCurSong',
      'setCurIndex':'setCurIndex',
      'setSongListArr':'setSongListArr',
      'setPalyState':'setPalyState'
    })
  },
  components:{
  	HeaderTab
  }
}
</script>

<style lang="scss" scoped>
ul{
  list-style: none;
}
a{
  color: #676767;
}
.search-wrap{
  padding: 0 15px;
  margin: 0 auto;
  text-align:left;

  .search-form{
    padding: 8px 0;
    text-indent: 15px;
    background-color: #121212;
    margin: 0 5px;
    margin-top: 25px;
    border-radius: 8px;
    position: relative;
    margin-bottom: 20px;
    &::before{
      content: "";
      display: inline-block;
      width: 22px;
      height: 22px;
      background: url(../assets/icon/search.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      margin-right: 5px;
    }
    input{
      width: 220px;
      height: 20px;
      font-size: 14px;
      line-height: 20px;
      background-color: transparent;
      border: 0;
      outline: 0;
      color: #676767;
    }
    .delete{
          display: inline-block;
      width: 22px;
      height: 22px;
      background: url(../assets/icon/delete.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      position: absolute;
      right: 10px;
    }
  }

  .hotkey{
    margin-top: 30px;
    h2{
      color: #676767;
      font-size: 15px;
      text-indent: 5px;
    }
    .hotkey-list{
      color: #676767;
      display: flex;
      flex-wrap: wrap;
      span{
        padding: 4px 6px;
        background-color: #121212;
        margin: 5px;
        border-radius: 8px;
        font-size: 14px;
      }
    }
  }
}


.song-wrapper{
  height:calc(100vh - 173px);
  overflow: hidden;
}
li{
  padding: 6px 5px;
  color: #676767;
  &::before{
    content: "";
    display: inline-block;
    width: 22px;
    height: 22px;
    background: url(../assets/icon/music.png) no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
    margin-right: 5px;
  }

  &.singer{
    &::before{
      content: "";
      display: inline-block;
      width: 22px;
      height: 22px;
      background: url(../assets/icon/singer.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}

.tipsFadeAway{
  text-align: center;
  font-size: 14px;
  color:rgba(255,255,255,.8);
  background: rgba(255,255,255,.2);
  width:160px;
  line-height: 36px;
  position: fixed;
  left:50%;
  top: 33%;
  margin-left: -80px;
  border-radius: 20px;
  opacity: 0;
}

</style>