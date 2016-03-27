window.onload = function(){	
 // aqiData，存储用户输入的空气指数数据
 var aqiData = {},
	add_btn = document.getElementById('add-btn'),
	city = document.getElementById('aqi-city-input'),
	value = document.getElementById('aqi-value-input'),
	aqi_table = document.getElementById('aqi-table'),
	button = aqi_table.getElementsByTagName('button'),
	city_tip = document.getElementById('city_tip'),
	value_tip = document.getElementById('value_tip'),
	can_insert = false;
aqiData.keys = [];
aqiData.data = [];

//去除左右两边空格
var trim = function(str){
	return str.replace(/(^\s+)|(\s+$)/g,""); 
};

//检验城市输入格式
//检验空气指数输入格式
function check(str1, str2){
	var re_city = new RegExp('^[a-zA-Z\u4e00-\u9fa5]+$'),
		re_value = new RegExp('^[0-9]{1,}$');
	if (re_city.test(str1) && re_value.test(str2)) {
		city_tip.innerHTML = '';
		value_tip.innerHTML = '';
		can_insert = true;
	} else {
		if (!re_city.test(str1)) {
			city_tip.innerHTML = '城市输入错误！';
		}
		if (!re_value.test(str2)) {
			value_tip.innerHTML = '空气质量输入错误！';
		}
		can_insert = false;
	}
}
//从用户输入中获取数据，向aqiData中增加一条数据
function addAqiData(str1,str2) {
	// can_insert = true;
	aqiData.keys.push(str1)
	aqiData.data.push(str2);
}

 // 渲染aqi-table表格
function renderAqiList() {
		aqi_table.innerHTML += '<tr><td>' + aqiData.keys[aqiData.keys.length - 1] +'</td><td>' + aqiData.data[aqiData.data.length - 1] + '</td><td><button>删除</button>'; 
}

// 点击add-btn时的处理逻辑
// 获取用户输入，更新数据，并进行页面呈现的更新
function addBtnHandle() {
	var city_input = trim(city.value),
		value_input = trim(value.value);
	check(city_input, value_input);
	if (can_insert) {
		addAqiData(city_input,value_input);
 		renderAqiList(city_input,value_input);
	} 
}

// 点击各个删除按钮的时候的处理逻辑
 // 获取哪个城市数据被删，删除数据，更新表格显示
function delBtnHandle(target) {
	// console.log(target);
	var remove_row = target.parentNode.parentNode;
  	remove_row.parentNode.removeChild(remove_row);
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
      add_btn.onclick = addBtnHandle;
       // 事件委托处理动态添加button的click事件
      aqi_table.onclick = function(ev){
      	var ev = ev || window.event;
      	var target = ev.target || ev.srcElement;
      	if (target.nodeName.toLowerCase() == 'button') {
      		delBtnHandle(target);
      	}
      }
}

init();
}















 