var vm = new Vue({
	el: '#form',
	data:{
		tol:'',
		val:'',
		content:'',
	},
	methods:{
		submit:function(val,tol){
			if(this.val == '' || (/^\s+$/g).test(val) ||this.tol == '' || (/^\s+$/g).test(tol)){
				alert('请输入标题或内容');
				return
			}
			this.content += '<li><h2>'+ tol +'</h2>'+ val +'</li>';
			this.val = '';
			this.tol = '';
		}
	}
})