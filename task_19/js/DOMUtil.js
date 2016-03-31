// 兼容IE7+的DOM操作
var DOMUtil = function(){}

/*
 * 绑定事件
 */
DOMUtil.prototype.addEvent = function(el, type, fn, bubble){
	var onType = 'on' + type;

	if(el.addEventListener){
		el.addEventListener(type, fn, bubble);
	}
	else if(el.attachEvent){
		// 兼容IE8-
		el.attachEvent(onType, fn);
	}
};
/*
 * 判断是否含有类
 */
DOMUtil.prototype.hasClass = function(el, className){
	if(el){
		return el.className.match(className) ? true : false;
	}
	
};
/*
 * 增加类
 */
DOMUtil.prototype.addClass = function(el, className){
	if(!el){
		return false;
	}
	if(!el.className.match(className)){
		el.className += ' ' + className;
	}
};
/*
 * 移除类
 */
DOMUtil.prototype.removeClass = function(el, className){
	if(!el){
		return false;
	}
	el.className = el.className.replace(className, '').trim();
};
/*
 * 获得子节点
 */
DOMUtil.prototype.childrenNodes = function(el){
	var childs = el.childNodes,
		children = [];
	for(var i = 0, len = childs.length; i < len; i++){
		if(childs[i].nodeType == 1){
			children.push(childs[i]);
		}
	}
	return children;
}

var domUtil = new DOMUtil();