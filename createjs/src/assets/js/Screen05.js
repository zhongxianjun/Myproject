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
	G.girlAnimate.x = 0;
	G.girlAnimate.y = 2250;
	G.girlAnimate.gotoAndPlay('run');
	createjs.Tween.get(G.girlAnimate)
	.to({
		x: 600
	},5500)
	.call(()=>{
		G.girlAnimate.gotoAndPlay('stand');
	});

	this.container.addChild(G.girlAnimate);
}