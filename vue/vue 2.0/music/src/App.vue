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
body{
	margin: 0;
  padding:0;
  background: $black;
}
ul{
	list-style:none;
}
a{
	text-decoration: none;
}
</style>
