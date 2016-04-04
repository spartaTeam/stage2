/*desc by ygf
 新增元素“墙”，墙是正方形不可进入、越过的区域
 新增修墙的指令，BUILD，执行指令时，会在当前方块面对的方向前修建一格墙壁，如果被指定修墙的地方超过边界墙或者已经有墙了，则取消修墙操作，并调用浏览器的console.log方法打印一个错误日志
 新增粉刷的指令，BRU color，color是一个字符串，保持和css中颜色编码一致。执行指令时，如果当前方块蓝色边面对方向有紧相邻的墙，则将这个墙颜色改为参数颜色，如果没有，则通过调用浏览器的console.log方法，打印一个错误日志
 尝试写一段代码，实现在空间内修建一个长长的五颜六色的墙或者有趣的图形
 新增一个按钮，可以在空间内随机生成一些墙
 增加一个指令：MOV TO x, y，会使得方块从当前位置移动到坐标为x，y的地方，移动过程中不能进入墙所在的地方，寻路算法请自行选择并实现，不做具体要求 * */
/*
 * bug:
 *TUN RIG/BAC+GO多步的时候会报错：task36.js:96 Uncaught TypeError: Cannot read property 'appendChild' of undefined
 * 原因，参数num的格式是字符串，要转换成数值
 * BUG:
 * TRA指令有没有对墙进行判断，未解决
 * */

var walker = document.getElementById("walker");//获取方块
var header = document.getElementById("header");//获取头
var space = document.getElementsByTagName("td");//获取棋盘
var pos = [4, 5];//用数组存储小方块当前的位置,45就是4*10+5，初始值
var index = pos[0] * 10 + pos[1];
var director = document.getElementById("director");//获取输入指令的元素
var doer = document.getElementById("doer");//获取按钮点击事件
var refresh = document.getElementById("refresh");//获取刷新点击
var randomWall = document.getElementById("randomWall");//获取生成随机墙按钮
var headTo = 1;//头部初始值为1，向上，顺时针——2向右，3向下，4向左
var wall = [];//墙
/*初始化位置*/
space[0].innerHTML = "";
space[index].appendChild(walker);
/**/
doer.onclick = function () {
    getWall()
    var lineArr = director.value.split(/\n/);
    for (var i = 0; i < lineArr.length; i++) {
        /*正则处理参数*/
        if (lineArr[i].length < 10) {
            var dir,//存储字母指令
                num = 1;//存储数字
            if (lineArr[i].match(/\D{2,}/)) {
                dir = lineArr[i].match(/\D{2,}/)[0];
            }
            if (lineArr[i].match(/\d/)) {
                num = lineArr[i].match(/\d/)[0];//parseInt(lineArr[i])/*?parseInt(lineArr[i]):0*/;
                num = parseInt(num);
            }
            console.log('输入的指令是：', dir, num);
            switch (dir) {
                /*前进*/
                case "GO":
                case "GO ":
                    space[index].innerHTML = "";
                    switch (headTo) {
                        case 1://头部向上，向上走，x--
                            if (!isWall(pos[0] - num, pos[1], 1, num)) {
                                if (pos[0] > num - 1) {
                                    pos[0] -= num;
                                } else {
                                    alert('OUT!');
                                    location.reload();
                                }
                            } else {
                                console.log('你被墙了');
                            }
                            break;
                        case 2://头部向右
                            if (!isWall(pos[0], pos[1] + num, 2, num)) {
                                if (pos[1] < 10 - num) {
                                    pos[1] += num;
                                } else {
                                    alert('OUT!');
                                    location.reload();
                                }
                            } else {
                                console.log('你被墙了');
                            }
                            break;
                        case 3:
                            if (!isWall(pos[0] + num, pos[1], 3, num)) {
                                if (pos[0] < 10 - num) {
                                    pos[0] += num;
                                } else {
                                    alert('OUT!');
                                    location.reload();
                                }
                            } else {
                                console.log('你被墙了');
                            }
                            break;
                        case 4:
                            if (!isWall(pos[0], pos[1] - num, 4, num)) {
                                if (pos[1] > num - 1) {
                                    pos[1] -= num;
                                } else {
                                    alert('OUT!');
                                    location.reload();
                                }
                            } else {
                                console.log('你被墙了');
                            }
                            break;
                    }
                    pos[0] = turnNum(pos[0]);
                    pos[1] = turnNum(pos[1]);
                    index = pos[0] * 10 + pos[1];
                    space[index].appendChild(walker);
                    break;
                /*改变脑洞方向*/
                case "TUN LEF":
                    switch (headTo) {
                        case 1:
                            headTo = 4;
                            header.className = 'head-left';
                            break;
                        case 2:
                            headTo = 1;
                            header.className = 'head-up';
                            break;
                        case 3:
                            headTo = 2;
                            header.className = 'head-right';
                            break;
                        case 4:
                            headTo = 3;
                            header.className = 'head-down';
                            break;
                    }
                    break;
                case "TUN RIG":
                    switch (headTo) {
                        case 1:
                            headTo = 2;
                            header.className = 'head-right';
                            break;
                        case 2:
                            headTo = 3;
                            header.className = 'head-down';
                            break;
                        case 3:
                            headTo = 4;
                            header.className = 'head-left';
                            break;
                        case 4:
                            headTo = 1;
                            header.className = 'head-up';
                            break;
                    }
                    break;
                case "TUN BAC":
                    switch (headTo) {
                        case 1:
                            headTo = 3;
                            header.className = 'head-down';
                            break;
                        case 2:
                            headTo = 4;
                            header.className = 'head-left';
                            break;
                        case 3:
                            headTo = 1;
                            header.className = 'head-up';
                            break;
                        case 4:
                            headTo = 2;
                            header.className = 'head-right';
                            break;
                    }
                    break;
                /*像某个方向前进一步，不改变脑洞方向*/
                case "TRA LEF":
                    if (!isWall(pos[0] , pos[1]- num, 4, num)) {
                        if (pos[1] > num) {//在棋盘内
                            space[index].innerHTML = "";
                            for (var i = 0; i < num; i++) {
                                pos[1]--;
                            }
                            pos[0] = turnNum(pos[0]);
                            pos[1] = turnNum(pos[1]);
                            index = pos[0] * 10 + pos[1];
                            space[index].appendChild(walker);
                        } else {
                            alert('NO LEFT!');
                        }
                    }else{
                        console.log('你被墙了');
                    }
                    break;
                case "TRA TOP":
                    if (!isWall(pos[0] - num, pos[1], 1, num)) {
                        if (pos[0] > num) {//在棋盘内
                            space[index].innerHTML = "";
                            for (var j = 0; j < num; j++) {
                                pos[0]--;
                            }
                            pos[0] = turnNum(pos[0]);
                            pos[1] = turnNum(pos[1]);
                            index = pos[0] * 10 + pos[1];
                            space[index].appendChild(walker);
                        } else {
                            alert('NOT UP');
                        }
                    }else{
                        console.log('你被墙了');
                    }
                    break;
                case "TRA RIG":
                    if (!isWall(pos[0], pos[1] + num, 2, num)) {
                        if (pos[1] < 10 - num) {//在棋盘内
                            space[index].innerHTML = "";
                            for (var j = 0; j < num; j++) {
                                pos[1]++;
                            }
                            pos[0] = turnNum(pos[0]);
                            pos[1] = turnNum(pos[1]);
                            index = pos[0] * 10 + pos[1];
                            space[index].appendChild(walker);
                        } else {
                            alert('NOT RIGHT');
                        }
                    }else{
                        console.log('你被墙了');
                    }
                    break;
                case "TRA BOT":
                    if (!isWall(pos[0] + num, pos[1], 3, num)) {
                        if (pos[0] < 10 - num) {//在棋盘内
                            space[index].innerHTML = "";
                            for (var j = 0; j < num; j++) {
                                pos[0]++;
                            }
                            pos[0] = turnNum(pos[0]);
                            pos[1] = turnNum(pos[1]);
                            index = pos[0] * 10 + pos[1];
                            space[index].appendChild(walker);
                        } else {
                            alert('NOT DOWN');
                        }
                    }else{
                        console.log('你被墙了');
                    }
                    break;
                /*改变脑洞方向同时前进一步*/
                case "MOV LEF":
                    if (!isWall(pos[0], pos[1] - num, 4, num)) {
                        header.className = 'head-left';
                        if (pos[1] > num - 1) {
                            pos[1] -= num;
                        } else {
                            alert('OUT!');
                            location.reload();
                        }
                    } else {
                        console.log('你被墙了');
                    }
                    break;
                case "MOV TOP":
                    if (!isWall(pos[0] - num, pos[1], 1, num)) {
                        header.className = 'head-up';
                        if (pos[0] > num - 1) {
                            pos[0] -= num;
                        } else {
                            alert('OUT!');
                            location.reload();
                        }
                    } else {
                        console.log('你被墙了');
                    }
                    break;
                case "MOV RIG":
                    if (!isWall(pos[0], pos[1] + num, 2, num)) {
                        header.className = 'head-right';
                        if (pos[1] < 10 - num) {
                            pos[1] += num;
                        } else {
                            alert('OUT!');
                            location.reload();
                        }
                    } else {
                        console.log('你被墙了');
                    }

                    break;
                case "MOV BOT":
                    if (!isWall(pos[0] + num, pos[1], 3, num)) {
                        header.className = 'head-down';
                        if (pos[0] < 10 - num) {
                            pos[0] += num;
                        } else {
                            alert('OUT!');
                            location.reload();
                        }
                    } else {
                        console.log('你被墙了');
                    }
                    break;
                /*打墙，判断出下一步位置，再判断是否有墙，如果没有墙，就打墙，如果有墙，就打错*/
                case "BUILD":
                    switch (headTo) {
                        case 1://头部向上
                            if (!isWall(pos[0] - 1, pos[1], 1, 1)) {
                                if (pos[0] > 0) {
                                    space[(pos[0] - 1) * 10 + pos[1]].className = "wall";
                                } else {
                                    alert('OUT!');
                                }
                            } else {
                                console.log('这里已经有墙了');
                            }
                            break;
                        case 2://头部向右
                            if (!isWall(pos[0], pos[1] + 1, 2, 1)) {
                                if (pos[1] < 9) {
                                    space[pos[0] * 10 + pos[1] + 1].className = "wall";
                                } else {
                                    alert('OUT!');
                                }
                            } else {
                                console.log('这里已经有墙了');
                            }
                            break;
                        case 3:
                            if (!isWall(pos[0] + 1, pos[1], 3, 1)) {
                                if (pos[0] < 9) {
                                    space[(pos[0] + 1) * 10 + pos[1]].className = "wall";
                                } else {
                                    alert('OUT!');
                                }
                            } else {
                                console.log('这里已经有墙了');
                            }
                            break;
                        case 4:
                            if (!isWall(pos[0], pos[1] - 1, 4, 1)) {
                                if (pos[1] > 0) {
                                    space[pos[0] * 10 + pos[1] - 1].className = "wall";
                                } else {
                                    alert('OUT!');
                                }
                            } else {
                                console.log('这里已经有墙了');
                            }
                            break;
                    }
                    break;
                case "BRU color":
                    var r = randomColor();
                    var g = randomColor();
                    var b = randomColor();
                    switch (headTo) {
                        case 1://头部向上
                            if (isWall(pos[0] - 1, pos[1], 1, 1)) {
                                if (pos[0] > 0) {
                                    space[(pos[0] - 1) * 10 + pos[1]].style = "background-color:rgb(" + r + "," + g + "," + b + ")";
                                } else {
                                    alert('OUT!');
                                }
                            } else {
                                console.log('这里没墙刷毛线啊');
                            }
                            break;
                        case 2://头部向右
                            if (isWall(pos[0], pos[1] + 1, 2, 1)) {
                                if (pos[1] < 9) {
                                    space[pos[0] * 10 + pos[1] + 1].style = "background-color:rgb(" + r + "," + g + "," + b + ")";
                                } else {
                                    alert('OUT!');
                                }
                            } else {
                                console.log('这里没墙刷毛线啊');
                            }
                            break;
                        case 3:
                            if (isWall(pos[0] + 1, pos[1], 3, 1)) {
                                if (pos[0] < 9) {
                                    space[(pos[0] + 1) * 10 + pos[1]].style = "background-color:rgb(" + r + "," + g + "," + b + ")";
                                } else {
                                    alert('OUT!');
                                }
                            } else {
                                console.log('这里没墙刷毛线啊');
                            }
                            break;
                        case 4:
                            if (isWall(pos[0], pos[1] - 1, 4, 1)) {
                                if (pos[1] > 0) {
                                    space[pos[0] * 10 + pos[1] - 1].style = "background-color:rgb(" + r + "," + g + "," + b + ")";
                                } else {
                                    alert('OUT!');
                                }
                            } else {
                                console.log('这里没墙刷毛线啊');
                            }
                            break;
                    }
                    break;
                default :
                    console.log('不合法指令：', lineArr[i]);
            }
        } else {
            console.log('超出了指令长度');
        }
    }
}

/*刷新输入框*/
refresh.onclick = function () {
    director.value = "";
}

randomWall.onclick = function () {
    hasWall();
}

function hasWall() {
    /*随机生成墙*/
    var wallNo = Math.floor(Math.random() * 100);
    console.log(wallNo);//看生成的随机数是什么
    console.log(myWall.length,myWall);//数组
   // if (myWall.length < 100) {
        for (var i = 0; i < myWall.length; i++) {
            if (wallNo == myWall[i] || wallNo==(pos[0]*10+pos[1])) {
                console.log('flag',wallNo,myWall[i]);
                //hasWall();
            }
        }
        myWall.push(wallNo);
        space[wallNo].style.backgroundColor="#ccc";
   // }else{
    //    console.log('→_→都这样了你还想刷哪。。。');
    //}
}

function turnNum(val) {//当pos值为9+1或0-1，进行处理
    if (val >= 10) {
        return 0;
    } else if (val <= -1) {
        return 9;
    } else {
        return val;
    }
}

/*设定的墙*/
var myWall = [
    5, 6, 7, 8, 9, 15, 19, 25, 29, 35, 55, 65, 70, 75, 80, 85, 90, 91, 92, 93, 94, 95
];

function printWall() {
    for (var i = 0; i < myWall.length; i++) {
        space[myWall[i]].className = "wall";
    }
}
printWall();
/*返回所有墙的位置*/
function getWall() {
    var wallArr = [];
    for (var i = 0; i < space.length; i++) {
        if (space[i].className === 'wall')
            wallArr.push([parseInt(i / 10), i % 10]);
    }
    return wallArr;
}

/*如果小方块下一步的位置是墙或者越墙TRUE，则不能前进*/
function isWall(x, y, headTo, num) {//x,y是小方块即将到达的位置
    var wallArr = getWall();
    var flag = false;
    for (var i = 0; i < wallArr.length; i++) {//把小方块的位置和墙中的位置一一作对比
        if (headTo === 1) {//头向上
            if (y === wallArr[i][1] && wallArr[i][0] < x + parseInt(num)) {//y轴方向一致，比较上方向的墙
                if (x <= wallArr[i][0]) {//小方块要到达的位置比墙的位置还要上面,超出
                    flag = true;
                }
            }
        } else if (headTo === 2) {//头向右
            if (x === wallArr[i][0] && wallArr[i][1] > y - parseInt(num)) {//x轴方向一致，比较右方向的墙
                if (y >= wallArr[i][1]) {
                    flag = true;
                }
            }
        } else if (headTo === 3) {//头向下
            if (y === wallArr[i][1] && wallArr[i][0] > x - parseInt(num)) {//y轴方向一致，比较下方向的墙
                if (x >= wallArr[i][0]) {
                    flag = true;
                }
            }
        } else if (headTo === 4) {//头向左
            if (x === wallArr[i][0] && wallArr[i][1] < y + parseInt(num)) {//x轴方向一致，比较左方向的墙
                if (y <= wallArr[i][1]) {
                    flag = true;
                }
            }
        } else {
            flag = false;
        }
    }
    return flag;
}

/*随机颜色*/
function randomColor() {
    var rgb = Math.floor(Math.random() * 1000) % 256;
    return rgb;
}