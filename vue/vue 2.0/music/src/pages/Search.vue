<template>
  <div class="">
    <HeaderTab></HeaderTab>

    <div class="search-wrap">
      <div class="search-form">
        <input placeholder="搜索歌曲、歌手" v-model="keywords">
        <i class="delete" @click="emptySearch"></i>
      </div>

      <div class="hotkey" v-if="!showState">
        <h2>热门搜索</h2>
        <div class="hotkey-list">
          <span v-for="(song,i) in hotMusicList" :key="song.n" v-text="song.k" @click="searchHotMusic(song.k)"></span>
        </div>
      </div>
  
      <div class="song-wrapper">
        <div class="content">
          <div class="song-list" v-if="showState">
            <ul>
              <!-- S 歌手直达 -->
                <li class="singer" v-text="searchMusicList.zhida.singername"></li>
              <!-- E 歌手直达 -->

                <li v-for="(item,k) in searchMusicList.song.list">{{item.songname}}-{{item.singer[0].name}}</li>
            </ul>
          </div>
        </div>
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
import api from '../api/searchApi';

//引入better-scroll
import BScroll from 'better-scroll';

export default {
  name: '',
  data(){
  	return {
      hotMusicList:[],
      keywords:'',
      searchMusicList:[],
      zhidaState:false,
      musicListState:false,
      scroll:''
  	}
  },
  computed:{
    showState(){
      return this.keywords == '' ? false : true;
    }
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
        // console.log(data);
      });
    },
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

</style>