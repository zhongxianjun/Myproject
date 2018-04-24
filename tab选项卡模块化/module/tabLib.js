(function(window){
	function Tab(params){
		this.params = params;
		this.init(this.params.nav,this.params.con);
	}

	//初始化函数
	//取得nav的dom 取得con内容dom 为nav绑定点击事件实现切换
	Tab.prototype.init = function(elNav,elCon){
		//获取操作nav菜单dom
		let navType = isDomOrString(elNav);
		if(navType === 'dom'){
			this.navNode = elNav;
		}else if(navType === 'string'){
			this.navNode = document.querySelector(elNav);
		}


		//获取内容区dom
		let conType = isDomOrString(elCon);
		if(conType === 'dom'){
			this.conNode = elCon.children;
		}else if(conType === 'string'){
			this.conNode = document.querySelector(elCon).children;
		}


		//选中第一个菜单,默认显示第一个内容
		this.navNode.firstElementChild.style.color = 'red';

		let conNode = this.conNode;
		for(let con of conNode){
			con.style.display = 'none';
		}
		this.conNode[0].style.display = 'block';


		//为nav绑定点击事件
		let _self = this;
		this.navNode.addEventListener('click',function(e){
			let target = e.target || window.event.srcElement;
			let i = target.getAttribute('data-index');
			

			if(i){
				let navLists = target.parentNode.children;
				for(let n of navLists){
					n.style.color = 'rgb(0, 0, 238)';
				}
				target.style.color = 'red';
				let conNode = _self.conNode;
				for(let item of conNode){
					item.style.display = 'none';
				}
				_self.conNode[i].style.display = 'block';
			}
			
		},false);
		
	}


	//判定给定的值是dom还是string选择器
	function isDomOrString(el){
		let type;
		if(el instanceof HTMLElement){
			type = 'dom';
		}else if(Object.prototype.toString.call(el).slice(8,-1) === 'String'){
			type = 'string';
		}
		return type;
	}

	//将Tab挂载在全局对象window 
	window.Tab = Tab;
}(window));