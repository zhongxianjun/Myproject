import G from './gloable';

export default function Screen03(stage,queue){
	this.stage = stage;
	this.queue = queue;
	this.container = new createjs.Container();

	this._init();
}

Screen03.prototype._init = function(){
	G.screenLocked = 3;

	//按钮
	this._button();

	//文字
	this._text();

	this.stage.addChild(this.container);
}

Screen03.prototype._text = function(){
	this.text01 = new createjs.Bitmap(this.queue.getResult('03_text01'));
	this.text01.alpha = 0;
	this.text01.x = 370;
	this.text01.y = 2050;

	createjs.Tween.get(this.text01)
	.to({
		x: 400,
		alpha: 1 
	}, 2500);

	this.text02 = new createjs.Bitmap(this.queue.getResult('03_text02'));
	this.text02.alpha = 0;
	this.text02.x = 460
	this.text02.y = 2050;
	createjs.Tween.get(this.text02)
	.wait(2500)
	.to({
		x: 430,
		alpha: 1 
	}, 2500)

	this.container.addChild(this.text01, this.text02);
}

Screen03.prototype._button = function(){
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
	},500);

	this.container.addChild(this.btnContainer);
}