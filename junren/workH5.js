//JavaScript Document
	var openBtn = id("openBtn");
	var mask1 = id("mask1");
	var login = id("login");
	var loginWrap = id("loginWrap");
	var close = id("close");
	var loginBtn = id("loginBtn");
	var cancleBtn = id("cancleBtn");
	var mask2 = id("mask2");
	var remindWrap = id("remindWrap");
	var closeIf = id("closeIf");
	var noneBtn = id("noneBtn");
	var okBtn = id("okBtn");
	var giveupBtn = id("giveupBtn");
	var closede=id("closede");
	var noneBtn1 = id("noneBtn1");
	var mask3 = id("mask3");
	var backFirst = document.getElementsByClassName("icon-home");
//自定义id获取对象
function id(element) {
	return document.getElementById(element);
}
//自定义绑定事件
function bind(obj,ev,fn) {
	if(obj.addEventListener){ //判断是否有这个方法
		obj.addEventListener(ev,fn,false);
	} else{
		obj.attachEvent('on' + ev,function(){
			fn.call(obj);
		});
	}
}
function view(){
	return {
		w: document.documentElement.clienWidth,
		h: document.documentElement.clienHeight
	};
}
//添加样式
function addClass(obj,sClass) {
	var aClass = obj.className.split(' ');
	if(!obj.className) {
		obj.className = sClass;
		return;
	}
	for (var i = 0; i < aClass.length; i++){
		if(aClass[i] === sClass) return;
	}
	obj.className += ' ' + sClass;
}
//移除样式
function removeClass(obj,sClass){
	var aClass = obj.className.split(' ');
	if(!obj.className) return;
	for (var i = 0;i < aClass.length; i++){
		if(aClass[i] === sClass){
			aClass.splice(i,1);
			obj.className = aClass.join(' ');
				break;
		}
	}
}

/***首页*****/

var firstPage = id("firstPage");
var workPage = id("workPage");
var linkPage = id("linkPage");
var managePage = id("managePage");
var updatePage = id("updatePage");
var tag = 0;

function first(){

	bind(openBtn,"touchstart",turn1);
	bind(login,"touchstart",show);
	//bind(loginBtn,"touchstart",turnManage);
	// bind(backFirst,"touchstart",turnFirst);
	function iconChang(){
		// icon图标转换函数
	}
	function turn1(){
		// workPage.style.backgroundSize = "120%";
		removeClass(firstPage,"pageShow");
		addClass(workPage,"pageShow");
	}
	function show() {
		mask1.style.display = "block";
		loginWrap.style.height = "55%";
		loginWrap.style.width = "81.1%";
		loginWrap.style.opacity = "1";
		loginWrap.style.zIndex = "41";
		login.style.zIndex = "1";
		bind(close,"touchstart",dishow);
		function dishow(){
			      $("#wrongWord").text("");
				  $("#password").val("");		
			      mask1.style.display = "none";
			      loginWrap.style.height = "50%";
			      loginWrap.style.width = "70%";
			      loginWrap.style.opacity = "0";
			      loginWrap.style.zIndex = "1";
			       login.style.zIndex = "50";	
		           }
		//bind(loginBtn, "touchstart",dishow);
	}
	for(var i = 0;i<backFirst.length;i++){
		!function(i){
			backFirst[i].addEventListener("touchstart",function(){
				addClass(firstPage,"pageShow");
					removeClass(workPage,"pageShow");
					removeClass(linkPage,"pageShow");
					removeClass(managePage,"pageShow");
					removeClass(updatePage,"pageShow");
			});
		}(i);
	}
}
/***作品页****/
function second () {
	var linkBtn = id("linkBtn");
	bind(linkBtn,"touchstart",turn2);
	function turn2(){
		removeClass(workPage,"pageShow");
		addClass(linkPage,"pageShow");
	}
}
function three () {
	 var backFirstBtn = id("backFirstBtn");
	 bind(backFirstBtn,"touchstart",turn3);
	 function turn3(){
	 	removeClass(linkPage,"pageShow");
	 	addClass(firstPage,"pageShow");
	 	tag = 0;
	 }
}
/*****管理页***/
function four(){
	var uploadBtn = id("uploadBtn");
	bind(uploadBtn,"touchstart",turn4);
	function turn4(){
		removeClass(managePage,"pageShow");
		addClass(updatePage,"pageShow");
	}
}
/*****上传页*****/
function five(){
	bind(cancleBtn,"touchstart",showIf);
	function showIf(){
		mask2.style.display = "block";
		//$("#remindWarp1").css("display","-webkit-flex")
		remindWrap.style.opacity = "1";
		remindWrap.style.zIndex = "41";
		bind(closeIf,"touchstart",dishowIf);
		bind(noneBtn,"touchstart",dishowIf);
		//bind(okBtn,"touchstart",turn5);
		bind(giveupBtn,"touchstart",turn5);
		function dishowIf(){
		mask2.style.display = "none";
		remindWrap.style.opacity = "0";
		remindWrap.style.zIndex = "-1";
		}
		function turn5(){
			statenum = -1;
			resetform();
			dishowIf();//$("#remindWarp").css("display","none")
			removeClass(updatePage,"pageShow");
			addClass(managePage,"pageShow");
		}

	}
}
$("ul").on('click', '.button2', function() {
		mask3.style.display = "block";
		//$("#remindWarp1").css("display","-webkit-flex")
		remindWrap2.style.opacity = "1";
		remindWrap2.style.zIndex = "42";
		delid=$(this).closest("li").attr("id")
		$("#detitle").text("" +introduce.projects[delid].title + "");
		bind(closede,"touchstart",dishowIf);
		bind(noneBtn1,"touchstart",dishowIf);
		deleteid=$(this).attr("id");
		function dishowIf(){
		mask3.style.display = "none";
		remindWrap2.style.opacity = "0";
		remindWrap2.style.zIndex = "-1";
		}
		$("#delete1").click(function(){
		$.ajax({
		url: "http://139.199.18.137:7007/api/works/delete/?token=" + token,
		type: "post",
		datatype: "json",
		data: {
			id: "" + deleteid + "",

		},
		success: function(result) {
			dishowIf();
			reloadpage();
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			alert(XmlHttpRequest);
		}
	});
    })
	});
//上传图片的本地下载
$(function() {
  $("#uploadPicture").click(function () {
    $("#image").click();               //隐藏了input:file样式后，点击头像就可以本地上传
     $("#image").on("change",function(){
       var objUrl = getObjectURL(this.files[0]) ;  //获取图片的路径，该路径不是图片在本地的路径
       if (objUrl) {
         $("#uppic").attr("src", objUrl) ;  //将图片路径存入src中，显示出图片
		 $("#uppic1").attr("src", objUrl)
         $("#uppic1").load(function(){
			sometip=((1.0*$("#uppic1").width())/$("#uppic1").height()).toFixed(2)
		   if((sometip!=1.33)&&!(isNaN(sometip))){
			    $("#uppic1").attr("src", "");
			   alert("请上传长宽比为4:3的图片")
			   }
		     
		})
       } 
    });
  });
});
 
//建立一個可存取到該file的url
function getObjectURL(file) {
  var urlval = null ;
  if (window.createObjectURL!=undefined) { // basic
    urlval = window.createObjectURL(file) ;
  } else if (window.URL!=undefined) { // mozilla(firefox)
    urlval = window.URL.createObjectURL(file) ;
  } else if (window.webkitURL!=undefined) { // webkit or chrome
    urlval = window.webkitURL.createObjectURL(file) ;
  }
  return urlval ;
}

