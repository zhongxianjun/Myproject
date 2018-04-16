var vm = new Vue({
	el: '#index',
	data:{
		option1:'点餐',
		option2:'评价',
		option3:'商家',
		state:0,
	},
	methods:{
		tab:function(index){
			this.state = index;
		}
	}
})