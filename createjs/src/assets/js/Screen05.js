import G from './gloable';
export default function Screen05(stage,queue){
	this.stage = stage;
	this.queue = queue;
	this.container = new createjs.Container();
	this.stage.addChild(this.container);
	this._init();
}

Screen05.prototype._init = function(){
	G.screenLocked = 5;

	//背景
	this._bg();

	//文字
	this._showText();

}

Screen05.prototype._bg = function(){
	//移除之前的背景
	createjs.Tween.get(G.bgContainer)
	.to({
		alpha:0
	},2000)
	.call(()=>{
		this.stage.removeChild(G.bgContainer);
	});

	//显示当前的背景
	this.finalyBg = new createjs.Bitmap(this.queue.getResult('05_bg'));
	this.finalyBg.y = 1810;
	this.finalyBg.alpha = 0;
	createjs.Tween.get(this.finalyBg)
	.to({
		alpha:1
	},3000)

	this.container.addChild(this.finalyBg);

	//女孩动画
	G.girlAnimation.x = 0;
	G.girlAnimation.y = 2250;
	G.girlAnimation.gotoAndPlay('run');
	
	createjs.Tween.get(G.girlAnimation)
	.to({
		x: 600
	},5500)
	.call(()=>{
		G.girlAnimation.gotoAndPlay('stand');

		//shining动画
		this._girlLights();
	});

	this.container.addChild(G.girlAnimation);


}

Screen05.prototype._girlLights = function(){
	let girlLights = new createjs.SpriteSheet({
		images:[this.queue.getResult('05_girllights')],
		frames:{
			width: 180,
			height: 150,
			count:30
		},
		animations:{
			shining:[0,29]
		}
	});

	this.girlLightsAnimate = new createjs.Sprite(girlLights,'shining');
	this.girlLightsAnimate.x = 500;
	this.girlLightsAnimate.y = 2200;

	this.container.addChild(this.girlLightsAnimate);
}

Screen05.prototype._showText = function(){
	this.text01 = new createjs.Bitmap(this.queue.getResult('05_text01'));
	this.text01.x = 304;
	this.text01.y = 1970;
	this.text01.alpha = 0;
	createjs.Tween.get(this.text01)
	.wait(8500)
	.to({
		alpha: 1
	},2000);

	this.text02 = new createjs.Bitmap(this.queue.getResult('05_text02'));
	this.text02.x = 525;
	this.text02.y = 2090;
	this.text02.alpha = 0;
	createjs.Tween.get(this.text02)
	.wait(7000)
	.to({
		alpha: 1
	},2000);

	this.container.addChild(this.text01, this.text02);
}