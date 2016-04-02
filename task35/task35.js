/*desc by ygf
 * 可以允许输入多条指令，每一行一条
 textarea左侧有一列可以显示当前行数的列（代码行数列），列数保持和textarea中一致
 当textarea发生上下滚动时，代码行数列同步滚动
 能够判断指令是否合法，不合法的指令给出提示（如图）
 点击执行时，依次逐条执行所有命令
 对于GO，TRA以及MOV指令增加可以移动格子数量的参数，例如

 GO 3：向当前方向前进三格
 TRA TOP 2：向屏幕上方平移两格
 MOV RIG 4：方向转向屏幕右侧，向屏幕的右侧移动四格
 * */

var walker = document.getElementById("walker");//获取方块
var header = document.getElementById("header");//获取头
var space = document.getElementsByTagName("td");//获取棋盘
var pos = [5, 5];//用数组存储小方块当前的位置,45就是4*10+5，初始值
var index = pos[0] * 10 + pos[1];
var director = document.getElementById("director");//获取输入的指令
var doer = document.getElementById("doer");//获取按钮点击事件
var headTo = 1;//头部初始值为1，向上，顺时针——2向右，3向下，4向左
/*初始化位置*/
space[0].innerHTML = "";
space[index].appendChild(walker);
/**/
doer.onclick = function () {
    var lineArr = director.value.split(/\n/);
    for (var i = 0; i < lineArr.length; i++) {
        /*正则处理参数*/
        if (lineArr[i].length < 10) {
            var dir,//存储字母指令
                num = 1;//存储数字
            if (lineArr[i].match(/\D{2,7}/)) {
                dir = lineArr[i].match(/\D{2,7}/)[0];
            }
            if (lineArr[i].match(/\d/)){
                num = lineArr[i].match(/\d/)[0];//parseInt(lineArr[i])/*?parseInt(lineArr[i]):0*/;
            }
            console.log(dir,num);
            switch (dir) {
                /*前进*/
                case "GO":
                case "GO ":/*GO后面如果加空格，命令'GO'执行不了，不加空格，命令'GO 2'执行不了T T*/
                    space[index].innerHTML = "";
                    switch (headTo) {
                        case 1:
                            if (pos[0] > num-1) {
                                for (var j = 0; j < num; j++) {
                                    pos[0]--;
                                }
                            } else {
                                alert('OUT!');
                                location.reload();
                            }
                            break;
                        case 2:
                            if (pos[1] < 10-num) {
                                for (var j = 0; j < num; j++) {
                                    pos[1]++;
                                }
                            } else {
                                alert('OUT!');
                                location.reload();
                            }
                            break;
                        case 3:
                            if (pos[0] < 10-num) {
                                for (var j = 0; j < num; j++) {
                                    pos[0]++;
                                }
                            } else {
                                alert('OUT!');
                                location.reload();
                            }
                            break;
                        case 4:
                            if (pos[1] > num-1) {
                                for (var j = 0; j < num; j++) {
                                    pos[1]--;
                                }
                            } else {
                                alert('OUT!');
                                location.reload();
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
                        for (var i = 0; i <num; i++) {
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
                    if (pos[1] < 10-num) {//在棋盘内
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
                    if (pos[0] < 10-num) {//在棋盘内
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
                    if (pos[1] < 10-num) {
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
                    if (pos[0] < 10-num) {
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