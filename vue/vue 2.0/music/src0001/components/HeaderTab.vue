<template>
  <div class="header">
  	<h1><i class="logo"></i>exclusive music</h1>
  	<div class="nav">
  		<router-link to="/index" active-class="active"><span>推荐</span></router-link>
  		<router-link to="/singer" active-class="active"><span>歌手</span></router-link>
  		<router-link to="/search" active-class="active"><span>搜索</span></router-link>
  	</div>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
  	return {

  	}
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_themes';
.header{ 
	h1{
		margin:0;
		padding:15px 0;
		font-weight: 400;
	    font-size: 22px;
	    color: $white;
	    text-align: center;
	    i{
			background:url('../assets/icon/logo.png');
			background-size:100% 100%;
			display:inline-block;
			width:33px;
			height:33px;
			vertical-align:middle;
			margin-right:10px;
	    }
	}
	.nav{
		display:flex;
		padding-top:10px;
		a{
			flex:1;
  			color:$white;
  			span{
  				padding-bottom:8px;
  				display:inline-block;
  			}
		}
		.active{
			span{
  				border-bottom:2px solid $red;
  				color:$red;
  			}
		}
	}
}
</style>