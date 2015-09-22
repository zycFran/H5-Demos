/**
 * Created by zhouyc on 2015/9/10.
 */


//(function () {

    var mobile;
    var name;
    var mySwiper;
    var ActivityName = '黄龙中秋';
    var music_bg;

    var API_URL = {
        lottery: API_BASE + 'cwm/huanglong/lottery?_dt=' + Math.random(),
        signup: API_BASE + 'cwm/huanglong/signup?_dt=' + Math.random(),

        shareFromWeixin: API_BASE + 'cwm/shareFromWeixin?_dt=' + Math.random(),
        signatureUrl: API_BASE + 'wxconfig?_dt=' + Math.random()
    };

    if($(".swiper-container")){
        $(".swiper-container").hide();
    }

    var loadData = [
        {name: "img1", path: "./images/bg.jpg"},
        {name: "img2", path: "./images/cloud_03.png"},
        {name: "img3", path: "./images/cloud_04.png"},
        {name: "img4", path: "./images/guang_03.png"},
        {name: "img5", path: "./images/p1_1_09.png"},
        {name: "img6", path: "./images/p1_03.png"},
        {name: "img7", path: "./images/p1_07.png"},
        {name: "img8", path: "./images/p1_11.png"},
        {name: "img9", path: "./images/p2_03.png"},
        {name: "img10", path: "./images/p2_06.png"},
        {name: "img11", path: "./images/p2_09.png"},
        {name: "img12", path: "./images/p2_12.png"},
        {name: "img13", path: "./images/p2_17.png"},
        {name: "img14", path: "./images/p2_18.png"},
        {name: "img15", path: "./images/p2_21.png"},
        {name: "img16", path: "./images/p2_24.png"},
        {name: "img17", path: "./images/p2_29.png"},
        {name: "img18", path: "./images/p2_32.png"},
        {name: "img19", path: "./images/p3.jpg"},
        {name: "img110", path: "./images/p3_1_03.png"},
        {name: "img111", path: "./images/p3_1_07.png"},
        {name: "img112", path: "./images/p3_2_03.png"},
        {name: "img113", path: "./images/p3_3_03.png"},
        {name: "img114", path: "./images/p3_4_03.png"},
        {name: "img115", path: "./images/p3_5_03.png"},
        {name: "img116", path: "./images/p4_01.png"},
        {name: "img117", path: "./images/p4_2_03.png"},
        {name: "img118", path: "./images/p4_2_07.png"},
        {name: "img119", path: "./images/p4_2_11.png"},
        {name: "img120", path: "./images/p4_4_03.png"},
        {name: "img121", path: "./images/p5.jpg"},
        {name: "img122", path: "./images/p5_1_03.png"},
        {name: "img123", path: "./images/p7_03.png"}

        //{type: "sound", path: "./audio/bg.mp3"}
    ];
    LLoadManage.load(
        loadData,
        function (progress) {
            //$("#process").css("width", Math.min(progress, 100) + "%");
        },
        function (result) {
            UtilFunc.initApiUrl(API_URL);

            bindEvent();

            initSwipe();

            music_bg = $("#audio1")[0];

            music_bg.play();

            initWeixin();
        }
    );


    function bindEvent() {
        $(".page3 .btn").on("touchend", function(e){
            e.stopPropagation();
            $(".page3 .mask").show();
        });
        $(".page3 .mask").on("touchend", function(e){
            e.stopPropagation();
            $(".page3 .mask").hide();
        });

        $(".page2, .page3, .page4, .page5").on("touchmove", function(e){
            e.stopPropagation();
            e.preventDefault();
        });
        $(".page4 .btn").on("touchend", function(e){
            e.stopPropagation();
            mobile = $("#phone").val();
            name = $("#name").val();
            if (!name) {
                X.dialog.tips("请输入姓名");
                return;
            }
            if (!X.valid.isMobile(mobile)) {
                X.dialog.tips("请输入正确的手机号");
                return;
            }

            AjaxFunc.saveAction({
                url: API_URL['signup'],
                data: {
                    activityName: ActivityName,
                    phoneNumber: mobile,
                    name: name
                },
                callback: function(result){
                    if(!result.success){
                        X.dialog.tips("您已提交过，请勿重复提交！");
                        return;
                    }
                    $(".page4 .dlg").show();
                }
            });
        });
        $(".page4 .close").on("touchend", function(e){
            e.stopPropagation();
            page5Handler();
        });

        //摇动事件
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', deviceMotionHandler, false);
        }
    }

    var x = 0, y = 0,z = 0;
    var last_x = 0, last_y = 0,last_z = 0;
    var isShake = false;
    var SHAKE_THRESHOLD = 1000,  LAST_UPDATE_TIME = 0;

    var cakeIndex = 0;

    function deviceMotionHandler(eventData) {
        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();

        if ((curTime - LAST_UPDATE_TIME) > 200) {
            var diffTime = curTime - LAST_UPDATE_TIME;
            LAST_UPDATE_TIME = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
            if (speed > SHAKE_THRESHOLD && isShake == false) {
                isShake = true;
                AjaxFunc.saveAction({
                    url: API_URL['lottery'],
                    callback: function(result){
                        if(!result.success){
                            //X.dialog.tips("抽奖失败");
                            return;
                        }
                        dropDownHandler(result.value);
                    }
                });
            }
            last_x = x;
            last_y = y;
            last_z = z;
        }
    }

    function dropDownHandler(bool){
        cakeIndex = randomCake(0,4);
        var dom = $(".cake" + cakeIndex);

        isShake = true;
        dom.animate({
            top: 613/200 + "rem",
            left: 265/200 + "rem"
        }, 500, 'linear', function(){
            $(".guang").show();
            var bg = dom.css("background");
            $(".thing").show().css({
                "background": bg
            });
            dom.hide();

            if(bool){
                page4Handler();
            }else{
                page3Handler();
            }
        });
    }

    function page4Handler(){
        setTimeout(function(){
            $(".page2, .page3").hide();
            $(".page4").animate({
                opacity: 1
            }, 1000);

            $(".page4 .t2")
                .css({
                    "visibility": 'visible'
                })
                .addClass("zoomIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass("zoomIn animated");
                });

        }, 500);
    }
    function page3Handler(){
        setTimeout(function(){
            $(".page2").hide();
            $(".page3").animate({
                opacity: 1
            }, 1000);

            $(".page3 .tip").removeClass("tip0 tip1 tip2 tip3 tip4")
                .addClass("tip" + cakeIndex)
                .css({
                    "visibility": 'visible'
                })
                .addClass("zoomIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass("zoomIn animated");
                });
            $(".page3 .btn")
                .addClass("bounce2")
                .css({
                    "visibility": 'visible'
                });
            $(".page3 .cloud1")
                .addClass("shake3")
                .css({
                    "visibility": 'visible'
                });
            $(".page3 .cloud2")
                .addClass("shake3")
                .css({
                    "visibility": 'visible'
                });

        }, 500);
    }

    function page5Handler(){
        setTimeout(function(){
            $(".page2, .page3, .page4").hide();
            $(".page5").animate({
                opacity: 1
            }, 1000);

            $(".page5 .t1")
                .css({
                    "visibility": 'visible'
                })
                .addClass("zoomIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass("zoomIn animated");
                });

        }, 500);
    }

    function initSwipe() {
        $(".swiper-container").show();
        $(".preload").hide();

        mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',

            onInit: function (swiper) {
                swiperAnimateCache(swiper);
                swiperAnimate(swiper);
                if(swiper.snapIndex == 0){
                    setTimeout(function(){
                        $(".page1 .t2").removeClass("bounceInDown animated").addClass("wobble animated toAnimate");
                    }, 2000);
                }
            },
            onSlideChangeEnd: function (swiper) {
                swiperAnimate(swiper);
                if(swiper.snapIndex == 0){
                    setTimeout(function(){
                        $(".page1 .t2").removeClass("bounceInDown animated").addClass("wobble animated toAnimate");
                    }, 2000);
                }else if(swiper.snapIndex == 1){
                    //$(".page2 .text").animate({opacity: 1}, 1000);
                    setTimeout(function(){
                        $(".page2 .cake").removeClass("slideInLeft slideInRight").addClass("shake animated toAnimate");
                    }, 1000);
                    setTimeout(function(){
                        $(".page2 .text").removeClass("slideInUp animated shake2").addClass("shake2");
                    }, 2000);
                }
            },
            onTransitionEnd: function (swiper) {
                swiperAnimate(swiper);
                if (swiper.snapIndex >= 1) {
                    $("#arrow").hide();
                } else {
                    $("#arrow").show();
                }
            }
        })
    }

    function initWeixin() {
        var wxtools = new WeixinTools({
            'debug': false,
            'signatureUrl': API_URL['signatureUrl'],
            'apis': [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ]
        });
        var shareInfo = {
            title: '中秋传福，一步之"摇"',
            desc: "杭州黄龙饭店中秋送月饼传祝福",
            imgUrl: "http://www.hydeze.com/s/mid_autumn/images/p1_03.png",
            link: 'http://www.hydeze.com/r/cwm/urlRedirect?id=6'
        };
        wx.ready(function () {
            wxtools.shareAppMessage(shareInfo);
            wxtools.shareTimeline(shareInfo);

            wx.checkJsApi({
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function (res) {
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}

                }
            });

            wx.onMenuShareAppMessage({
                title: shareInfo.title,   // 分享标题
                desc: shareInfo.desc,     // 分享描述
                link: shareInfo.link,     // 分享链接
                imgUrl: shareInfo.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    shareHandler(1); //好友
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareTimeline({
                title: shareInfo.title,     // 分享标题
                link: shareInfo.link,       // 分享链接
                imgUrl: shareInfo.imgUrl,   // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    shareHandler(2); // 朋友圈
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
    }

    function shareHandler(type) {
        AjaxFunc.getAction({
            url: API_URL['shareFromWeixin'],
            data: {
                type: type,
                activityName: ActivityName
            },
            callback: function () {
                //alert(type);
            }
        });
    }


    function randomCake(m, n){
        return Math.ceil(Math.random()*(n-m)+m);
    }

//})();
