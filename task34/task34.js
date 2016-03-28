/*desc by ygf
 *有bug，在边缘地带变换方向的时候
 * */
/*
 *TRA LEF：向屏幕的左侧移动一格，方向不变
 TRA TOP：向屏幕的上面移动一格，方向不变
 TRA RIG：向屏幕的右侧移动一格，方向不变
 TRA BOT：向屏幕的下面移动一格，方向不变
 MOV LEF：方向转向屏幕左侧，并向屏幕的左侧移动一格
 MOV TOP：方向转向屏幕上面，向屏幕的上面移动一格
 MOV RIG：方向转向屏幕右侧，向屏幕的右侧移动一格
 MOV BOT：方向转向屏幕下面，向屏幕的下面移动一格
 * */
var walker = document.getElementById("walker");//获取方块
var header = document.getElementById("header");//获取头
var space = document.getElementsByTagName("td");//获取棋盘
var pos = [4, 5];//用数组存储小方块当前的位置,45就是4*10+5，初始值
var index = pos[0] * 10 + pos[1];
var director = document.getElementById("director");//获取输入的指令
var doer = document.getElementById("doer");//获取按钮点击事件
var headTo = 1;//头部初始值为1，向上，顺时针——2向右，3向下，4向左
/*初始化位置*/
space[0].innerHTML = "";
space[index].appendChild(walker);
/**/
doer.onclick = function () {
    var txt = director.value;
    /*前进*/
    if (txt === "GO") {
        space[index].innerHTML = "";
        /*判断头的方向*/
        if (headTo === 1) {//如果向上
            if (pos[0] > 0) {
                pos[0]--;
            } else {
                alert('OUT!');
                location.reload();
            }
        } else if (headTo === 2) {//如果向右
            if (pos[1] < 9) {
                pos[1]++;
            } else {
                alert('OUT!');
                location.reload();
            }
        } else if (headTo === 3) {//如果向下
            if (pos[0] < 9) {
                pos[0]++;
            } else {
                alert('OUT!');
                location.reload();
            }
        } else if (headTo === 4) {//如果向左
            if (pos[1] > 0) {
                pos[1]--;
            } else {
                alert('OUT!');
                location.reload();
            }
        }
        pos[0] = turnNum(pos[0]);
        pos[1] = turnNum(pos[1]);
        index = pos[0] * 10 + pos[1];
        space[index].appendChild(walker);
    }
    else if (txt === "TUN LEF") {
        if (headTo === 1) {//如果向上
            headTo = 4;
            header.className = 'head-left';
        } else if (headTo === 2) {//如果向右
            headTo = 1;
            header.className = 'head-up';
        } else if (headTo === 3) {//如果向下
            headTo = 2;
            header.className = 'head-right';
        } else if (headTo === 4) {//如果向左
            headTo = 3;
            header.className = 'head-down';
        }
    }
    else if (txt === "TUN RIG") {
        if (headTo === 1) {//如果向上
            headTo = 2;
            header.className = 'head-right';
        } else if (headTo === 2) {//如果向右
            headTo = 3;
            header.className = 'head-down';
        } else if (headTo === 3) {//如果向下
            headTo = 4;
            header.className = 'head-left';
        } else if (headTo === 4) {//如果向左
            headTo = 1;
            header.className = 'head-up';
        }
    }
    else if (txt === "TUN BAC") {
        if (headTo === 1) {//如果向上
            headTo = 3;
            header.className = 'head-down';
        } else if (headTo === 2) {//如果向右
            headTo = 4;
            header.className = 'head-left';
        } else if (headTo === 3) {//如果向下
            headTo = 1;
            header.className = 'head-up';
        } else if (headTo === 4) {//如果向左
            headTo = 2;
            header.className = 'head-right';
        }
    }
    else if (txt === "TRA LEF") {
        if (pos[1] > 0) {//在棋盘内
            space[index].innerHTML = "";
            pos[1]--;
            index = pos[0] * 10 + pos[1];
            space[index].appendChild(walker);
        } else {
            alert('NO LEFT!');
        }
    }
    else if (txt === "TRA TOP") {
        if (pos[0] > 0) {//在棋盘内
            space[index].innerHTML = "";
            pos[0]--;
            index = pos[0] * 10 + pos[1];
            space[index].appendChild(walker);
        } else {
            alert('NOT UP');
        }
    }
    else if (txt === "TRA RIG") {
        if (pos[1] < 9) {//在棋盘内
            space[index].innerHTML = "";
            pos[1]++;
            index = pos[0] * 10 + pos[1];
            space[index].appendChild(walker);
        } else {
            alert('NOT RIGHT');
        }
    }
    else if (txt === "TRA BOT") {
        if (pos[0] < 9) {//在棋盘内
            space[index].innerHTML = "";
            pos[0]++;
            index = pos[0] * 10 + pos[1];
            space[index].appendChild(walker);
        } else {
            alert('NOT DOWN');
        }
    }
    else if (txt === "MOV LEF") {
        header.className = 'head-left';
        if (pos[1] > 0) {
            header=4;
            pos[1]--;
            pos[0] = turnNum(pos[0]);
            pos[1] = turnNum(pos[1]);
            index = pos[0] * 10 + pos[1];
            space[index].appendChild(walker);
        } else {
            alert('OUT!');
            location.reload();
        }
    }
    else if (txt === "MOV TOP") {
        header.className = 'head-up';
        if (pos[0] > 0) {
            header=1;
            pos[0]--;
            pos[0] = turnNum(pos[0]);
            pos[1] = turnNum(pos[1]);
            index = pos[0] * 10 + pos[1];
            space[index].appendChild(walker);
        } else {
            alert('OUT!');
            location.reload();
        }
    }
    else if (txt === "MOV RIG") {
        header.className = 'head-right';
        if (pos[1] < 9) {
            header=2;
            pos[1]++;
            pos[0] = turnNum(pos[0]);
            pos[1] = turnNum(pos[1]);
            index = pos[0] * 10 + pos[1];
            space[index].appendChild(walker);
        } else {
            alert('OUT!');
            location.reload();
        }
    }
    else if (txt === "MOV BOT") {
        header.className = 'head-down';
        if (pos[0] < 9) {
            header=4;
            pos[0]++;
            pos[0] = turnNum(pos[0]);
            pos[1] = turnNum(pos[1]);
            index = pos[0] * 10 + pos[1];
            space[index].appendChild(walker);
        } else {
            alert('OUT!');
            location.reload();
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