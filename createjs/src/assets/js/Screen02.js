import G from './gloable';

export default function Screen02(stage,queue){
	this.stage = stage;
	this.queue = queue;
	this.container = new createjs.Container();

	this._init();
}

Screen02.prototype._init = function(){
	G.screenLocked = 2;

	createjs.Tween.get(this.stage)
	.wait(1500)
	.to({
		y:-595
	},3500);

	//城墙
	this._showBlock();
	//云朵
	this._showCloud();
	//月亮
	this._showMoon();
	//文字
	this._showText();
	//按钮
	this._button();
	//小仙女
	this._girl();

	this.stage.addChild(this.container);
}

Screen02.prototype._showBlock = function(){
	this.Block01 = new createjs.Bitmap(this.queue.getResult('02_block01'));
	this.Block01.x = -60;
	this.Block01.y = 1030;

	this.Block02 = new createjs.Bitmap(this.queue.getResult('02_block02'));
	this.Block02.x = 580;
	this.Block02.y = 1030;

	this.Block03 = new createjs.Bitmap(this.queue.getResult('02_block03'));
	this.Block03.x = 646;
	this.Block03.y = 1030;

	this.Block04 = new createjs.Bitmap(this.queue.getResult('02_block04'));
	this.Block04.x = 850;
	this.Block04.y = 885;

	this.container.addChild(this.Block01,this.Block02,this.Block03,this.Block04);
}

Screen02.prototype._showCloud = function(){
	this.cloud01 = new createjs.Bitmap(this.queue.getResult('02_cloud01'));
	this.cloud01.x = 15;
	this.cloud01.y = 1045;

	this.cloud02 = new createjs.Bitmap(this.queue.getResult('02_cloud02'));
	this.cloud02.x = 100;
	this.cloud02.y = 1045;

	this.cloud03 = new createjs.Bitmap(this.queue.getResult('02_cloud03'));
	this.cloud03.x = 200;
	this.cloud03.y = 1045;

	this.cloud04 = new createjs.Bitmap(this.queue.getResult('02_cloud04'));
	this.cloud04.x = 300;
	this.cloud04.y = 1045;

	this.cloudContainer = new createjs.Container();
	this.cloudContainer.addChild(this.cloud01,this.cloud02,this.cloud03,this.cloud04);
	this.cloudContainer.x = 80;

	createjs.Tween.get(this.cloudContainer)
	.to({
		x:0
	},16000);

	this.container.addChild(this.cloudContainer);
}

Screen02.prototype._showMoon = function(){
	this.moon = new createjs.Bitmap(this.queue.getResult('02_moon'));
	this.moon.x = 860;
	this.moon.y = 585;
	this.container.addChild(this.moon);
}

Screen02.prototype._showText = function(){
	this.text01 = new createjs.Bitmap(this.queue.getResult('02_text01'));
	this.text01.x = 280;
	this.text01.y = 700;

	this.text02 = new createjs.Bitmap(this.queue.getResult('02_text02'));
	this.text02.x = 370;
	this.text02.y = 720;

	this.container.addChild(this.text01,this.text02);
}

Screen02.prototype._button = function(){
	this.optipBtn = new createjs.Bitmap(this.queue.getResult('screen_optipbtn'));
	this.optipBtn.x = 1015;
	this.optipBtn.y = 985;

	this.optipCircle = new createjs.Bitmap(this.queue.getResult('screen_optipcircle'));
	this.optipCircle.x = 1050;
	this.optipCircle.y = 1020;
	this.optipCircle.regX = 35;
	this.optipCircle.regY = 35;
	createjs.Tween.get(this.optipCircle,{loop:true})
	.to({
		alpha:0,
		scaleX:1.5,
		scaleY:1.5
	},1500);

	this.container.addChild(this.optipBtn,this.optipCircle);
}

Screen02.prototype._girl = function(){
	createjs.Ticker.setFPS(14);
	G.girlSprite = new createjs.SpriteSheet({
		images: [this.queue.getResult('02_girl')],
		frames: {
			width: 135,
			height: 100,
			count: 48
		},
		animations: {
			stand: [0,20],
			walk: [21,36]
		}
	});

	this.girlAnimation = new createjs.Sprite(G.girlSprite,'walk');
	this.girlAnimation.x = 450;
	this.girlAnimation.y = 942;

	createjs.Tween.get(this.girlAnimation)
	.wait(3500)
	.to({
		x:590
	},5200)
	.call(()=>{
		this.girlAnimation.gotoAndPlay('stand');
	});

	this.container.addChild(this.girlAnimation);
}