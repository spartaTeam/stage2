// 兼容到IE7

var queueMem = function(val){
	var el = document.createElement('li');
	el.innerHTML = val;
	el.className = 'queue_member';

	return el;
}
window.onload = function(){
	var input = document.getElementById('queue_input'),
		btnWrap = document.getElementById('btn_wrap'),
		loBtn = document.getElementById('left_out'),
		roBtn = document.getElementById('right_out'),
		errorMsg = document.getElementById('error_msg'),
		queueWrap = document.getElementById('queue_wrap'),
		queueLi = queueWrap.getElementsByTagName('li');
	
	checkOut();

	domUtil.addEvent(btnWrap, 'click', function(e){
		
		var target = e.target || e.srcElement,
			queueFirst = queueWrap.firstChild,
			queueLast = queueWrap.lastChild,
			inputV = input.value.trim();

		if(!domUtil.hasClass(target, 'out') && !myUtil.isNum(inputV)){
			domUtil.addClass(errorMsg, 'show');
			return false;
		}
		else{
			domUtil.removeClass(errorMsg, 'show');
		}

		switch(target.id){
			case 'left_in': queueWrap.insertBefore(new queueMem(inputV), queueFirst);
							break;
			case 'right_in': queueWrap.appendChild(new queueMem(inputV));
							break;
			case 'left_out': queueWrap.removeChild(queueFirst);
							alert(queueFirst.innerHTML);
							break;
			case 'right_out': queueWrap.removeChild(queueLast);
							alert(queueLast.innerHTML);
							break;
		}

		input.value = '';

		checkOut();
	});

	domUtil.addEvent(queueWrap, 'click', function(e){
		var target = e.target || e.srcElement;

		if(target.tagName.toLowerCase() === 'li'){
			queueWrap.removeChild(target);
			alert(target.innerHTML);
		}
	});

	// 检测出队按钮是否可用
	function checkOut(){
		if(queueWrap.firstChild){
			loBtn.disabled = false;
			roBtn.disabled = false;
		}
		else{
			loBtn.disabled = true;
			roBtn.disabled = true;
		}
	}
}
