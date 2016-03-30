var util = function(){};

util.prototype.isNum = function(num){
	return /^\d+$/.test(num);
}
if(!String.prototype.trim){
	String.prototype.trim = function(){
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]*$/, '');
	}
}

var myUtil = new util();