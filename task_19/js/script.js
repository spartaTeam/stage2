// 兼容到IE7
window.onload = function(){
	var input = document.getElementById('queue_input'),
		btnWrap = document.getElementById('btn_wrap'),
		loBtn = document.getElementById('left_out'),
		roBtn = document.getElementById('right_out'),
		orderBtn = document.getElementById('order'),
		errorMsg = document.getElementById('error_msg'),
		queueWrap = document.getElementById('queue_wrap'),
		queue = [],
		queueMemLen = 0,
		isAnim = false,
		V_MIN = 10,
		V_MAX = 100,
		HEIGHT_RATE = 2,
		ANIM_RATE = 0.2;
	
	checkOut();

	// 给入、出按钮绑定事件
	domUtil.addEvent(btnWrap, 'click', function(e){
		var target = e.target || e.srcElement,
			queueFirst = queueWrap.firstChild,
			queueLast = queueWrap.lastChild,
			inputV = input.value.trim();

		if(domUtil.hasClass(target, 'in')){
			// 校验输入的值，决定是否显示错误信息
			if(!validate(inputV)){
				domUtil.addClass(errorMsg, 'show');
				return false;
			}
			else{
				domUtil.removeClass(errorMsg, 'show');
			}

			// 队列元素数量最多限制为60个，当超过60个时，添加元素时alert出提示
			if(queueMemLen >= 60){
				alert('已添加60个，达到上限啦~');
				return false;
			}
		}
		else{
			domUtil.removeClass(errorMsg, 'show');
		}

		switch(target.id){
			case 'left_in': queueWrap.insertBefore(new queueMem(inputV), queueFirst);
							queue.unshift(inputV);
							break;
			case 'right_in': queueWrap.appendChild(new queueMem(inputV));
							queue.push(inputV);
							break;
			case 'left_out': queueWrap.removeChild(queueFirst);
							alert('【' + queueFirst.title + '】被踢掉啦~');
							queue.shift();
							break;
			case 'right_out': queueWrap.removeChild(queueLast);
							alert('【' + queueLast.title + '】被踢掉啦~');
							queue.pop();
							break;
		}

		queueMemLen = domUtil.childrenNodes(queueWrap).length;

		input.value = '';

		checkOut();
	});

	// 给排序按钮绑定事件
	domUtil.addEvent(orderBtn, 'click', function(){
		var childs = domUtil.childrenNodes(queueWrap);

		// 从小到大，冒泡排序
		for(var i = 0, len = queue.length; i < (len - 1); i++){
			for(var j = i + 1; j < len; j++){
				var numL = queue[i],
					numR = queue[j];

				if(numL > numR){
					queue[i] = numR;
					queue[j] = numL;

					(function(i, j, numL, numR){
						var timerA = setInterval(function(){
							if(!isAnim){
								changeAnim(childs[i], childs[j], numL, numR);

								clearInterval(timerA);
							}
						}, 200);
					})(i, j, numL, numR);
				}
			}
		}
	});

	// 给队列元素绑定事件，点击删除
	domUtil.addEvent(queueWrap, 'click', function(e){
		var target = e.target || e.srcElement,
			value = target.title;

		if(target.tagName.toLowerCase() === 'li'){
			queueWrap.removeChild(target);
			alert('【' + value + '】被踢掉啦~');
			queue.splice(queue.indexOf(value), 1);
		}
	});

	/*
	 * 队列元素
	 * 返回<li>
	 */
	/*-------------*/
	/*<li>定位优化，高级浏览器可以利用flex底部对齐，考虑兼容*/
	/*-------------*/
	var queueMem = function(val){
		var el = document.createElement('li');

		el.title = val;
		el.style.height = val * HEIGHT_RATE + 'px';
		el.style.marginTop = (V_MAX - val) * HEIGHT_RATE + 'px';
		el.className = 'queue_member';

		return el;
	}
	/*
	 * 检测出队按钮是否可用
	 */
	function checkOut(){
		if(queueWrap.firstChild){
			loBtn.disabled = false;
			roBtn.disabled = false;
			orderBtn.disabled = false;
		}
		else{
			loBtn.disabled = true;
			roBtn.disabled = true;
			orderBtn.disabled = true;
		}
	}
	/*
	 * 输入校验
	 * 返回 true——校验通过；
	 *		false——校验不通过
	 */
	function validate(val){
		return val >= V_MIN && val <= V_MAX;
	}
	/*
	 * 排序单步动画
	 * 交换<li>位置
	 */
	/*-------------*/
	/*动画的优化，考虑高级浏览器利用transform、animation等做出更炫的效果，研究requestAnimationFrame兼容*/
	/*-------------*/
	function changeAnim(elL, elR, numL, numR){
		isAnim = true;

		var perHeight = 0;

		domUtil.addClass(elL, 'highlight');
		domUtil.addClass(elR, 'highlight');

		setTimeout(function(){
			domUtil.removeClass(elL, 'highlight');
			domUtil.removeClass(elR, 'highlight');
			
			var timerH = setInterval(function(){
				if(elL.style.height === numR * HEIGHT_RATE + 'px'){
					elL.title = numR;
					elR.title = numL;

					isAnim = false;

					clearInterval(timerH);
				}
				else{
					perHeight += +(numL - numR) * ANIM_RATE;
					perHeight = +perHeight.toFixed(1);

					elL.style.height = (+numL - perHeight) * HEIGHT_RATE + 'px';
					elL.style.marginTop = (V_MAX - (numL - perHeight)) * HEIGHT_RATE + 'px';
					elR.style.height = (+numR + perHeight) * HEIGHT_RATE + 'px';
					elR.style.marginTop = (V_MAX - (+numR + perHeight)) * HEIGHT_RATE + 'px';
				}
			}, 100);
		}, 100);	
	}
}