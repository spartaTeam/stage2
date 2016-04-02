/*desc by ygf
 新增元素“墙”，墙是正方形不可进入、越过的区域
 新增修墙的指令，BUILD，执行指令时，会在当前方块面对的方向前修建一格墙壁，如果被指定修墙的地方超过边界墙或者已经有墙了，则取消修墙操作，并调用浏览器的console.log方法打印一个错误日志
 新增粉刷的指令，BRU color，color是一个字符串，保持和css中颜色编码一致。执行指令时，如果当前方块蓝色边面对方向有紧相邻的墙，则将这个墙颜色改为参数颜色，如果没有，则通过调用浏览器的console.log方法，打印一个错误日志
 尝试写一段代码，实现在空间内修建一个长长的五颜六色的墙或者有趣的图形
 新增一个按钮，可以在空间内随机生成一些墙
 增加一个指令：MOV TO x, y，会使得方块从当前位置移动到坐标为x，y的地方，移动过程中不能进入墙所在的地方，寻路算法请自行选择并实现，不做具体要求 * */

var walker = document.getElementById("walker");//获取方块
var header = document.getElementById("header");//获取头
var space = document.getElementsByTagName("td");//获取棋盘
var pos = [4, 5];//用数组存储小方块当前的位置,45就是4*10+5，初始值
var index = pos[0] * 10 + pos[1];
var director = document.getElementById("director");//获取输入的指令
var doer = document.getElementById("doer");//获取按钮点击事件
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
            }
            console.log(dir, num);

            switch (dir) {
                /*前进*/
                case "GO":
                case "GO ":/*GO后面如果加空格，命令'GO'执行不了，不加空格，命令'GO 2'执行不了T T*/
                    space[index].innerHTML = "";
                    switch (headTo) {
                        case 1://头部向上，向上走，x--
                            if (!isWall(pos[0] - num, pos[1],1)) {
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
                            if (!isWall(pos[0], pos[1] + num, 2)) {
                                if (pos[1] < 10 - num) {
                                        pos[1]+=num;
                                } else {
                                    alert('OUT!');
                                    location.reload();
                                }
                            } else {
                                console.log('你被墙了');
                            }
                            break;
                        case 3:
                            if (!isWall(pos[0] + num, pos[1], 3)) {
                                if (pos[0] < 10 - num) {
                                        pos[0]+=num;
                                } else {
                                    alert('OUT!');
                                    location.reload();
                                }
                            } else {
                                console.log('你被墙了');
                            }
                            break;
                        case 4:

                            if (!isWall(pos[0], pos[1] - num, 4)) {
                                if (pos[1] > num - 1) {
                                        pos[1]-=num;
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
                    if (pos[1] > num) {//在棋盘内
                        space[index].innerHTML = "";
                        for (var i = 0; i < num; i++) {
                            pos[1]--;
                        }
                        index = pos[0] * 10 + pos[1];
                        space[index].appendChild(walker);
                    } else {
                        alert('NO LEFT!');
                    }
                    break;
                case "TRA TOP":
                    if (pos[0] > num) {//在棋盘内
                        space[index].innerHTML = "";
                        for (var j = 0; j < num; j++) {
                            pos[0]--;
                        }
                        index = pos[0] * 10 + pos[1];
                        space[index].appendChild(walker);
                    } else {
                        alert('NOT UP');
                    }
                    break;
                case "TRA RIG":
                    if (pos[1] < 10 - num) {//在棋盘内
                        space[index].innerHTML = "";
                        for (var j = 0; j < num; j++) {
                            pos[1]++;
                        }
                        index = pos[0] * 10 + pos[1];
                        space[index].appendChild(walker);
                    } else {
                        alert('NOT RIGHT');
                    }
                    break;
                case "TRA BOT":
                    if (pos[0] < 10 - num) {//在棋盘内
                        space[index].innerHTML = "";
                        for (var j = 0; j < num; j++) {
                            pos[0]++;
                        }
                        index = pos[0] * 10 + pos[1];
                        space[index].appendChild(walker);
                    } else {
                        alert('NOT DOWN');
                    }
                    break;
                /*改变脑洞方向同时前进一步*/
                case "MOV LEF":
                    header.className = 'head-left';
                    if (pos[1] > num) {
                        header = 4;
                        for (var j = 0; j < num; j++) {
                            pos[1]--;
                        }
                        pos[0] = turnNum(pos[0]);
                        pos[1] = turnNum(pos[1]);
                        index = pos[0] * 10 + pos[1];
                        space[index].appendChild(walker);
                    } else {
                        alert('OUT!');
                        location.reload();
                    }
                    break;
                case "MOV TOP":
                    header.className = 'head-up';
                    if (pos[0] > num) {
                        header = 1;
                        for (var j = 0; j < num; j++) {
                            pos[0]--;
                        }
                        pos[0] = turnNum(pos[0]);
                        pos[1] = turnNum(pos[1]);
                        index = pos[0] * 10 + pos[1];
                        space[index].appendChild(walker);
                    } else {
                        alert('OUT!');
                        location.reload();
                    }
                    break;
                case "MOV RIG":
                    header.className = 'head-right';
                    if (pos[1] < 10 - num) {
                        header = 2;
                        for (var j = 0; j < num; j++) {
                            pos[1]++;
                        }
                        pos[0] = turnNum(pos[0]);
                        pos[1] = turnNum(pos[1]);
                        index = pos[0] * 10 + pos[1];
                        space[index].appendChild(walker);
                    } else {
                        alert('OUT!');
                        location.reload();
                    }
                    break;
                case "MOV BOT":
                    header.className = 'head-down';
                    if (pos[0] < 10 - num) {
                        header = 4;
                        for (var j = 0; j < num; j++) {
                            pos[0]++;
                        }
                        pos[0] = turnNum(pos[0]);
                        pos[1] = turnNum(pos[1]);
                        index = pos[0] * 10 + pos[1];
                        space[index].appendChild(walker);
                    } else {
                        alert('OUT!');
                        location.reload();
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

function turnNum(val) {//当pos值为9+1或0-1，进行处理
    if (val === 10) {
        return 0;
    } else if (val === -1) {
        return 9;
    } else {
        return val;
    }
}

/*测试粉刷墙*/
space[3 * 10 + 5].className = "wall";
space[5 * 10 + 5].className = "wall";
space[4 * 10 + 6].className = "wall";
space[4 * 10 + 4].className = "wall";

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
function isWall(x, y, headTo) {//x,y是小方块即将到达的位置
    var wallArr = getWall();
    var flag=false;;
    for (var i = 0; i < wallArr.length; i++) {
        if (headTo === 1) {//头向上
            if (x <= wallArr[i][0]) {
                flag=true;
            }
        } else if (headTo === 2) {//头向右
            if (y >= wallArr[i][1]) {
                flag=true;
            }
        } else if (headTo === 3) {//头向下
            if (x >= wallArr[i][0]) {
                flag=true;
            }
        } else if (headTo === 4) {//头向左
            if (y <= wallArr[i][1]) {
                flag=true;
            }
        }
    }
    console.log('head',headTo);
    return flag;
}