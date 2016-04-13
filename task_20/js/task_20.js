window.onload = function(){
	var inputBtn = document.getElementById('inputBtn'),
		searchBtn = document.getElementById('searchBtn'),
		text = document.getElementById('txt'),
		search_str = document.getElementById('search_str'),
		ul = document.getElementById('ul-list'),
		li = ul.getElementsByTagName('li'),
		input_arr;
	// console.log(ul.innerHTML);
	if (window.addEventListener) {
		inputBtn.addEventListener('click', insert);
		searchBtn.addEventListener('click', search);
	}else if(window.attachEvent){
		inputBtn.attachEvent('click', insert);
		searchBtn.attachEvent('click', search);
	}else{
		inputBtn.onclick = insert;
		searchBtn.onclick = search;
	}

	//插入内容
	function insert(){
		input_arr = text.value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(item){
			if (item != null && item.length > 0) {
				return true;
			}else{
				return false;
			}
		});
		// console.log(input_arr);
		render();
	}

	//查询内容
	function search(){
		var str = search_str.value.trim();
		render(str);	
	}
	function render(str){
		ul.innerHTML = input_arr.map(function(i){
			var r =i;
			if (str != null && str.length) {
				r = r.replace(new RegExp(str), '<span class= "select">' + str + '</span>');
			}
			return '<li>' + r + '</li>';
		});
	}
}; 