function pageRender(){music_bg=$("#audio1")[0],UtilFunc.initApiUrl(API_URL),pageHeight=$(window).height(),$(".wrap").height(pageHeight),$(".preload").hide(),toP5Handler(),bindEvent(),initWeixin()}function bindEvent(){$(".page1 .btn1").on("touchend",function(e){e.stopPropagation(),p1_clicked=!0,p1_timer&&clearTimeout(p1_timer),toP5Handler()}),$(".page1 .btn2").on("touchend",function(e){e.stopPropagation(),p1_clicked=!0,toP2Handler()}),$(".page2 .btnx").on("touchend",function(e){e.stopPropagation(),p2_clicked=!0,p2_timer_2&&clearTimeout(p2_timer_2),toP3Handler()}),$(".page2 .jujue").on("touchend",function(e){e.stopPropagation(),toP5Handler()}),$("#two").on("touchend",function(e){e.stopPropagation(),p3_clicked=!0,p2_timer_3&&clearTimeout(p2_timer_3),toP4Handler()}),$("#one").on("touchend",function(e){e.stopPropagation(),p3_clicked=!0,p2_timer_2&&clearTimeout(p2_timer_2),toP5Handler()}),$(".page4 .item").on("touchend",function(e){e.stopPropagation();var n=$(this).index();p4_selected[n]=!p4_selected[n],p4_selected[n]?$(this).find(".check").show():$(this).find(".check").hide()}),$(".page4 .btn1").on("touchend",function(e){e.stopPropagation(),savePage4Handler(1)}),$(".page4 .btn2").on("touchend",function(e){e.stopPropagation(),savePage4Handler(0)}),$(".page5 .btn1").on("touchend",function(e){e.stopPropagation(),$(".page5").hide(),$(".page6").show()}),$(".page6 .btn1").on("touchend",function(e){return e.stopPropagation(),mobile=$("#phone").val(),X.valid.isMobile(mobile)?void AjaxFunc.getAction({url:API_URL.isPhoneNumExist,data:{phoneNum:mobile},alertFalse:"no",callback:function(e){return e.value?void X.dialog.tips("该手机号已参加过，不能再参加"):($(".page6").hide(),$(".page7").show(),void AjaxFunc.getAction({url:API_URL.price,callback:function(e){$("#num1").text("￥"+e.value.firstPrice),$("#num2").text("￥"+e.value.secondPrice)}}))}}):void X.dialog.tips("请输入正确的手机号")}),$(".page7").on("touchstart",function(e){e=e.changedTouches[0],onStart(e)}).on("touchmove",function(e){onMove(e.changedTouches[0],e)}).on("touchend",function(e){onEnd(e.changedTouches[0])}),$(".page7 .btn1").on("touchend",function(e){e.stopPropagation(),runAxe()}),$(".page7 .btn2,.page7 .btn3").on("touchend",function(e){e.stopPropagation(),$(".page7").hide(),$(".page10").show()}),$(".page10 .btn").on("touchend",function(e){e.stopPropagation(),AjaxFunc.getAction({url:API_URL.lottery,data:{phoneNum:mobile},callback:function(e){var n=Number(e.value.level);$(".box-open").show(),n>=1?($(".success").show(),$(".prize>div").eq(n-1).show(),$(".page .txt2").show()):$(".page .txt1").show()}})}),$(".page10").on("touchstart",function(e){e=e.changedTouches[0],onStart(e,10)}).on("touchmove",function(e){onMove(e.changedTouches[0],e,10)}).on("touchend",function(e){onEnd(e.changedTouches[0],10)}),$(".page11 .btn").on("touchend",function(){$(".mask_bg").show(),$(".share_icon").removeClass("flash animated").addClass("flash animated").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){$(this).removeClass("flash animated")})}),$(".page11 .mask_bg").on("touchend",function(){$(".mask_bg").hide()})}function toP2Handler(){clearTimeout(p1_timer),$(".page1").hide(),$(".page2").show(),music_tel.pause(),music_re.play(),p2_timer=setInterval(function(){p2_time++,$(".page2 .time").text(resetTime(p2_time))},1e3),p2_timer_2=setTimeout(function(){p2_clicked||toP3Handler()},2e4),p2_timer_3=setTimeout(function(){p3_clicked||toP5Handler()},36e3)}function toP3Handler(){$(".page2 .number").show(),$(".page2 .middle").hide()}function toP4Handler(){music_tel.pause(),music_re.pause(),music_bg.play(),p2_timer&&clearTimeout(p2_timer),p2_timer_2&&clearTimeout(p2_timer_2),p2_timer_3&&clearTimeout(p2_timer_3),$(".sec").show(),$(".page4").show()}function savePage4Handler(e){toP5Handler()}function toP5Handler(){music_bg.play(),p2_timer&&clearTimeout(p2_timer),p2_timer_2&&clearTimeout(p2_timer_2),p2_timer_3&&clearTimeout(p2_timer_3),$(".page2").hide(),$(".page4").hide(),$(".sec").show(),$(".page5").show()}function toPage11Handler(){$(".page10").hide(),$(".page11").show()}function onStart(e){return 1==movePrevent?(e.preventDefault(),!1):(scrollPrevent=!1,touchDown=!0,startX=e.pageX,startY=e.pageY,void $(".page7 .sitiao").hide())}function onMove(e,n){return 1==movePrevent||1!=touchDown?(n.preventDefault(),!1):(n.preventDefault(),void(0==scrollPrevent&&e.pageY!=startY))}function onEnd(e,n){if(1==movePrevent)return e.preventDefault(),!1;if(touchDown=!1,0==scrollPrevent){if(endX=e.pageX,endY=e.pageY,Math.abs(endY-startY)<=50)return!1;endY>startY?10==n||runAxe():startY>endY&&10==n&&toPage11Handler()}}function runAxe(){$(".page7 .axe").addClass("kan"),setTimeout(function(){$(".page7 .axe").removeClass("kan"),$(".page7 .sitiao").show(),runAxeResult()},700)}function runAxeResult(){AjaxFunc.saveAction({url:API_URL.bargain,data:{phoneNum:mobile},alertFalse:"no",callback:function(e){return e.success?void(e.value.result?($(".dialog").show(),$(".page7 .p8").show(),$(".page7 #t1").text("【"+e.value.peopleNum+"】"),$(".page7 #t2").text("【"+e.value.bargainPrice+"】"),$(".page7 #t3").text("￥"+e.value.firstPrice),$(".page7 #t4").text("￥"+e.value.secondPrice)):($(".dialog").show(),$(".page7 .p9").show(),$(".page7 #t5").text("【"+e.value.peopleNum+"】"))):void X.dialog.tips("您已参加过活动！谢谢参与！")}})}function resetTime(e){if(10>e)return"00:0"+e;if(60>e)return"00:"+Math.floor(e/10)+Math.floor(e%10);if(600>e){var n=Math.floor(e%60);return"0"+Math.floor(e/60)+":"+Math.floor(n/10)+Math.floor(n%10)}}function initWeixin(){var e=new WeixinTools({debug:!1,signatureUrl:API_URL.signatureUrl,apis:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage"]}),n={title:"9.18全民“kan”价节",desc:"宽带资费，你必须知道的秘密",imgUrl:"http://www.hydeze.com/s/huashu/images/p4/p4_03_0a3c584.png",link:"http://www.hydeze.com/r/cwm/urlRedirect?id=4"};wx.ready(function(){e.shareAppMessage(n),e.shareTimeline(n),wx.checkJsApi({jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"],success:function(){}}),wx.onMenuShareAppMessage({title:n.title,desc:n.desc,link:n.link,imgUrl:n.imgUrl,success:function(){shareHandler(1)},cancel:function(){}}),wx.onMenuShareTimeline({title:n.title,link:n.link,imgUrl:n.imgUrl,success:function(){shareHandler(2)},cancel:function(){}})})}function shareHandler(e){AjaxFunc.getAction({url:API_URL.shareFromWeixin,data:{type:e,activityName:ActivityName},callback:function(){}})}!function(){var e=[{name:"bg",path:"./images/bg2_01.jpg"},{name:"img51",path:"./images/p1/p1_03.png"},{name:"img52",path:"./images/p1/p1_06.png"},{name:"img53",path:"./images/p1/p3_03.png"},{name:"img4_11",path:"./images/p4/check_03.png"},{name:"img4_21",path:"./images/p4/p4_02.png"},{name:"img4_2",path:"./images/p4/p4_03.png"},{name:"img4_3",path:"./images/p4/p4_04.png"},{name:"img4_4",path:"./images/p4/p4b_03.png"},{name:"img5_1",path:"./images/p5/p5_03.png"},{name:"img5_2",path:"./images/p5/p5_07.png"},{name:"img5_3",path:"./images/p5/p5_11.png"},{name:"img5_4",path:"./images/p5/p5_15.png"},{name:"img5_5",path:"./images/p5/p5b_02.png"},{name:"img6_1",path:"./images/p6/p6_02.png"},{name:"img6_2",path:"./images/p6/p6b_03.png"},{name:"img7_1",path:"./images/p7/p7.png"},{name:"img7_2",path:"./images/p7/p8_03.png"},{name:"img7_3",path:"./images/p7/p8_06.png"},{name:"img7_4",path:"./images/p7/p8_11.png"},{name:"img7_5",path:"./images/p7/p8b_03.png"},{name:"img7_6",path:"./images/p7/p9_03.png"},{name:"img10_1",path:"./images/p10/p10_v_02.png"},{name:"img10_2",path:"./images/p10/p10_x_03.png"},{name:"img10_3",path:"./images/p10/p10_y_03.png"},{name:"img10_4",path:"./images/p10/p11_t1_03.png"},{name:"img10_5",path:"./images/p10/p11_t2_03.png"},{name:"img10_6",path:"./images/p10/p11_t3_03.png"},{name:"img11_1",path:"./images/p11/p11_01.png"},{name:"img11_2",path:"./images/p11/p11b_03.png"},{name:"img11_3",path:"./images/share_03.png"},{name:"img11_4",path:"./images/share.png"},{name:"img11_5",path:"./images/share_icon_03.png"}];LLoadManage.load(e,function(e){$("#process").css("width",Math.min(e,100)+"%")},function(){pageRender()})}();var pageHeight,music_bg,music_tel,music_re,p1_timer,p2_timer,p2_timer_2,p2_timer_3,p1_clicked=!1,p2_clicked=!1,p3_clicked=!1,p2_time=0,p4_selected=[0,0,0,0],mobile,ActivityName="华数砍价",API_URL={price:API_BASE+"cwm/huashu/price?_dt="+Math.random(),bargain:API_BASE+"cwm/huashu/bargain?_dt="+Math.random(),lottery:API_BASE+"cwm/huashu/lottery?_dt="+Math.random(),shareFromWeixin:API_BASE+"cwm/shareFromWeixin?_dt="+Math.random(),signatureUrl:API_BASE+"wxconfig?_dt="+Math.random(),isPhoneNumExist:API_BASE+"cwm/huashu/isPhoneNumExist?_dt="+Math.random()},margin,movePrevent,touchDown,startX,endX,endY,startY;