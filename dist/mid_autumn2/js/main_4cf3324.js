function checkLen(e){var n=50;e.value.length>n&&(e.value=e.value.substring(0,n));var a=n-e.value.length;document.getElementById("text1").innerHTML=a.toString()}function bindEvent(){$(".page1, .page2, .page3, .page4, .page5").on("touchstart",function(e){return e.preventDefault(),!1}).on("touchmove",function(e){return e.preventDefault(),!1}).on("touchend",function(e){return e.preventDefault(),!1}),$(".page1 .btn").on("touchend",function(e){e.stopPropagation(),mySwiper.slideNext()}),$(".page2 .btn").on("touchend",function(e){e.stopPropagation(),mySwiper.slideNext(),$(".page3").show(),$(".page4, .page5").hide()}),$(".page3 .t2").on("touchend",function(){$(".page3 .text").hide(),$(".page3 textarea").show().focus()}),$(".page3 .btn1").on("touchend",function(e){e.stopPropagation();var n=$("#text1").val();$("#text2").text(n),$(".page3").hide(),$(".page4").show().addClass("fadeIn animated")}),$(".page3 .btn2, .page4 .btn2").on("touchend",function(e){e.stopPropagation(),mySwiper.slideTo(1)}),$(".page4 .btn1").on("touchend",function(e){e.stopPropagation(),$(".page4 .mask").show(),$(".page4 .mask .cloud").addClass("shake infinite animated").css({visibility:"visible","animation-duration":"35s","-webkit-animation-duration":"35s"}),$(".page4 .mask .moon2").addClass("fadeIn2"),$(".page4 .mask .moon1").addClass("fadeIn2").css({"animation-delay":"1s","-webkit-animation-delay":"1s"}),$(".page4 .mask .moon3").addClass("fadeIn2").css({"animation-delay":"2s","-webkit-animation-delay":"2s"})}),$(".page4 .mask").on("touchend",function(e){e.stopPropagation(),$(".page4 .mask").hide()}),$(".page5 .btn").on("touchend",function(e){e.stopPropagation(),mySwiper.slideTo(1)}),$(".audio").on("touchend",function(){$(this).toggleClass("pause"),$(this).hasClass("pause")?music_bg.pause():music_bg.play()})}function initSwipe(){$(".swiper-container").show(),$(".preload").hide(),mySwiper=new Swiper(".swiper-container",{direction:"vertical",onInit:function(e){swiperAnimateCache(e),swiperAnimate(e)},onSlideChangeEnd:function(e){if(1==e.snapIndex)$(".t2x").addClass("animate2"),setTimeout(function(){$(".text").addClass("animate2"),swiperAnimate(e)},1e3);else if(2==e.snapIndex);else if(3==e.snapIndex){var n=$("#text1").val();$("#text2").text(n)}},onTransitionEnd:function(e){swiperAnimate(e)}})}function initWeixin(){var e=new WeixinTools({debug:!1,signatureUrl:API_URL.signatureUrl,apis:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage"]}),n={title:'中秋传福，一步之"摇"',desc:"杭州黄龙饭店中秋送月饼传祝福",imgUrl:"http://www.hydeze.com/s/mid_autumn/images/p1_03.png",link:"http://www.hydeze.com/r/cwm/urlRedirect?id=6"};wx.ready(function(){e.shareAppMessage(n),e.shareTimeline(n),wx.checkJsApi({jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"],success:function(){}}),wx.onMenuShareAppMessage({title:n.title,desc:n.desc,link:n.link,imgUrl:n.imgUrl,success:function(){shareHandler(1)},cancel:function(){}}),wx.onMenuShareTimeline({title:n.title,link:n.link,imgUrl:n.imgUrl,success:function(){shareHandler(2)},cancel:function(){}})})}function shareHandler(e){AjaxFunc.getAction({url:API_URL.shareFromWeixin,data:{type:e,activityName:ActivityName},callback:function(){}})}function toPage5Handler(){$(".page4, .page3").hide(),$(".page5").show().addClass("fadeIn animated"),$(".page5 .btn").addClass("bounceInRight animated").css({visibility:"visible"})}var mobile,name,mySwiper,ActivityName="电信中秋",music_bg,API_URL={};$(".swiper-container")&&$(".swiper-container").hide();var loadData=[{name:"img1",path:"images/bg.jpg"},{name:"img2",path:"images/p1.jpg"},{name:"img3",path:"images/p1_3_03.png"},{name:"img4",path:"images/p1_3_06.png"},{name:"img5",path:"images/p1_3_11.png"},{name:"img6",path:"images/p2_03.png"},{name:"img7",path:"images/p2_t_03.png"},{name:"img8",path:"images/p2_t_07.png"},{name:"img9",path:"images/p4-cloud_02.png"},{name:"img10",path:"images/p4_03.png"},{name:"img11",path:"images/p4_3_03.png"},{name:"img12",path:"images/p4_3_07.png"},{name:"img13",path:"images/p4_3_09.png"},{name:"img14",path:"images/p4_4_03.png"},{name:"img15",path:"images/p4_07.png"},{name:"img16",path:"images/p4_11.png"},{name:"img17",path:"images/p5.jpg"},{name:"img18",path:"images/p5_03.png"}];PreLoad.load(loadData,function(){},function(){UtilFunc.initApiUrl(API_URL),bindEvent(),initSwipe(),$(".audio").show(),music_bg=$("#audio1")[0],$(".page4, .page5").hide()});