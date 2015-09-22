/**
 * Created by zhouyc on 2015/9/10.
 */


//(function () {

    var mobile;
    var name;
    var mySwiper;
    var ActivityName = '电信中秋';
    var music_bg;

    var API_URL = {

    };

    if($(".swiper-container")){
        $(".swiper-container").hide();
    }

    var loadData = [
        {name: 'img1', path: 'images/bg.jpg'},
        {name: 'img2', path: 'images/p1.jpg'},
        {name: 'img3', path: 'images/p1_3_03.png'},
        {name: 'img4', path: 'images/p1_3_06.png'},
        {name: 'img5', path: 'images/p1_3_11.png'},
        {name: 'img6', path: 'images/p2_03.png'},
        {name: 'img7', path: 'images/p2_t_03.png'},
        {name: 'img8', path: 'images/p2_t_07.png'},
        {name: 'img9', path: 'images/p4-cloud_02.png'},
        {name: 'img10', path: 'images/p4_03.png'},
        {name: 'img11', path: 'images/p4_3_03.png'},
        {name: 'img12', path: 'images/p4_3_07.png'},
        {name: 'img13', path: 'images/p4_3_09.png'},
        {name: 'img14', path: 'images/p4_4_03.png'},
        {name: 'img15', path: 'images/p4_07.png'},
        {name: 'img16', path: 'images/p4_11.png'},
        {name: 'img17', path: 'images/p5.jpg'},
        {name: 'img18', path: 'images/p5_03.png'}
    ];
    PreLoad.load(
        loadData,
        function (progress) {
            //$("#process").css("width", Math.min(progress, 100) + "%");
        },
        function (result) {
            UtilFunc.initApiUrl(API_URL);

            bindEvent();

            initSwipe();

            $(".audio").show();
            music_bg = $("#audio1")[0];
            $(".page4, .page5").hide();
        }
    );


    function checkLen(obj){
        var maxChars = 50;//最多字符数

        if (obj.value.length > maxChars)
            obj.value = obj.value.substring(0,maxChars);

        var curr = maxChars - obj.value.length;

        document.getElementById("text1").innerHTML = curr.toString();
    }

    function bindEvent() {
        $(".page1, .page2, .page3, .page4, .page5").on("touchstart", function(e){
            e.preventDefault();
            return false;
        }).on("touchmove", function(e){
            e.preventDefault();
            return false;
        }).on("touchend", function(e){
            e.preventDefault();
            return false;
        });
        $(".page1 .btn").on("touchend", function(e){
            e.stopPropagation();
            mySwiper.slideNext();
        });
        $(".page2 .btn").on("touchend", function(e){
            e.stopPropagation();
            mySwiper.slideNext();
            $(".page3").show();
            $(".page4, .page5").hide();
        });
        $(".page3 .t2").on("touchend", function(e){
            $(".page3 .text").hide();
            $(".page3 textarea").show().focus();
        });
        $(".page3 .btn1").on("touchend", function(e){
            e.stopPropagation();
            //mySwiper.slideNext();

            var txt = $("#text1").val();
            $("#text2").text(txt);
            $(".page3").hide();
            $(".page4").show().addClass("fadeIn animated");
        });
        $(".page3 .btn2, .page4 .btn2").on("touchend", function(e){
            e.stopPropagation();
            mySwiper.slideTo(1);
        });
        $(".page4 .btn1").on("touchend", function(e){
            e.stopPropagation();
            $(".page4 .mask").show();

            $(".page4 .mask .cloud").addClass("shake infinite animated").css({
                visibility: 'visible',
                "animation-duration": "35s",
                "-webkit-animation-duration": "35s"
            });
            $(".page4 .mask .moon2").addClass("fadeIn2");
            $(".page4 .mask .moon1").addClass("fadeIn2").css({
                "animation-delay": "1s",
                "-webkit-animation-delay": "1s"
            });
            $(".page4 .mask .moon3").addClass("fadeIn2").css({
                "animation-delay": "2s",
                "-webkit-animation-delay": "2s"
            });

        });
        $(".page4 .mask").on("touchend", function(e){
            e.stopPropagation();
            $(".page4 .mask").hide();
        });
        $(".page5 .btn").on("touchend", function(e){
            e.stopPropagation();
            mySwiper.slideTo(1);
        });

        $(".audio").on("touchend", function(){
            $(this).toggleClass("pause");
            if($(this).hasClass("pause")){
                music_bg.pause();
            }else{
                music_bg.play();
            }
        });
    }

    function initSwipe() {
        $(".swiper-container").show();
        $(".preload").hide();

        mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',

            onInit: function (swiper) {
                swiperAnimateCache(swiper);
                swiperAnimate(swiper);
            },
            onSlideChangeEnd: function (swiper) {
                if(swiper.snapIndex == 1){
                    $(".t2x").addClass("animate2");
                    setTimeout(function(){
                        $(".text").addClass("animate2");
                        swiperAnimate(swiper);
                    }, 1000);
                }else if(swiper.snapIndex == 2){

                }else if(swiper.snapIndex == 3){
                    var txt = $("#text1").val();
                    $("#text2").text(txt);
                }
            },
            onTransitionEnd: function (swiper) {
                swiperAnimate(swiper);
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

    function toPage5Handler(){
        $(".page4, .page3").hide();
        $(".page5").show().addClass("fadeIn animated");

        $(".page5 .btn").addClass("bounceInRight animated").css({
            visibility: 'visible'
        });
    }

//})();
