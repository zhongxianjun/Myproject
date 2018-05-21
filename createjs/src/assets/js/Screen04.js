import G from './gloable';

export default function Screen04(stage,queue){
	this.stage = stage;
	this.queue = queue;
	this.container = new createjs.Container();
	this.stage.addChild(this.container);
	this._init();
}

Screen04.prototype._init = function(){
	G.screenLocked = 4;

	//背景
	this._bg();

	//文字
	this._showText()
	.then(()=>{
		//按钮
		this._button();
	})
}

Screen04.prototype._bg = function(){
	//移除之前的背景
	createjs.Tween.get(G.bg)
	.to({
		alpha:0
	},3000)
	.call(()=>{
		this.stage.removeChild(G.bg);
	});

	this.groundBg = new createjs.Bitmap(this.queue.getResult('04_ground_bg'));
	this.groundBg.y = 1810;


	this.ground = new createjs.Bitmap(this.queue.getResult('04_ground'));
	this.ground.y = 1810;
	createjs.Tween.get(this.ground)
	.to({
		x: -150
	}, 5500);

	this.bgContainer = new createjs.Container();
	this.bgContainer.addChild(this.groundBg,this.ground);

	G.bgContainer = this.bgContainer;

	this.bgContainer.alpha = 0;
	createjs.Tween.get(this.bgContainer)
	.to({
		alpha:1
	},3000);

	this.container.addChild(this.bgContainer);

	G.girlAnimation.gotoAndPlay('walk');
	G.girlAnimation.x = 590;
	G.girlAnimation.y = 2250;

	createjs.Tween.get(G.girlAnimation)
	.to({
		x: 600
	},5500)
	.call(()=>{
		G.girlAnimation.gotoAndPlay('stand');
	});
	
	this.container.addChild(G.girlAnimation);
}

Screen04.prototype._showText = function(){
	return new Promise((resolve, reject)=>{
		this.text01 = new createjs.Bitmap(this.queue.getResult('04_text01'));
		this.text01.alpha = 0;
		this.text01.x = 200;
		this.text01.y = 1880;

		createjs.Tween.get(this.text01)
		.to({
			x:230,
			alpha: 1 
		}, 2500);

		this.text02 = new createjs.Bitmap(this.queue.getResult('04_text02'));
		this.text02.alpha = 0;
		this.text02.x = 400
		this.text02.y = 1960;
		createjs.Tween.get(this.text02)
		.wait(2500)
		.to({
			x: 370,
			alpha: 1 
		}, 2500)
		.call(()=>{
			resolve();
		});

		this.container.addChild(this.text01, this.text02);
	});
	
}



Screen04.prototype._button = function(){
	this.optipBtn = new createjs.Bitmap(this.queue.getResult('screen_optipbtn'));
	this.optipBtn.x = 1050;
	this.optipBtn.y = 2200;

	this.optipCircle = new createjs.Bitmap(this.queue.getResult('screen_optipcircle'));
	this.optipCircle.x = 1085;
	this.optipCircle.y = 2235;
	this.optipCircle.regX = 35;
	this.optipCircle.regY = 35;
	createjs.Tween.get(this.optipCircle,{loop:true})
	.to({
		alpha: 0,
		scaleX: 1.5,
		scaleY: 1.5
	},1500);

	//给按钮添加显示动画
	this.btnContainer = new createjs.Container();
	this.btnContainer.addChild(this.optipBtn,this.optipCircle);
	this.btnContainer.alpha = 0;
	createjs.Tween.get(this.btnContainer)
	.to({
		alpha:1
	},500)

	this.container.addChild(this.btnContainer);

	this.optipBtn.addEventListener('click',()=>{
		//按钮消失
		this.container.removeChild(this.btnContainer);

		//小女孩跑动
		G.girlAnimation.gotoAndPlay('run');
		createjs.Tween.get(G.girlAnimation)
		.to({
			x:1400
		},5500)
		.call(()=>{
			G.screen = 5;
		});

		//文字消失动画
		createjs.Tween.get(this.text01)
		.to({
			x:200,
			alpha:0
		},1500);

		createjs.Tween.get(this.text02)
		.to({
			x:400,
			alpha:0
		},1500);
	})
}