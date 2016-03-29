window.onload = function() {
	/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
	var radio = document.getElementsByName('gra-time'),
		city = document.getElementById('city-select'),
		chart_wrap = document.getElementsByClassName('aqi-chart-wrap')[0];
	// 以下两个函数用于随机模拟生成测试数据
	function getDateStr(dat) {
		var y = dat.getFullYear();
		var m = dat.getMonth() + 1;
		m = m < 10 ? '0' + m : m;
		var d = dat.getDate();
		d = d < 10 ? '0' + d : d;
		return y + '-' + m + '-' + d;
	}

	function randomBuildData(seed) {
		var returnData = {};
		var dat = new Date("2016-01-01");
		var datStr = ''
		for (var i = 1; i < 92; i++) {
			datStr = getDateStr(dat);
			// console.log(datStr);
			returnData[datStr] = Math.ceil(Math.random() * seed);
			dat.setDate(dat.getDate() + 1);
		}
		// console.log(returnData);
		return returnData;
	}

	var aqiSourceData = {
		"北京": randomBuildData(500),
		"上海": randomBuildData(300),
		"广州": randomBuildData(200),
		"深圳": randomBuildData(100),
		"成都": randomBuildData(300),
		"西安": randomBuildData(500),
		"福州": randomBuildData(100),
		"厦门": randomBuildData(100),
		"沈阳": randomBuildData(500)
	};

	// 用于渲染图表的数据
	var chartData = {};

	// 记录当前页面的表单选项
	var pageState = {
		nowSelectCity: "北京",
		nowGraTime: "day"
	}
	// console.log(pageState.nowSelectCity);
	/**
	 * 渲染图表
	 */
	function renderChart() {
		if(chart_wrap.getElementsByTagName('ul').length != 0){
			chart_wrap.innerHTML = '';
		}
		var ul = document.createElement('ul');
		for(var i =0; i < chartData[1].length; i++){	
			var standard_value =0;
			li = document.createElement('li');
			//如果需要数据标准化...
			standard_value = chartData[1][i];
			li.title = chartData[0][i] + ',' + Math.round(chartData[1][i]);
			li.style.height = standard_value+ 'px';
			li.style.backgroundColor = setColor(standard_value);
			ul.appendChild(li);
			chart_wrap.appendChild(ul);
		}
	}

	//根据区间设置颜色
	function setColor(num){
		if (num >400) {
			color = 'black';
		} else if(num >300){
			color = 'purple';
		}else if(num > 200){
			color = 'red';
		}else if(num > 100){
			color = 'blue';
		}else{
			color = 'green';
		}
		return color;
	}

	/**
	 * 日、周、月的radio事件点击时的处理函数
	 */
	function graTimeChange() {
		// 确定是否选项发生了变化 
		// 设置对应数据
		var selct_time = this.value;
		if(pageState.nowGraTime != selct_time){
			pageState.nowGraTime = selct_time;
			// 时间变化,格式化
			initAqiChartData();
			// 调用图表渲染函数
			renderChart();
		}
	}

	/**
	 * select发生变化时的处理函数
	 */
	function citySelectChange() {
		// 设置对应数据
		//城市变化
		var index = city.selectedIndex,
			city_selected = city.options[index].value;
		// 确定是否选项发生了变化 
		if (pageState.nowSelectCity != city_selected) {
			pageState.nowSelectCity = city_selected;
			//按格式生成数据
			initAqiChartData();
			// 调用图表渲染函数
			renderChart();
		}
	}

	/**
	 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
	 */
	
	function initGraTimeForm() {
		for(var i =0; i< radio.length; i++){
			if (window.addEventListener) {
				radio[i].addEventListener('click', graTimeChange);
			} else if (window.attachEvent) {
				radio[i].attachEvent('onclick', graTimeChange);
			} else {
				radio[i].onclick = graTimeChange;
			}
		}	
	}

	/**
	 * 初始化城市Select下拉选择框中的选项
	 */
	function initCitySelector() {
		// 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
		// 给select设置事件，当选项发生变化时调用函数citySelectChange
		if (window.addEventListener) {
			city.addEventListener('change', citySelectChange);
		} else if (window.attachEvent) {
			city.attachEvent('onchange', citySelectChange);
		} else {
			city.onclick = citySelectChange;
		}	
	}

	/**
	 * 初始化图表需要的数据格式
	 */
	function initAqiChartData() {
		// 将原始的源数据处理成图表需要的数据格式
		// 处理好的数据存到 chartData 中
		var city_val = pageState.nowSelectCity,
			time_val = pageState.nowGraTime,
			allData = [];
		allData[0] = [];
		allData[1] = [];
		//读取城市
		for(var each in aqiSourceData[city_val]){		
			allData[0].push(each);		//存日期
			allData[1].push(aqiSourceData[city_val][each]);		//存数据
		}
		// console.log(allData[0]);
		// console.log(allData[1]);
		switch(time_val){
			case 'day':
				chartData = allData;
				break;
			case 'week':
				var week_arr = [],
					week = 1;
				week_arr[0] = [];	//记录周数
				week_arr[1] = [];	//记录每周数据
				while(allData[1].length > 7){
					//splice第二个参数设置不要超过最大索引值
					week_arr[1].push(eval(allData[1].splice(0,7).join('+'))/7);
					week_arr[0].push('第' + week + '周');
					week++;
				}
				week_arr[1].push(eval(allData[1].join('+'))/allData[1].length);
				week_arr[0].push('第' + week + '周');
				chartData = week_arr;
				break;
			case 'month':
				var month_arr = [],
					month_date;
				month_arr[0] = [];
				month_arr[1] = [];
				while(allData[1].length > 0){
					//获取月份
					//slice参数，[min, max)
					month_date = allData[0][0].slice(0,7);
					switch(month_date.slice(5,7)){
						case '01':
						case '03':
							month_arr[1].push(eval(allData[1].splice(0,31).join('+'))/31);
							allData[0].splice(0,31);
							break;
						case '02':
							month_arr[1].push(eval(allData[1].splice(0,29).join('+'))/29);
							allData[0].splice(0,29);
							break;
						default:
							break;
					}
					month_arr[0].push(month_date);
				}
				chartData = month_arr;
				break;
			default:
				break;
		}
	}
	/**
	 * 初始化函数
	 */
	function init() {
		initGraTimeForm()
		initCitySelector();
		initAqiChartData();
		renderChart();
	}

	init();
}