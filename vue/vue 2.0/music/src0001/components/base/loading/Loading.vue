<template>
  <div class="loading" v-show="state">
	<i class="icon"></i>
	<span class="text" v-text="title"></span>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
  	return {
  		
  	}
  },
  props:{
  	title:{
		type:String,
		default:'加载中...'
	},
	state:{
		type:Boolean,
		default:true
	}
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/_themes.scss';
.loading{
	display:flex;
	flex-direction:column;
	width:200px;
	position:fixed;
	top:50%;
	left:50%;
	margin-left:-100px;
	align-items:center;
	.icon{
		width:25px;
		height:25px;
		background:url(loading.gif) no-repeat;
		background-size:100% 100%;
		background-position: center center;
	}
	.text{
		font-size:13px;
		color:$white;
	}
}

</style>