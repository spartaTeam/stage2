/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = trim(document.getElementById('aqi-city-input').value);
	var value = trim(document.getElementById('aqi-value-input').value);
	var errNode = document.getElementById('err_info');
	//验证数据正确性
	if(!city || !value){
		return alert_info(errNode, '城市或空气质量未填写！');
	}

	if(!isValidChinese(city) && !isValidEnglish(city)){
		return alert_info(errNode, '城市名必须是中文或英文!');
	}
	if(!isInteger(value)){
		return alert_info(errNode, '空气质量必须为整数！');
	}
	//添加数据到aqiData
	aqiData[city] = value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById('aqi-table');
	tbody = table.getElementsByTagName('tbody')[0];
	var  html ='';
	for(key in aqiData){
		var child = '<tr><td>'+key+'</td><td>'+aqiData[key]+'</td><td><button>删除</button></td></tr>';
		html += child;
	}
	tbody.innerHTML = html;
	clearInput();
}

function clearInput(){
	var cityInput = document.getElementById('aqi-city-input');
	var valueInput = document.getElementById('aqi-value-input');
	cityInput.value = '';
	valueInput.value='';
	cityInput.focus();
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(key) {
  // do sth.
  if(aqiData[key]){
  	delete aqiData[key];
  }
  renderAqiList();
}

function init() {
	
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = document.getElementById('add-btn');
  addBtn.addEventListener('click', addBtnHandle);

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var table = document.getElementById('aqi-table');
  table.addEventListener('click', function(event){
  	var e = event || window.event;
  	var eleName = e.target.tagName.toLowerCase();
  	if(eleName === 'button'){
  		var city = e.target.parentNode.parentNode.firstChild.innerText.toString();
  		delBtnHandle(city);
  	}
  });

}

init();


// util 小工具函数

function alert_info(node, msg){
	node.innerHTML = msg;
}

function isValidChinese(value){
	// var chineseReg = new RegExp("^[\\u4E00-\\u9FA5]+$");
	var flag = /^[\u4E00-\u9FA5]+$/.test(value);
	return flag;
}

function isValidEnglish(value){
	var flag = /^[a-zA-Z]+$/.test(value);
	return flag;
}

function isInteger(num){
	var flag = /^\d+$/.test(num);
	return flag;
}

function trim(str){
	if(str){
		str.replace('/(^\s*)|(\s*$)/g','');
	}
	return str;
}