<template>
  <div class="tipsFadeAway">
    <div class="tips">
    	未搜索到该歌手信息
    </div>

    <button type="button" @click="_tipsFadeAway()">
    	点击搜索歌曲
    </button>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  methods:{
  	_tipsFadeAway(){	//弹出层渐渐消失效果
  		let tip = document.querySelector('.tips');
  		tip.style.transition = '';
  		tip.style.opacity = '1';

  		let timmer = setTimeout(function(){
  			tip.style.transition = 'all 2s linear';	
  			tip.style.opacity = '0';
  			clearTimeout(timmer);
  		},1000);
  	}
  }
}
</script>

<style lang="scss" scoped>
.tipsFadeAway{
	.tips{
		text-align: center;
		font-size: 14px;
		color:white;
		background: rgba(255,255,255,.2);
		width:160px;
		line-height: 36px;
		position: fixed;
		left:50%;
		top: 27%;
		margin-left: -80px;
		border-radius: 20px;
		opacity: 0;
	}
	button{
		margin: 300px auto;
		width:100px;
		line-height:24px;
		font-size:14px;
		background:#ccc;
		border-radius:12px;
	}
}
</style>