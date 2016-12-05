     //删除和编辑状态码，负数为上传
var statenum = -1;
var token;
var lengthnum = 0;
var rightnum = 0;
//登陆请求	
$("#loginBtn").click(function() {
	$.ajax({
		type: "post",
		url: "http://139.199.18.137:7007/api/login",
		datatype: "json",
		data: {
			email: $("#email").val(),
			password: $("#password").val()
		},
		success: function(data) {
			token = data.token;
			turnManage();
			$("#wrongWord").text("");
		},
		error: function(jqXHR) {
			$("#wrongWord").text("登陆失败！请检查账号密码")
		},

	});
})
//删除请求
/*$("ul").on('click', '.button2', function() {
	$.ajax({
		url: "http://139.199.18.137:7007/api/works/delete/?token=" + token,
		type: "post",
		datatype: "json",
		data: {
			id: "" + $(this).attr("id") + "",

		},
		success: function(result) {
			reloadpage();
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			alert(XmlHttpRequest);
		}
	});
});*/
//载入页面
reloadpage();
//得到联系人信息
$("#linkBtn").click(function() {
	$.ajax({
		type: "get",
		url: "http://139.199.18.137:7007/api/colleague",
		datatype: "json",
		success: function(colleagueData) {
			colleague(colleagueData);
		},
		error: function(jqXHR) {
			alert("发生错误:" + jqXHR.status)
		},

	});
})
//通过状态码确定上传或是修改
$(function() {
	//异步提交表单
	$("#okBtn").on("click", function() {
		if (statenum < 0) {
			$("#objectData").ajaxSubmit({
				type: "post",
				url: " http://139.199.18.137:7007/api/works/create?token=" + token,
				success: function(data) {
					reloadpage();
					turn6();
					resetform();
				},
				error: function(XmlHttpRequest, textStatus, errorThrown) {
					alert("请正确填写信息");
				}
			});
		} else {
			$("#objectData").ajaxSubmit({
				type: "post",
				url: " http://139.199.18.137:7007/api/works/" + statenum + "/?token=" + token,
				data: {
					"_method": "patch"
				},
				success: function(data) {
					statenum = -1;
					reloadpage();
					turn6();

					function turn6() {
						addClass(managePage, "pageShow");
						removeClass(updatePage, "pageShow");
					}
					resetform();
				},
				error: function(jqXHR) {
					alert("发生错误:" + jqXHR.status);
				},
			});
		}
	});
});
//加载页面信息表函数
$("ul").on('click', '.button1', function(){
	  statenum=parseInt($(this).attr("id"));
	  changeObject();
	  turn4();
	})
function reloadpage() {
	$.ajax({
		type: "get",
		url: "http://139.199.18.137:7007/api/works",
		datatype: "json",
		success: function(imgdata) {
			introduce=imgdata;
			rightdata(imgdata);
			$("ul").html("")
			$("#main").html("")
			lengthnum = Object.keys(imgdata.projects).length;
			permax = Number(6.4) + Number(23.4) * lengthnum;
			swp1 = lengthnum - 1;
			ioopimg(imgdata);
			manimg(imgdata);
		},
		error: function(jqXHR) {
			alert("发生错误:" + jqXHR.status)
		},

	})
}
//载入联系人数据

function colleague(colleagueData) {
	$("#colleague1").attr("src", colleagueData.colleagues[0].pic);
	$("#chinaName1").text(colleagueData.colleagues[0].name);
	$("#englishName1").text(colleagueData.colleagues[0].engname);
	$("#tel1").text(colleagueData.colleagues[0].tel);
	$(".a1").attr("href", "tel:" + colleagueData.colleagues[0].tel+"")
	$("#wechat1").text(colleagueData.colleagues[0].wechat);
	$("#email1").text(colleagueData.colleagues[0].email);
	$("#colleague2").attr("src", colleagueData.colleagues[1].pic);
	$("#chinaName2").text(colleagueData.colleagues[1].name);
	$("#englishName2").text(colleagueData.colleagues[1].engname);
	$("#tel2").text(colleagueData.colleagues[1].tel);
	$(".a2").attr("href", "tel:" + colleagueData.colleagues[1].tel + "")
	$("#wechat2").text(colleagueData.colleagues[1].wechat);
	$("#email2").text(colleagueData.colleagues[1].email);
	
}
//清空提交页面

function resetform() {
	$("#uppic").attr("src", "上传十字.png")
	$("#image").val("");
	$("#title").val("");
	$("#url").val("");
	$("#intro").val("");
	$("#content").val("");
}
//加载第一个项目的详细信息

function rightdata(imgdata) {
	$(".titleStyle").text("" + imgdata.projects[0].title + "");
	$(".introStyle").text("" + imgdata.projects[0].intro + "");
	$(".contentStyle").text("" + imgdata.projects[0].content + "");
	$(".buttonStyle").attr("href", imgdata.projects[0].url);
}
//登陆成功后使登陆页面消失并加载管理页面
dishow();

function dishow() {
	mask1.style.display = "none";
	loginWrap.style.height = "50%";
	loginWrap.style.width = "70%";
	loginWrap.style.opacity = "0";
	loginWrap.style.zIndex = "1";
	login.style.zIndex = "50";
}

function turnManage() {
	removeClass(firstPage, "pageShow");
	addClass(managePage, "pageShow");
	 mask1.style.display = "none";
	 loginWrap.style.height = "50%";
	 loginWrap.style.width = "70%";
	 loginWrap.style.opacity = "0";
	 loginWrap.style.zIndex = "-1";
	 login.style.zIndex = "50";	
}
//从上传页返回到管理页面

function turn6() {
	addClass(managePage, "pageShow");
	removeClass(updatePage, "pageShow");
}
//跳转页面并加载要修改的项目信息

function changeObject() {
	$.ajax({
		type: "get",
		url: "http://139.199.18.137:7007/api/works/" + statenum,
		datatype: "json",
		success: function(onedata) {
			$("#uppic").attr("src", onedata.project.pic);
			$("#image").val("");
			$("#title").val(onedata.project.title);
			$("#url").val(onedata.project.url);
			$("#intro").val(onedata.project.intro);
			$("#content").val(onedata.project.content);
		}
	})
};

function turn4() {
	removeClass(managePage, "pageShow");
	addClass(updatePage, "pageShow");
}
//加载轮播图				
function ioopimg(imgdata) {
	$("#main").append("<img class=\"imgfrist\" id=\"img0\"/>");
	$("#img0").css("top", 0 + "%");
	$("#img0").attr("src", imgdata.projects[0].pic);
	for (var i = 1; i < lengthnum; i++) {
		var num = "img" + i;
		var text = "text" + i;
		var topnum = Number(6.4) + Number(23.4) * i + "%";
		$("#main").append("<img class=\"imgother\" id=\"" + num + "\"/>");
		$("#" + num + "").css('top', topnum);
		$("#" + num + "").attr("src", imgdata.projects[i].pic);
	};
};
//加载管理页信息				

function manimg(imgdata) {
	for (var l = 0; l < lengthnum; l++) {
		picnum = "pic" + l;
		$("#manageWrap").append("<li id="+l+"><img id=" + picnum + "><div class=\"titledata\">" + imgdata.projects[l].title + "</div></img><div id=" + imgdata.projects[l].id + " class=\"button2\">删除</div><div class=\"button1\"id=" + imgdata.projects[l].id + ">编辑</div></li>");
		$("#" + picnum + "").attr("src", imgdata.projects[l].pic)
	}
}
