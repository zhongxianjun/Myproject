/*
tab选项卡插件 


参数说明:
nav:操作菜单选择器
con:内容区选择器
*/
(function(window){
	function Tab(params){
		this.params = params;
		this.nav = {};
		this.con = {};
		this.init(this.params.nav,this.params.con);
	}

	Tab.prototype = {
		init:function(elNav,elCon){
			//nav点击事件处理
			let navType = isDomOrString(elNav);

			if(navType === 'dom'){
				this.nav = elNav;
			}else if(navType === 'string'){

				this.nav = document.querySelector(elNav);
			}

			//con
			let conType = isDomOrString(elCon);
			
			if(conType === 'dom'){
				this.con = elCon.children;
			}else if(conType === 'string'){
				this.con = document.querySelector(elCon).children;
			}
			
			//使用事件代理 给nav的父级绑定点击事件 实现切换功能
			let _self = this;
			this.nav.addEventListener('click',function(e){
				let target = e.target || window.event.srcElement;
				let i = target.getAttribute('data-index');
				if(i){
					for(let o of _self.con){
						o.style.display = 'none';
					}

					_self.con[i].style.display = 'block';
				}
				
			},false);
		}
	}

	//检测是否为dom对象还是字符串
	function isDomOrString(el){
		var type;
		if(el instanceof HTMLElement){
			type = 'dom';
		}else if(Object.prototype.toString.call(el).slice(8,-1) === 'String'){
			type = 'string';
		}

		return type;
	}

	//将Tab挂载到全局
	window.Tab = Tab;
}(window));