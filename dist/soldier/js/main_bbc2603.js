function bindEvent(){$(".page4 .btn").on("touchend",function(e){e.stopPropagation(),$(".page4 .rule").show()}),$(".page4 .close").on("touchend",function(e){e.stopPropagation(),$(".page4 .rule").hide()}),$(".page5 .upload, .page5 .btn2").on("touchend",function(e){e.preventDefault(),e.stopPropagation(),serverIds=[],uploaded=!1,wx.chooseImage({count:1,success:function(e){upload(e.localIds),$(".uploadImage").attr("src",e.localIds[0])}})}),$(".page5 .btn1").on("touchend",function(e){return e.stopPropagation(),uploaded?void mySwiper.slideNext():void X.dialog.tips("请先上传照片")}),$(".page5, .page6, .page6_2").on("touchmove",function(e){e.stopPropagation(),e.preventDefault()}),$(".page6 .btn1").on("touchend",function(e){return e.stopPropagation(),user.name=$("#name").val(),user.sex=$("#sex").val(),user.birthday=$("#birthday").val(),user.mobile=$("#mobile").val(),user.code=$("#code").val(),user.name?user.sex?user.birthday?user.mobile?X.valid.isMobile(user.mobile)?user.code?void AjaxFunc.saveAction({url:API_URL.submit,data:{id:null,phoneNumber:user.mobile,name:user.name,sex:user.sex,birthday:Number(new Date(user.birthday)),code:user.code},callback:function(e){return e.success?void mySwiper.slideNext():void X.dialog.tips("您已提交过，请勿重复提交！")}}):void X.dialog.tips("请输入验证码"):void X.dialog.tips("请输入正确的手机号"):void X.dialog.tips("请输入手机"):void X.dialog.tips("请输入生日"):void X.dialog.tips("请输入性别"):void X.dialog.tips("请输入姓名")}),$(".page6 .btn2").on("touchend",function(e){if(e.stopPropagation(),!sending){if(user.mobile=$("#mobile").val(),!user.mobile)return void X.dialog.tips("请输入手机");if(!X.valid.isMobile(user.mobile))return void X.dialog.tips("请输入正确的手机号");AjaxFunc.getAction({url:API_URL.phoneNum,data:{phoneNumber:user.mobile},callback:function(e){e.success&&X.dialog.tips("验证码已发送，请查收")}}),sending=!0;var i=59,a=$(this);a.text(i--+"s");var n=setInterval(function(){return 0>=i?(clearInterval(n),a.text("发送验证码"),void(sending=!1)):void a.text(i--+"s")},1e3)}}),$(".page7 .btn").on("touchend",function(e){e.stopPropagation(),mySwiper.slideTo(1)})}function initSwipe(){$(".swiper-container").show(),$(".preload").hide(),mySwiper=new Swiper(".swiper-container",{direction:"vertical",mousewheelControl:!0,onInit:function(e){swiperAnimateCache(e),swiperAnimate(e)},onSlideChangeEnd:function(e){swiperAnimate(e)},onTransitionEnd:function(e){swiperAnimate(e),hasUpload?(e.snapIndex>=6?$("#arrow").hide():$("#arrow").show(),5==e.snapIndex&&setTimeout(function(){$(".shine_border").addClass("shine_guang")},8e3)):(e.snapIndex>=5?$("#arrow").hide():$("#arrow").show(),4==e.snapIndex&&setTimeout(function(){$(".shine_border").addClass("shine_guang")},8e3))}})}function initWeixin(){var e=new WeixinTools({debug:!1,signatureUrl:API_URL.signatureUrl,apis:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","chooseImage","previewImage","uploadImage","downloadImage"]}),i={title:"和印象城一起向抗战老兵敬礼，赢取IPhone6s",desc:"这是一场值得每一位国人参与的活动，70年前他们浴血奋战，硝烟散尽，抗战老兵已是耋耋老兵。但铮铮铁骨却应被每一个国人深刻铭记。老兵！让我们向你致敬！",imgUrl:"http://www.hydeze.com/s/soldier/images/share.jpg",link:"http://www.hydeze.com/s/soldier/index.html"};uploaded&&fileId&&(i.link="http://www.hydeze.com/s/soldier/index.html?id=6&fileId="+fileId),wx.ready(function(){e.shareAppMessage(i),e.shareTimeline(i),wx.checkJsApi({jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"],success:function(){}}),wx.onMenuShareAppMessage({title:i.title,desc:i.desc,link:i.link,imgUrl:i.imgUrl,success:function(){shareHandler(1)},cancel:function(){}}),wx.onMenuShareTimeline({title:i.title,link:i.link,imgUrl:i.imgUrl,success:function(){shareHandler(2)},cancel:function(){}})})}function shareHandler(e){AjaxFunc.getAction({url:API_URL.shareFromWeixin,data:{type:e,activityName:ActivityName},callback:function(){}})}function upload(e){var i=0;e&&e[i]&&wx.uploadImage({localId:e[i],isShowProgressTips:1,success:function(e){serverIds.push(e.serverId),uploaded=!0,AjaxFunc.getAction({url:API_URL.getFileId,data:{mediaId:e.serverId},callback:function(e){fileId=e.value,initWeixin()}})},fail:function(){}})}var mobile,name,mySwiper,ActivityName="印象城致敬老兵",music_bg,container=$(".swiper-container"),hasUpload=0,API_URL={shareFromWeixin:API_BASE+"cwm/shareFromWeixin?_dt="+Math.random(),signatureUrl:API_BASE+"wxconfig?_dt="+Math.random(),getCode:API_BASE+"cwm/laobing/getCode?_dt="+Math.random(),submit:API_BASE+"cwm/laobing/submit?_dt="+Math.random(),getFileId:API_BASE+"getFileId?_dt="+Math.random(),getFile:API_BASE+"download/files?_dt="+Math.random()};container&&container.hide();var loadData=[{name:"img1",path:"images/p1.jpg"},{name:"img2",path:"images/p2.jpg"},{name:"img3",path:"images/border_03.png"},{name:"img4",path:"images/p4.jpg"},{name:"img5",path:"images/p5.jpg"},{name:"img6",path:"images/p6.jpg"},{name:"img7",path:"images/p6_2.jpg"},{name:"img9",path:"images/p1_03.png"},{name:"img10",path:"images/p1_07.png"},{name:"img11",path:"images/p2_03.png"},{name:"img12",path:"images/p2_07.png"},{name:"img13",path:"images/p2_11.png"},{name:"img14",path:"images/p3_2_03.png"},{name:"img15",path:"images/p3_2_07.png"},{name:"img16",path:"images/p3_2_11.png"},{name:"img17",path:"images/p3_03.png"},{name:"img18",path:"images/p3_07.png"},{name:"img19",path:"images/p3_10.png"},{name:"img20",path:"images/p4_03.png"},{name:"img21",path:"images/p4_3_03.png"},{name:"img22",path:"images/p4_05.png"},{name:"img23",path:"images/p4_07.png"},{name:"img24",path:"images/p4_09.png"},{name:"img25",path:"images/p4_11.png"},{name:"img26",path:"images/p4_13.png"},{name:"img27",path:"images/p4_15.png"},{name:"img28",path:"images/p4_17.png"},{name:"img29",path:"images/p4_btn_27.png"},{name:"img30",path:"images/p5_03.png"},{name:"img31",path:"images/p5_07.png"},{name:"img32",path:"images/p5_10.png"},{name:"img33",path:"images/p7_btn_03.png"},{name:"img34",path:"images/p7x_03.png"}];PreLoad.load(loadData,function(){},function(){if(UtilFunc.initApiUrl(API_URL),bindEvent(),fileId=UtilFunc.getQueryStringByName("fileId")||null){$(".page7").show();var e=API_URL.getFile+"&fileId="+fileId;$("#SoldierImage").attr("src",e)}else $(".page7").remove();initSwipe(),initWeixin()});var user={},sending=!1,serverIds=[],uploaded=!1,fileId;