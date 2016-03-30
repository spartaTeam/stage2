var DOMUtil = function(){}

// 有没有更好的绑定方式，仅作用于DOM元素的
DOMUtil.prototype.addEvent = function(el, type, fn, bubble){
	var onType = 'on' + type;

	if(el.addEventListener){
		el.addEventListener(type, fn, bubble);
	}
	else if(el.attachEvent){
		// 兼容IE8-
		el.attachEvent(onType, fn);
	}
	else{
		// ----onType is ok?
		// ----貌似也不需要这句
		// el.onType(fn);
	}
	
};
DOMUtil.prototype.hasClass = function(el, className){
	if(el){
		return el.className.match(className) ? true : false;
	}
	
};
DOMUtil.prototype.addClass = function(el, className){
	if(!el){
		return false;
	}
	if(!el.className.match(className)){
		el.className += ' ' + className;
	}
};
DOMUtil.prototype.removeClass = function(el, className){
	if(!el){
		return false;
	}
	el.className = el.className.replace(className, '').trim();
};

var domUtil = new DOMUtil();