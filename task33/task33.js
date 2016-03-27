/*desc by ygf
 *��if else̫˳���ˣ����ɶ���ò�Ʋ��Ǻܺã��пոĳ�switch case��
 * */
var walker = document.getElementById("walker");//��ȡ����
var header=document.getElementById("header");//��ȡͷ
var space = document.getElementsByTagName("td");//��ȡ����
var pos=[4,5];//������洢С���鵱ǰ��λ��,45����4*10+5����ʼֵ
var index=pos[0]*10+pos[1];
var director=document.getElementById("director");//��ȡ�����ָ��
var doer=document.getElementById("doer");//��ȡ��ť����¼�
var headTo=1;//ͷ����ʼֵΪ1�����ϣ�˳ʱ�롪��2���ң�3���£�4����
/*��ʼ��λ��*/
space[0].innerHTML="";
space[index].appendChild(walker);
/**/
doer.onclick=function(){
    var txt=director.value;
    /*ǰ��*/
    if(txt==="GO"){
        if(pos[0]<9 && pos[1]<9 && pos[0]>0 && pos[1]>0){//��������
        space[index].innerHTML="";
        /*�ж�ͷ�ķ���*/
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
            pos[0]=turnNum(pos[0]);
            pos[1]=turnNum(pos[1]);
        index=pos[0]*10+pos[1];
        space[index].appendChild(walker);
        }else{//��������
            alert('���������ˣ����¿�ʼ��...');
            location.reload();
        }
    }else if(txt==="TUN LEF"){
        if(headTo===1){//�������
           headTo=4;
            header.className='head-left';
        }else if(headTo===2){//�������
            headTo=1;
            header.className='head-up';
        }else if(headTo===3){//�������
            headTo=2;
            header.className='head-right';
        }else if(headTo===4){//�������
            headTo=3;
            header.className='head-down';
        }
    }else if(txt==="TUN RIG"){
        if(headTo===1){//�������
            headTo=2;
            header.className='head-right';
        }else if(headTo===2){//�������
            headTo=3;
            header.className='head-down';
        }else if(headTo===3){//�������
            headTo=4;
            header.className='head-left';
        }else if(headTo===4){//�������
            headTo=1;
            header.className='head-up';
        }
    } else if(txt==="TUN BAC"){
        if(headTo===1){//�������
            headTo=3;
            header.className='head-down';
        }else if(headTo===2){//�������
            headTo=4;
            header.className='head-left';
        }else if(headTo===3){//�������
            headTo=1;
            header.className='head-up';
        }else if(headTo===4){//�������
            headTo=2;
            header.className='head-right';
        }
    }
}

function turnNum(val){//��posֵΪ9+1��0-1�����д���
    if(val===10){
        return 0;
    }else if(val===-1){
        return 9;
    }else{
        return val;
    }
}

