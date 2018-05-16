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
		{id:'homeBg', src:'../images/homePage_684d8f7.jpg'},
		{id:'musicBg', src:'../media/music.mp3'},

		//场景一的资源
		{id:'01_flower', src:'../images/flower_ddf789f.png'},
		{id:'01_flower_path', src:'../images/dot_7daf7df.png'},
		{id:'01_text',src:'../images/optipwords_cec9df4.png'},
		{id:'01_handtip',src:'../images/handtip_2a217ef.png'}
	]);

	//资源加载进度
	this.queue.on('progress', handleProgress);
	function handleProgress(e){
		this.progress = e.progress;

		loadspanDom.innerText = parseInt(this.progress * 100) + '%';
	}

	//资源加载完成
	this.queue.on('complete',handleComplete);
	function handleComplete(e){
		//当资源加载完成，转场
		G.screen = 1;

		//隐藏加载
		loadDom.style.display = 'none';
		createjs.Sound.play('musicBg');
	}
}