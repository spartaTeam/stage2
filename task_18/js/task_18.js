
var leftIn = document.getElementById('left-in');
var leftOut = document.getElementById('left-out');
var rightIn = document.getElementById('right-in');
var rightOut = document.getElementById('right-out');
var input = document.getElementById('input-num');
var show = document.getElementById('show');
var data = [];

//事件绑定
leftIn.onclick = handleLeftIn;
leftOut.onclick = handleLeftOut;
rightIn.onclick = handleRightIn;
rightOut.onclick = handleRightOut;


function formItem(num){
	return '<div class="item">'+num+'</div>';
}

function renderData(){
	var html = '';
	data.forEach(function(item, index){
		html+=formItem(item);
	});
	show.innerHTML = html;
}

function handleLeftIn(){
	var num = input.value;
	if(!isValidNum(num)){
		alert('请输入有效的数字');
		return;
	}
	data.unshift(num);
	// console.log(data);
	renderData();

}
function handleLeftOut(){
	var num = input.value;
	if(!isValidNum(num)){
		alert('请输入有效的数字');
		return;
	}
	data.shift(num);
	// console.log(data);
	renderData();
}
function handleRightIn(){
	var num = input.value;
	if(!isValidNum(num)){
		alert('请输入有效的数字');
		return;
	}
	data.push(num);
	// console.log(data);
	renderData();
}
function handleRightOut(){
	var num = input.value;
	if(!isValidNum(num)){
		alert('请输入有效的数字');
		return;
	}
	data.pop(num);
	// console.log(data);
	renderData();
}

function isValidNum(num){
	if(!num){
		return false;
	}
	var reg = /^\d+$/;
	return reg.test(num);
}