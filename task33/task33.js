/*desc by ygf
 *用if else太顺手了，但可读性貌似不是很好，有空改成switch case吧
 * */
var walker = document.getElementById("walker");//获取方块
var header=document.getElementById("header");//获取头
var space = document.getElementsByTagName("td");//获取棋盘
var pos=[4,5];//用数组存储小方块当前的位置,45就是4*10+5，初始值
var index=pos[0]*10+pos[1];
var director=document.getElementById("director");//获取输入的指令
var doer=document.getElementById("doer");//获取按钮点击事件
var headTo=1;//头部初始值为1，向上，顺时针——2向右，3向下，4向左
/*初始化位置*/
space[0].innerHTML="";
space[index].appendChild(walker);
/**/
doer.onclick=function(){
    var txt=director.value;
    /*前进*/
    if(txt==="GO"){
        if(pos[0]<9 && pos[1]<9 && pos[0]>0 && pos[1]>0){//在棋盘内
        space[index].innerHTML="";
        /*判断头的方向*/
        if(headTo===1){//如果向上
            pos[0]=pos[0]-1;
        }else if(headTo===2){//如果向右
            pos[1]=pos[1]+1;
        }else if(headTo===3){//如果向下
            pos[0]=pos[0]+1;
        }else if(headTo===4){//如果向左
            pos[1]=pos[1]-1;
        }
            pos[0]=turnNum(pos[0]);
            pos[1]=turnNum(pos[1]);
        index=pos[0]*10+pos[1];
        space[index].appendChild(walker);
        }else{//超出棋盘
            alert('超出棋盘了，重新开始吧...');
            location.reload();
        }
    }else if(txt==="TUN LEF"){
        if(headTo===1){//如果向上
           headTo=4;
            header.className='head-left';
        }else if(headTo===2){//如果向右
            headTo=1;
            header.className='head-up';
        }else if(headTo===3){//如果向下
            headTo=2;
            header.className='head-right';
        }else if(headTo===4){//如果向左
            headTo=3;
            header.className='head-down';
        }
    }else if(txt==="TUN RIG"){
        if(headTo===1){//如果向上
            headTo=2;
            header.className='head-right';
        }else if(headTo===2){//如果向右
            headTo=3;
            header.className='head-down';
        }else if(headTo===3){//如果向下
            headTo=4;
            header.className='head-left';
        }else if(headTo===4){//如果向左
            headTo=1;
            header.className='head-up';
        }
    } else if(txt==="TUN BAC"){
        if(headTo===1){//如果向上
            headTo=3;
            header.className='head-down';
        }else if(headTo===2){//如果向右
            headTo=4;
            header.className='head-left';
        }else if(headTo===3){//如果向下
            headTo=1;
            header.className='head-up';
        }else if(headTo===4){//如果向左
            headTo=2;
            header.className='head-right';
        }
    }
}

function turnNum(val){//当pos值为9+1或0-1，进行处理
    if(val===10){
        return 0;
    }else if(val===-1){
        return 9;
    }else{
        return val;
    }
}

