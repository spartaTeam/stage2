window.onload = function(){
	var wrap = document.getElementById('wrap'),
		ul = document.getElementById('ul-list'),
		text = document.getElementById('txt'),
		ul_list = document.getElementById('ul-list');
	// console.log(ul.innerHTML);
	wrap.onclick = function(ev){
		var ev = ev || window.event,
			target = ev.target || ev.srcElement,
			target_id = target.id || target.value;
		// console.log(target_id);
		switch(target_id){
			case 'btnLeftIn':
				if (text.value != '') {
					ul.innerHTML = '<li>' +text.value+'</li>' + ul.innerHTML;
				}else{
					alert('请输入数据！');
				}
				console.log(ul.innerHTML);
				break;
			case 'btnRightIn':
				if (text.value != '') {
					ul.innerHTML += '<li>' +text.value+'</li>';
				}else{
					alert('请输入数据！');
				}
				break;
			case 'btnLeftOut':
				//删除第一个节点
				//兼容的写法
				/*if (ul.childNodes.length != 1) {
					while(ul.childNodes[0].nodeType != 1){
						ul.childNodes[0].remove();
					}
					ul.childNodes[0].remove();	
					// console.log(ul.childNodes.length);
				}else{
					alert('队列中元素为空！');
				}*/
				// 不兼容ie
				if(ul.querySelector("li:first-child")){
					ul.querySelector("li:first-child").remove();
				}else{
					alert('队列中元素为空！');
				}	
				break;
			case 'btnRightOut':

				if(ul.querySelector("li:last-child")){
					ul.querySelector("li:last-child").remove();
				}else{
					alert('队列中元素为空！');
				}
				break;
			default:
				break;
		}
	};
	ul_list.onclick = function(){
		var ev = ev || window.event,
			target = ev.target || ev.srcElement;
		target.remove();
	};
};