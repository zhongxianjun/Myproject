//使用vue框架实现 累加计算
var vm = new Vue({
	el: '#add',
	data:{
		inVal:0,
		outVal:0
	},
	methods:{
		cumulative:function(i){
			if(i < 1){
				return 0;
			}
			return this.outVal = parseInt(i) + this.cumulative(i-1);
		}
	}
})