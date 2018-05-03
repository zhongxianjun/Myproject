<template>
  <div id="app">
    <router-view/>

  <!-- S  音乐播放 -->
  <div class="audio">
    <audio id="player"  :src="getPlaySrc" autoplay="autoplay"></audio>
  </div>
  <!-- E  音乐播放 -->
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex';

export default {
  name: 'App',
  data(){
    return{

    }
  },
  computed:{
    ...mapGetters([
      'getPlaySrc'
    ])
  },
  methods:{
    
  }
}

</script>

<style lang="scss">
@import 'assets/scss/_themes';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
*{
	padding:0;
	margin:0; 
}
h1,h2,h3,h4,h5,h6,p,body{
  margin: 0;
  padding: 0;
}
body{
  background: $black;
}
ul{
	list-style:none;
}
a{
	text-decoration: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
</style>
