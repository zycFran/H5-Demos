function bindEvent(){$(".page1 .btn2").on("touchend",function(t){t.stopPropagation(),$(".rule").show()}),$(".page1 .btn1").on("touchend",function(t){t.stopPropagation(),$(".waiting").show(),PreLoad.load(loadData2,function(){},function(){$(".waiting").hide(),$(".page1").hide(),$(".page2").show(),initGame()})}),$(".page1 .btn3").on("touchend",function(t){t.stopPropagation(),$(".tip").show()}),$(".rule .btn").on("touchend",function(t){t.stopPropagation(),$(".rule").hide()}),$(".tip .btn").on("touchend",function(t){t.stopPropagation(),$(".tip").hide()}),$(".page2 .btn").on("touchend",function(t){t.stopPropagation(),start&&(point++,$(".page2 .point").text(point),$(this).hasClass("light")?($(this).removeClass("light").addClass("dark"),$(".page2 .pic").removeClass("light").addClass("dark")):($(this).removeClass("dark").addClass("light"),$(".page2 .pic").removeClass("dark").addClass("light")))}),$(".result .btn").on("touchend",function(t){t.stopPropagation(),$(".page2").hide(),$(".page3").show(),AjaxFunc.getAction({url:API_URL.getResult,callback:function(t){if(t.success)for(var e=t.list.slice(0,5),a=0;5>a;a++)$(".list"+a+" .name").text(e[a].nickname),$(".list"+a+" .value").text((e[a].times||0)+"次")}}),AjaxFunc.getAction({url:API_URL.getMyResult,callback:function(t){t.success&&$("#my").text(t.value)}})}),$(".page3 .btn1").on("touchend",function(t){t.stopPropagation(),$(".page3").hide(),$(".page2").show(),initGame()}),$(".page3 .btn2").on("touchend",function(t){t.stopPropagation(),$(".share").show()}),$(".page3 .share").on("touchend",function(t){t.stopPropagation(),$(".share").hide()}),music_bg=$("#audio1")[0],$(".audio").on("touchend",function(){$(this).toggleClass("pause"),$(this).hasClass("pause")?music_bg.pause():music_bg.play()})}function initGame(){time=29,point=0,$(".page2 .time").text(time),$(".page2 .point").text(point),$(".result").hide(),$(".page2 .go").removeClass("three two one start").addClass("three").show(),$(".page2 .btn").removeClass("light dark").addClass("light"),$(".page2 .pic").removeClass("light dark").addClass("light"),timer&&clearInterval(timer),timer_out1&&clearTimeout(timer_out1),timer_out2&&clearTimeout(timer_out2),timer_out3&&clearTimeout(timer_out3),timer_out4&&clearTimeout(timer_out4),timer_out1=setTimeout(function(){showTime(2)},1e3),timer_out2=setTimeout(function(){showTime(1)},2e3),timer_out3=setTimeout(function(){showTime(0)},3e3),timer_out4=setTimeout(function(){$(".page2 .go").hide(),start=!0,timer=setInterval(function(){time--,0>=time?(clearInterval(timer),$(".page2 .time").text(0),gameOver()):$(".page2 .time").text(time)},1e3)},4e3)}function gameOver(){start=!1,AjaxFunc.saveAction({url:API_URL.result,data:{times:point},callback:function(t){t.success&&($(".result").show(),$(".result .pp").text(point))}})}function showTime(t){$(".page2 .go").removeClass("three two one start").addClass(2==t?"two":1==t?"one":"start")}function initWeixin(){var t=new WeixinTools({debug:!1,signatureUrl:API_URL.signatureUrl,apis:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage"]}),e={title:"点赞狂魔快来挑战",desc:"手快有慢无，万次点击等你来挑战",imgUrl:"http://www.hydeze.com/s/zt/images/200X200.jpg",link:"http://www.hydeze.com/r/auth/urlRedirect?id=20",successFn:shareHandler};wx.ready(function(){t.shareAppMessage(e),t.shareTimeline(e)})}function shareHandler(t){AjaxFunc.getAction({url:API_URL.shareFromWeixin,data:{type:t,activityName:ActivityName},callback:function(){}})}var ActivityName="正泰游戏",API_URL={shareFromWeixin:API_BASE+"cwm/shareFromWeixin?_dt="+Math.random(),signatureUrl:API_BASE+"wxconfig?_dt="+Math.random(),result:API_BASE+"cwm/chnt/result?_dt="+Math.random(),getResult:API_BASE+"cwm/chnt/getResult?_dt="+Math.random(),getMyResult:API_BASE+"cwm/chnt/getMyResult?_dt="+Math.random()},container=$(".swiper-container");container&&container.hide();var loadData=[{name:"img10",path:"./images/p1.jpg"},{name:"img11",path:"./images/p1_2_03.png"},{name:"img12",path:"./images/p1_2_07.png"},{name:"img13",path:"./images/p1_3_03.png"},{name:"img14",path:"./images/wait.gif"}],loadData2=[{name:"img31",path:"./images/1_03.png"},{name:"img32",path:"./images/2_03.png"},{name:"img33",path:"./images/3_03.png"},{name:"img34",path:"./images/go_03.png"},{name:"img35",path:"./images/dark_03.jpg"},{name:"img36",path:"./images/dark_07.jpg"},{name:"img37",path:"./images/light_03.jpg"},{name:"img38",path:"./images/light_07.jpg"},{name:"img39",path:"./images/over.jpg"},{name:"img40",path:"./images/bg.jpg"},{name:"img42",path:"./images/sh.png"},{name:"img41",path:"./images/btn_03.png"}],time=29,point=0,timer,start=!1,over=!1,music_bg;PreLoad.load(loadData,function(){},function(){UtilFunc.initApiUrl(API_URL),container.show(),$(".preload").hide(),$(".audio").show(),bindEvent(),initWeixin()});var timer_out1,timer_out2,timer_out3,timer_out4;