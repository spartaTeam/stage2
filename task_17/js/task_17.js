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
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
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
    nowSelectCity: 0,
    nowGraTime: "day"
}


var color = ['#057e0a','#057e0a','#0102fc','#d70d0b','#850084','#414141','#000'];

/**
 * 渲染图表
 */
function renderChart() {
  var citySelect = document.getElementById('city-select'); 
  var renderCity = citySelect.options[pageState.nowSelectCity].innerText; //'北京'
  var renderTime = pageState.nowGraTime;  //'day';
  var renderData = chartData[renderTime][renderCity];
  var renderWidth;
  
  switch (renderTime)
  {
    case 'day':
      renderWidth = '8px';
      break;
    case 'week':
      renderWidth = '20px';
      break;
    case 'month':
      renderWidth = '56px';
      break;
  }
    
  //draw chart
  drawGrap(renderData,renderWidth);
}

function drawGrap(data, width){
  var chartWrap = document.getElementById('aqi-chart-wrap');
  chartWrap.innerHTML="";
  var html='';
  for(key in data){
    var height = data[key]+'px';
    bgColor = selectColor();
    var temp = '<div class="item" title="'+key+':'+data[key]+'" style="display:inline-block;width:'+width+';height:'+height+';background:'+bgColor+'"></div>';
    html+=temp;
  }
  // console.log(html);
  chartWrap.innerHTML = html;
}

function selectColor(){
    var index = Math.round(Math.random()*6);
    return color[index];
}


/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化 

    // 设置对应数据
    var eles = document.getElementsByName('gra-time');
    var selectedTime;
    for (var i = 0; i < eles.length; i++) {
        if (eles[i].checked) {
            selectedTime = eles[i].value;
        }
    }
    // console.log('selectedTime:',selectedTime);
    if(pageState.nowGraTime !== selectedTime){
        pageState.nowGraTime = selectedTime;
        renderChart();
    };

    // 调用图表渲染函数
    // renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化 
    // 设置对应数据
    var selectedCityIndex = document.getElementById('city-select').selectedIndex;
    if (selectedCityIndex !== pageState.nowSelectCity) {
        pageState.nowSelectCity = selectedCityIndex;
        // console.log(pageState.nowSelectCity);
    }
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var graTimeForm = document.getElementById('form-gra-time');
    graTimeForm.onclick = graTimeChange;
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citySelect = document.getElementById('city-select');
    citySelect.innerHTML = '';
    for (key in aqiSourceData) {
        var temp = '<option>' + key + '</option>';
        citySelect.innerHTML += temp;
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.onclick = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式

    //day aqiSourceData
    var chartDay = aqiSourceData;

    //week
    var chartWeek = {};
    for(city in aqiSourceData){
      chartWeek[city] = calcToWeekData(city, aqiSourceData[city]);
    }

    //month
    var chartMonth = {};
    for(city in aqiSourceData){
      chartMonth[city] = calcToMonthData(city, aqiSourceData[city]);
    }

    // console.log(chartWeek);
    // console.log(chartMonth);

    // 处理好的数据存到 chartData 中
    chartData['day'] = chartDay;
    chartData['week'] = chartWeek;
    chartData['month'] = chartMonth;

    renderChart();
}


// city="北京";
// obj = {"2016-01-01": 10, "2016-01-02": 10, };
function calcToWeekData(city, obj) {
    var resultObj = {};
    var week = 1; //当前第几周
    var count = 0; //保存当前周的天数
    var sum = 0; //保存当前周空气质量之和  
    for (key in obj) {
        count++;
        sum += obj[key];
        var weekDay = new Date(key).getDay();
        // console.log(weekDay);
        if (weekDay === 0) {
            // console.log(count, sum, week);
            resultObj['第' + week + '周'] = Math.round(sum / count);
            count = 0;
            sum = 0;
            week++;
        }
    }
    if (count !== 0) {
        // console.log(count, sum, week);
        resultObj['第' + week + '周'] = Math.round(sum / count);
    }
    return resultObj;
}

function calcToMonthData(city, obj) {
    var resultObj = {};
    var tempObj = {}; // {{month:{sum:0, count:0}},{}}
    for (var key in obj) {
        var month = (new Date(key).getMonth() + 1);
        // console.log(month); 
        if (tempObj[month + '月']) {
            tempObj[month + '月']['count']++;
            tempObj[month + '月']['sum'] += obj[key];
        } else {
            tempObj[month + '月'] = {};
            tempObj[month + '月']['count'] = 1;
            tempObj[month + '月']['sum'] = obj[key];
        }
    }
    for(month in tempObj){
      resultObj[month] = Math.round(tempObj[month].sum/tempObj[month].count);
    }
    // console.log(tempObj);
    // console.log(resultObj);
    return resultObj;
}


/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();
