
var timer,timer1;
var j;
var main = document.getElementById("main");
//点击后轮播

function play1() {
	timer1 = setInterval(turn, 200)
}

function stop1() {
	clearInterval(timer1);
}
//正常轮播

function play() {
	timer = setInterval(turn, 6000)
}

function stop() {
	clearInterval(timer);
}
//开始与结束轮播
var right = document.getElementById("right");
var openBtn = document.getElementById("openBtn");
openBtn.addEventListener("touchstart", play);
var linkBtn = document.getElementById("linkBtn");
//通过改变top值来轮播 change: 修改了轮播方式 
linkBtn.addEventListener("touchstart", stop);
turn = function turn(i) {
	if(i === undefined) {
		i = 1;
	}
	if(i == 0) {
	//	$("main").bind('click','.imgother', mainClick)
		return
	}
	//$('#main').unbind('click')	
	var newFirst = $('.imgfrist').eq(0).next().removeClass('imgother').addClass('imgfrist')
	var oldFirst = $('.imgfrist').eq(0).remove().appendTo($('#main')).removeClass('imgfrist').addClass('imgother')
	if(i == 1) {
		showobject(newFirst.attr("id")[3])
	}
	return turn(--i)
	/*if (lengthnum > 4) {
		for (j = 0; j < lengthnum; j++) {
			per = (parseInt($("#img" + j + "").css("top")) * 100 / parseInt($("#container").css("height")) + 0.2).toFixed(1);
			if ((per - 0.2) < 0) {
				permax1 = (permax - 23.4 * 2) + "%"
				$("#img" + j + "").css('top', permax1);
			} else if ((per - 0.2) < 20 && (per - 0.2) >= 0) {
				$("#img" + j + "").removeClass("imgfrist");
				$("#img" + j + "").addClass("imgother");
				swp3 = (per - 23.4).toFixed(1) + "%";
				$("#img" + j + "").css('top', "" + swp3 + "");
			} else if (Math.round(per) == 30) {
				showobject(j);
				$("#img" + j + "").removeClass("imgother");
				$("#img" + j + "").addClass("imgfrist");
				$("#img" + j + "").css('top', 0 + "%")
			} else {
				swp4 = (per - 23.4).toFixed(1) + "%";
				$("#img" + j + "").css("top", "" + swp4 + "")
			}
		}
	} else {
		//当图片少于4张
		console.log("less then four")
		$('.imgfirst').remove().appendTo($('#main')).removeClass("imgfirst").addClass("imgother")
		

		for(j = 0;j< lengthnum;j++) {
			
		}

	}*/
}
//通过加快轮播频率转到点击项目
$("#main").on('click', '.imgother', mainClick)
//#main 点击时触发函数
function mainClick(e) {
	stop();
	for (j = 0; j < lengthnum; j++) {
		per2 = (parseInt($(this).css("top")) * 100 / parseInt($("#container").css("height")) + 0.2).toFixed(1)
		per1 = (parseInt($("#img" + j + "").css("top")) * 100 / parseInt($("#container").css("height")) + 0.2).toFixed(1);
		if (per1 >= 0 && per1 < 15) {
			docu = Math.round((per2 - 6.4) / 23.4)
		}
	}
	
		turn($(this).index())
	if(!(timer1 == undefined)) {
		stop1()
	}
//	play1();
//	setTimeout(stop1, docu * 200)
	setTimeout(play(), 800)
}
//引入touchSwipe插件实现上划时，插件滚动2个项目
$("#main").swipe({
	swipeUp: function() {
		turn(2)
	},
})
//重载右侧项目详情函数

function showobject(l) {
	$.ajax({
		type: "get",
		url: "http://123.207.254.195:7007/api/works",
		datatype: "json",
		success: function(onedata) {
			$(".titleStyle").text("" + onedata.projects[l].title + "");
			$(".introStyle").text("" + onedata.projects[l].intro + "");
			$(".contentStyle").text("" + onedata.projects[l].content + "");
			$(".buttonStyle").attr("href", onedata.projects[l].url);
		}
	})
};
