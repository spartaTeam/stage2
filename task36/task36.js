/*desc by ygf
 ����Ԫ�ء�ǽ����ǽ�������β��ɽ��롢Խ��������
 ������ǽ��ָ�BUILD��ִ��ָ��ʱ�����ڵ�ǰ������Եķ���ǰ�޽�һ��ǽ�ڣ������ָ����ǽ�ĵط������߽�ǽ�����Ѿ���ǽ�ˣ���ȡ����ǽ�������������������console.log������ӡһ��������־
 ������ˢ��ָ�BRU color��color��һ���ַ��������ֺ�css����ɫ����һ�¡�ִ��ָ��ʱ�������ǰ������ɫ����Է����н����ڵ�ǽ�������ǽ��ɫ��Ϊ������ɫ�����û�У���ͨ�������������console.log��������ӡһ��������־
 ����дһ�δ��룬ʵ���ڿռ����޽�һ��������������ɫ��ǽ������Ȥ��ͼ��
 ����һ����ť�������ڿռ����������һЩǽ
 ����һ��ָ�MOV TO x, y����ʹ�÷���ӵ�ǰλ���ƶ�������Ϊx��y�ĵط����ƶ������в��ܽ���ǽ���ڵĵط���Ѱ·�㷨������ѡ��ʵ�֣���������Ҫ�� * */

var walker = document.getElementById("walker");//��ȡ����
var header = document.getElementById("header");//��ȡͷ
var space = document.getElementsByTagName("td");//��ȡ����
var pos = [4, 5];//������洢С���鵱ǰ��λ��,45����4*10+5����ʼֵ
var index = pos[0] * 10 + pos[1];
var director = document.getElementById("director");//��ȡ�����ָ��
var doer = document.getElementById("doer");//��ȡ��ť����¼�
var headTo = 1;//ͷ����ʼֵΪ1�����ϣ�˳ʱ�롪��2���ң�3���£�4����
var wall = [];//ǽ
/*��ʼ��λ��*/
space[0].innerHTML = "";
space[index].appendChild(walker);
/**/
doer.onclick = function () {
    getWall()
    var lineArr = director.value.split(/\n/);
    for (var i = 0; i < lineArr.length; i++) {
        /*���������*/
        if (lineArr[i].length < 10) {
            var dir,//�洢��ĸָ��
                num = 1;//�洢����
            if (lineArr[i].match(/\D{2,}/)) {
                dir = lineArr[i].match(/\D{2,}/)[0];
            }
            if (lineArr[i].match(/\d/)) {
                num = lineArr[i].match(/\d/)[0];//parseInt(lineArr[i])/*?parseInt(lineArr[i]):0*/;
            }
            console.log(dir, num);

            switch (dir) {
                /*ǰ��*/
                case "GO":
                case "GO ":/*GO��������ӿո�����'GO'ִ�в��ˣ����ӿո�����'GO 2'ִ�в���T T*/
                    space[index].innerHTML = "";
                    switch (headTo) {
                        case 1://ͷ�����ϣ������ߣ�x--
                            if (!isWall(pos[0] - num, pos[1],1)) {
                                if (pos[0] > num - 1) {
                                    pos[0] -= num;
                                } else {
                                    alert('OUT!');
                                    location.reload();
                                }
                            } else {
                                console.log('�㱻ǽ��');
                            }
                            break;
                        case 2://ͷ������
                            if (!isWall(pos[0], pos[1] + num, 2)) {
                                if (pos[1] < 10 - num) {
                                        pos[1]+=num;
                                } else {
                                    alert('OUT!');
                                    location.reload();
                                }
                            } else {
                                console.log('�㱻ǽ��');
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
                                console.log('�㱻ǽ��');
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
                                console.log('�㱻ǽ��');
                            }
                            break;
                    }
                    pos[0] = turnNum(pos[0]);
                    pos[1] = turnNum(pos[1]);
                    index = pos[0] * 10 + pos[1];
                    space[index].appendChild(walker);
                    break;
                /*�ı��Զ�����*/
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
                /*��ĳ������ǰ��һ�������ı��Զ�����*/
                case "TRA LEF":
                    if (pos[1] > num) {//��������
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
                    if (pos[0] > num) {//��������
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
                    if (pos[1] < 10 - num) {//��������
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
                    if (pos[0] < 10 - num) {//��������
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
                /*�ı��Զ�����ͬʱǰ��һ��*/
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
                    console.log('���Ϸ�ָ�', lineArr[i]);
            }
        } else {
            console.log('������ָ���');
        }
    }
}

function turnNum(val) {//��posֵΪ9+1��0-1�����д���
    if (val === 10) {
        return 0;
    } else if (val === -1) {
        return 9;
    } else {
        return val;
    }
}

/*���Է�ˢǽ*/
space[3 * 10 + 5].className = "wall";
space[5 * 10 + 5].className = "wall";
space[4 * 10 + 6].className = "wall";
space[4 * 10 + 4].className = "wall";

/*��������ǽ��λ��*/
function getWall() {
    var wallArr = [];
    for (var i = 0; i < space.length; i++) {
        if (space[i].className === 'wall')
            wallArr.push([parseInt(i / 10), i % 10]);
    }
    return wallArr;
}
/*���С������һ����λ����ǽ����ԽǽTRUE������ǰ��*/
function isWall(x, y, headTo) {//x,y��С���鼴�������λ��
    var wallArr = getWall();
    var flag=false;;
    for (var i = 0; i < wallArr.length; i++) {
        if (headTo === 1) {//ͷ����
            if (x <= wallArr[i][0]) {
                flag=true;
            }
        } else if (headTo === 2) {//ͷ����
            if (y >= wallArr[i][1]) {
                flag=true;
            }
        } else if (headTo === 3) {//ͷ����
            if (x >= wallArr[i][0]) {
                flag=true;
            }
        } else if (headTo === 4) {//ͷ����
            if (y <= wallArr[i][1]) {
                flag=true;
            }
        }
    }
    console.log('head',headTo);
    return flag;
}