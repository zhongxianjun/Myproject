import G from './gloable';

export default function Screen04(stage,queue){
	this.stage = stage;
	this.queue = queue;
	this.container = new createjs.Container();

	this._init();
}

Screen04.prototype._init = function(){
	G.screenLocked = 4;
}