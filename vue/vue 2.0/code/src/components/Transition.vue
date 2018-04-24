<template>
  <div id="">
	<button @click="show = !show">过渡效果</button>
  	<transition name="fade">
  		<h1 v-if="show">Transition过渡效果演示</h1>
  	</transition>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
  	return {
  		show:true
  	}
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,.fade-leave-active{
	transition: all 2s;
	opacity:1;
}
.fade-enter,.fade-leave-to{
	opacity:0;
}
</style>