<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
