(function(window){
	var a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, count = 0;

	var btn = document.querySelector('button');
	var txt = document.getElementsByClassName('text')[0];
	btn.onclick = function(){
		count++;
		var num = Math.ceil(Math.random()*6);
		txt.innerText = num;
	}
}(window))

