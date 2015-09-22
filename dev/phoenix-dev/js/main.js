/**
 * Created by zhouyc on 2015/9/10.
 */


(function () {

    var mobile;
    var mySwiper;
    var ActivityName = '老凤祥';
    var music_bg;

    var API_URL = {
        addPhoneNum: API_BASE + 'cwm/laofengxiang/addPhoneNum?_dt=' + Math.random(),

        shareFromWeixin: API_BASE + 'cwm/shareFromWeixin?_dt=' + Math.random(),
        signatureUrl: API_BASE + 'wxconfig?_dt=' + Math.random()
    };

    if($(".swiper-container")){
        $(".swiper-container").hide();
    }

    var loadData = [
        {name: "img1", path: "./images/P1.jpg"},
        {name: "img2", path: "./images/p1_03.png"},
        {name: "img3", path: "./images/p1_04.png"},
        {name: "img4", path: "./images/p1_07.png"},
        {name: "img4x", path: "./images/P2.jpg"},
        {name: "img5", path: "./images/p2_03.png"},
        {name: "img6", path: "./images/p3.jpg"},
        {name: "img7", path: "./images/P3_11.png"},
        {name: "img8", path: "./images/p4.jpg"},
        {name: "img10", path: "./images/p4_08.png"},
        {name: "img11", path: "./images/p5.jpg"},
        {name: "img12", path: "./images/p6.jpg"},
        {name: "img13", path: "./images/p7_03.png"}
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
        $(".page5 .btn").on("touchend", function (e) {
            e.stopPropagation();
            mobile = $("#phone").val();
            if (!X.valid.isMobile(mobile)) {
                X.dialog.tips("请输入正确的手机号");
                return;
            }
            AjaxFunc.getAction({
                url: API_URL['addPhoneNum'],
                data: {
                    phoneNum: mobile
                },
                callback: function(result){
                    if(!result.success){
                        X.dialog.tips("您已提交过，请勿重复提交！");
                        return;
                    }
                    mySwiper.slideNext();
                }
            });

        });

        $(".page6 .btn").on("touchend", function (e) {
            e.stopPropagation();
            $(".page6 .mask").show();
        });
        $(".page6 .mask").on("touchend", function (e) {
            e.stopPropagation();
            $(".page6 .mask").hide();
        });

        $(".page5, .page6").on("touchmove", function(e){
            e.stopPropagation();
            e.preventDefault();
        })
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
                swiperAnimate(swiper);
            },
            onTransitionEnd: function (swiper) {
                swiperAnimate(swiper);
                if (swiper.snapIndex >= 4) {
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
            title: "瞬间回到18岁！请谨慎点击！",
            desc: "加入我们，一起爱上下一秒的改变！",
            imgUrl: "http://www.hydeze.com/s/phoenix/images/s.jpg",
            link: 'http://www.hydeze.com/r/cwm/urlRedirect?id=5'
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
})();

