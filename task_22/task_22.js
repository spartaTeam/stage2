function $(element) {
    return document.getElementById(element);
}

//事件绑定
function bindEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }
}

var arr = new Array();
var flag = true;


//递归先序遍历
function PreOrderTraverse(T) {
    if (!T) {
        return;
    }
    arr.push(T);
    PreOrderTraverse(T.firstElementChild);
    PreOrderTraverse(T.lastElementChild);
}


//递归中序遍历
function InOrderTraverse(T) {
    if (!T) {
        return;
    }
    InOrderTraverse(T.firstElementChild);
    arr.push(T);
    InOrderTraverse(T.lastElementChild);
}


//递归后续遍历
function PostOrderTraverse(T) {
    if (!T) {
        return;
    }
    PostOrderTraverse(T.firstElementChild);
    PostOrderTraverse(T.lastElementChild);
    arr.push(T);
}


function animate() {
    flag = false;
    var index = 0;

     func = setInterval(function() {
        if (index >= arr.length) {
            clearInterval(func);
            arr[index - 1].style.backgroundColor = '#fff';

            arr = [];
            flag = true;
        } else {
            if (index) arr[index - 1].style.backgroundColor = '#fff';
            arr[index].style.backgroundColor = 'blue';
            index++;
        }

    }, 500)
}

//绑定事件
function startButton() {
    var tree_root = $('tree-root');
    bindEvent($('preOrder'), 'click', function() {
        if (flag) {
            PreOrderTraverse(tree_root);
            animate();
        }
    })
    bindEvent($('inOrder'), 'click', function() {
        if (flag) {
            InOrderTraverse(tree_root);
            animate();
        }
    })
    bindEvent($('postOrder'), 'click', function() {
        if (flag) {
            PostOrderTraverse(tree_root);
            animate();
        }
    })
}

window.onload = function() {
    startButton();
}