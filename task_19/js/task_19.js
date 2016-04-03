window.onload = function(){
	var wrap = document.getElementById('wrap'),
		ul = document.getElementById('ul-list'),
		text = document.getElementById('txt'),
		// ul_list = document.getElementById('ul-list'),
		sort = document.getElementById('sort'),
		instant = document.getElementById('instant_input'),
		arr = [];
	wrap.onclick = function(ev){
		var ev = ev || window.event,
			target = ev.target || ev.srcElement,
			target_id = target.id || target.value;
		//arr记录输入的数
		if(arr.length < 60){
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
			// 判断按钮才进行提醒
			alert("数量超过60个");
		}	
	};
	//委托处理每个li点击消失事件
	ul.onclick = function(){
		var ev = ev || window.event,
			target = ev.target || ev.srcElement;
		// console.log(target.id);
		if (target.nodeType == 1 && target.id != 'ul-list') {
			target.remove();
			arr.length --;
		}	
	};

	//生成随机数
	function setRandomNum(Min,Max){   
		var Range = Max - Min;   
		var Rand = Math.random();   
		arr.push((Min + Math.round(Rand * Range))*5);   
	}   
	
	//渲染表格
	function renderChart(num){
		console.log(arr.length);
		for(i =0; i<arr.length; i++){
			var li = document.createElement('li');
			li.style.height = arr[i] + 'px';
			ul.appendChild(li);
		}
	}
	//快速生成数组
	instant_input.onclick = function(){				   
		ul.innerHTML="";
		arr = [];
		for(var i =0; i < 60; i++){
			setRandomNum(10,100);
		}
		renderChart();
	};

	sort.onclick = function(){
		//li的高度存于arr_li中
		var li_list = ul.querySelectorAll('li'),
			data = [];
		for(var i =0; i< li_list.length; i++){
			var height = li_list[i].style.height;
			height = height.slice(0, height.length-2);
			data.push(parseInt(height));	
		}
		var i =0, j =0, t;
		timer  = setInterval(run,25);
		function run(){
			if(i < data.length){
				if(j < data.length -i -1){
					if(data[j] > data[j+1]){
						t = data[j];
						data[j] = data[j+1];
						data[j+1] = t;
						li_list[j].style.height = data[j] + 'px';
						li_list[j+1].style.height = data[j+1] + 'px';
						// console.log(i + ',' + j);
					}
					j = j+1;
				}else{
					i++;
					j = 0;
				}
			}else{
				clearInterval(timer);
				return;
			}	
		};	
	}
};