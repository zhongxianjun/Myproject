import G from './gloable';
export default function Screen01(stage,queue){
	this.stage = stage;
	this.queue = queue;
	this.flowers = [];
	this.flowersPath = [];
	this.container = new createjs.Container();

	this._init();
}


Screen01.prototype._init = function(){
	G.screenLocked = 1;
	//花朵
	this._flower();
}

Screen01.prototype._flower = function(){
	//位置
	var flowerPath = [
		[307,353],
		[421,266],
		[571,216],
		[741,211],
		[866,306],
		[1041,281],
		[1031,121]
	];
	for(let i=0;i<7;i++){
		let flowerObj = new createjs.Bitmap(this.queue.getResult('01_flower'));
		flowerObj.regX = flowerObj.regY = 31
		flowerObj.x = flowerPath[i][0];
		flowerObj.y = flowerPath[i][1];
		this.container.addChild(flowerObj);
		this.flowers.push(flowerObj);
	}

	//解锁路径
	//位置 x,y,deg
	var path = [
		[332,325,-40],
		[466,238,-18],
		[625,194,0],
		[783,231,30],
		[930,300,-15],
		[1025,230,-100]
	];
	for(let i=0;i<6;i++){
		let flowerPathObj = new createjs.Bitmap(this.queue.getResult('01_flower_path'));
		flowerPathObj.setTransform(path[i][0],path[i][1],.6,.6,path[i][2]);
		flowerPathObj.alpha = 0.3;
		this.container.addChild(flowerPathObj);
		this.flowersPath.push(flowerPathObj);
	}

	this.stage.addChild(this.container);
}