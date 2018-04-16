$(function(){
	var modular = (function(){
		var tab,tab_index,label;

		return {
			inint:function(t,i,l){
				tab = $(t);
				tab_index = $(i);
				label = l;
			},
			switch:function(){
				tab.delegate(label,'click',function(){
					$(this).addClass('on').siblings().removeClass('on');
					var index = $(this).attr('index');
					$(tab_index).eq(index).addClass('on').siblings().removeClass('on');
				})
			}
		};
	})();
	modular.inint('.tab','.tab_index','a');
	modular.switch();
})