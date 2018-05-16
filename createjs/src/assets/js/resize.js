window.onload=function(){
	resize();

	window.addEventListener("resize",resize);
};
function resize(){
	var c=document.getElementById("stage");
	var a=document.body.clientWidth;
	var b=document.body.clientHeight;
	direction=1>a/b?"portrait":"landscape";
	a=(a>b?b:a)/640;
	c.style.webkitTransform="portrait"==direction?"rotate(90deg) scale("+a+","+a+")":"rotate(0deg) scale("+a+","+a+")";
};