import G from './gloable';

export default function Load(){
	this.progress = 0;
	this._init();
}

var loadDom = null;
var loadspanDom = null;
Load.prototype._init = function(){
	loadDom = document.querySelector('#progress');
	loadspanDom = document.querySelector('#progress span');
	this.queue = new createjs.LoadQueue();
	//注册音频插件
	this.queue.installPlugin(createjs.Sound);

	//定义资源加载队列
	this.queue.loadManifest([
		{id:'homeBg', src:'../imges/homePage_684d8f7.jpg'},
		{id:'musicBg', src:'../media/music.mp3'},

		//场景一的资源
		{id:'01_flower', src:'../images/flower_ddf789f.png'}
	]);

	//资源加载进度
	this.queue.on('progress', handleProgress);
	function handleProgress(e){
		this.progress = e.progress;

		loadspanDom.innerText = parseInt(this.progress * 100) + '%';
	}
}