window.onload = function(){
	var wrap = document.getElementById('wrap'),
		ul = document.getElementById('ul-list'),
		text = document.getElementById('txt'),
		ul_list = document.getElementById('ul-list'),
		sort = document.getElementById('sort'),
		instant = document.getElementById('instant_input'),
		arr = [];
	wrap.onclick = function(ev){
		var ev = ev || window.event,
			target = ev.target || ev.srcElement,
			target_id = target.id || target.value;
		//arr记录输入的数
		// GetRandomNum(10,100);
		
		if(arr.length <= 60){
			switch(target_id){
				case 'btnLeftIn':
					if (text.value != '') {
						arr.unshift(text.value*5);
						ul.innerHTML = '<li style = height:'+arr[0]+'px ></li>' + ul.innerHTML;
					}else{
						alert('请输入数据！');
					}
					break;
				case 'btnRightIn':
					if (text.value != '') {
						arr.push(text.value*5);
						ul.innerHTML += '<li style = height:'+arr[arr.length -1]+'px ></li>';
					}else{
						alert('请输入数据！');
					}		
					break;
				case 'btnLeftOut':
					// 不兼容ie
					if(ul.querySelector("li:first-child")){
						arr.shift();
						ul.querySelector("li:first-child").remove();
					}else{
						alert('队列中元素为空！');
					}	
					break;
				case 'btnRightOut':
					if(ul.querySelector("li:last-child")){
						arr.pop();
						ul.querySelector("li:last-child").remove();
					}else{
						alert('队列中元素为空！');
					}
					break;
				default:
					break;
			}
		}else{
			alert("数量超过60个");
		}	
	};

	//委托处理每个li点击消失事件
	ul_list.onclick = function(){
		var ev = ev || window.event,
			target = ev.target || ev.srcElement;
		// console.log(target.innerHTML);
		// console.log(target.id);
		if (target.nodeType == 1 && target.id != 'ul-list') {
			target.remove();
		}	
	};

	//生成随机数
	function setRandomNum(Min,Max){   
		var Range = Max - Min;   
		var Rand = Math.random();   
		return(Min + Math.round(Rand * Range));   
	}   
	
	function renderChart(num){
	
	}
	/*instant_input.onclick = function(){
		var num = GetRandomNum(10,100);   
		alert(num); 
	};*/

	sort.onclick = function(){
		//li的高度存在了arr中
		var li_list = ul.querySelectorAll('li'),
			arr_li = [];
		for(var i =0; i< li_list.length; i++){
			var height = li_list[i].style.height;
			height = height.slice(0, height.length-2);
			arr_li.push(height);	
		}
		for (var i = 0; i < arr_li.length; i++) {
			for (var j = 0; j < arr_li.length - 1 - i; j++) {
				if (arr_li[j]> arr_li[j + 1]) {
					var t = arr_li[j];
					arr_li[j] = arr_li[j + 1];
					arr_li[j + 1] = t;
					li_list[j].style.height = arr_li[j] + 'px';
					li_list[j+1].style.height = arr_li[j+1] + 'px';
					
					/*setTimeout(function(){
						li_list[j].style.height = arr_li[j] + 'px';
						li_list[j+1].style.height = arr_li[j+1] + 'px';
					},50);*/
					
				}
			}
			// setInterval("sortAqiData.moveOne()",50);
		}

		/*function sort_arr(){
			
		}*/
		

		
	}
};