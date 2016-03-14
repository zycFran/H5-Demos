//(function () {

var mobile;
var mySwiper;
var ActivityName = '杭州大厦春季美妆节';
var music_bg;

var API_URL = {
    addPhoneNum: API_BASE + 'cwm/laofengxiang/addPhoneNum?_dt=' + Math.random(),
    shareFromWeixin: API_BASE + 'hzds/shared?_dt=' + Math.random(),
    signatureUrl: API_BASE + 'wxconfig?_dt=' + Math.random(),

    addPrize: API_BASE + 'hzds/addPrize?_dt=' + Math.random(),
    chance: API_BASE + 'hzds/isHaveChance?_dt=' + Math.random(),

    getToken: API_BASE + 'hzds/getToken?_dt=' + Math.random(),
    getPrize: API_BASE + 'hzds/getPrize?_dt=' + Math.random()
};

var drawTimer = null;
var pointW = 0;
var mackCanvas = document.getElementById('loadingProgress'),
    mackCanvasCTX = mackCanvas.getContext('2d');

var clipCanvas;
var photoInited = false;

var token = null;
var hasChance = true;
var uploadPhoto = false;
var point;
var hasPrize = false;
var hasPrizeList = [];

var Price_Map = {
    1: {v: 100, m: 1000},
    2: {v: 20, m: 100},
    3: {v: 10, m: 100}
};

if ($(".swiper-container")) {
    $(".swiper-container").hide();
}

var loadData = [
    {name: "img1", path: "./images/bottle_03.png"},

    {name: "img2", path: "./images/btn_03.png"},
    {name: "img3", path: "./images/flower_03.png"},
    {name: "img4", path: "./images/icon-02.png"},
    {name: "img6", path: "./images/icon-04.png"},

    {name: "img7", path: "./images/icon-05.png"},
    {name: "img8", path: "./images/level_lr_02.png"},
    {name: "img9", path: "./images/level_lt_01.png"},
    {name: "img10", path: "./images/level_rb_03.png"},
    {name: "img15", path: "./images/level_rt_02.png"},

    {name: "img11", path: "./images/p2-02.png"},
    {name: "img12", path: "./images/p2-03.png"},
    {name: "img13", path: "./images/ttt1.png"},
    {name: "img14", path: "./images/tttt2.png"},
    {name: "img155", path: "./images/ds.jpg"},

    {name: "img15", path: "./images/share-02.png"},
    {name: "img16", path: "./images/p2t_01.png"},
    {name: "img17", path: "./images/pel-02.png"},
    {name: "img18", path: "./images/ccc_03.png"},
    {name: "img19", path: "./images/card-02.png"}

    //{type: "sound", path: "./audio/mp3.mp3"}
];
PreLoad.load(
    loadData,
    function (progress) {
        //$("#process").css("width", Math.min(progress, 100) + "%");
    },
    function (result) {
        UtilFunc.initApiUrl(API_URL);
        UtilFunc.initSize(100);
        $(".fakeloader").fadeOut();

        bindEvent();
        initSwipe();

        $(".audio").show();
        music_bg = $("#audio1")[0];
        music_bg.play();

        initWeixin2();

        AjaxFunc.getAction({
            url: API_URL['getToken'],
            alertFalse: 'no',
            callback: function(result){
                if(result.value){
                    token = result.value;
                }
            }
        });
        AjaxFunc.getAction({
            url: API_URL['chance'],
            alertFalse: 'no',
            callback: function(result){
                if(result.value){
                    hasChance = true;
                    $(".winBtn").text('获得一次抽奖机会');
                }else{
                    hasChance = false;
                    $(".winBtn").text('查看奖品');
                }
            }
        });
        AjaxFunc.getAction({
            url: API_URL['getPrize'],
            alertFalse: 'no',
            callback: function(result){
                var list = result.list || [];
                if(!list.length){
                    hasPrize = false;
                    $("#myBtn").hide();
                    $("#clipBtn").show();
                }else{
                    hasPrizeList = list;
                    hasPrize = true;
                    $("#clipBtn").hide();
                    $("#myBtn").show();
                }
            }
        });
    }
);

function bindEvent() {
    $(".page2, .page3, .page1").on("touchmove", function (e) {
        e.preventDefault();
    });
    $(".page2").unbind("touchstart").unbind('touchmove');

    $(".page1 .btn").on("touchend", function (e) {
        mySwiper.slideNext();
    });

    $('.shareBtn').on("touchend", function(e){
        e.stopPropagation();
        $(".share").fadeIn();
    });

    $(".share").on('touchend', function(e){
        e.stopPropagation();
        $(".share").fadeOut();
    });
    $(".againBtn").on('touchend', function(e){
        e.stopPropagation();
        mySwiper.slideTo(1)
    });
    $(".audio").on("touchend", function(){
        $(this).toggleClass("pause");
        if($(this).hasClass("pause")){
            music_bg.pause();
            $(".audio").removeClass("rotate")
        }else{
            music_bg.play();
            $(".audio").addClass("rotate")
        }
    });


    $(".winBtn").on('touchend', function(e){
        e.stopPropagation();
        if(hasChance){
            AjaxFunc.getAction({
                url: API_URL['addPrize'],
                callback: function(result){
                    if(!result.success){
                        return;
                    }
                    AjaxFunc.getAction({
                        url: API_URL['getPrize'],
                        alertFalse: 'no',
                        callback: function(result){
                            var list = result.list || [];
                            if(!list.length){
                                $(".card-wrap").hide();
                                return;
                            }
                            hasPrizeList = list;
                            initCards(list, function(){
                                mySwiper.slideNext()
                            });
                        }
                    });
                }
            });
        }else{
            AjaxFunc.getAction({
                url: API_URL['getPrize'],
                alertFalse: 'no',
                callback: function(result){
                    var list = result.list || [];
                    if(!list.length){
                        $(".card-wrap").hide();
                        return;
                    }
                    hasPrizeList = list;
                    initCards(list, function(){
                        mySwiper.slideNext()
                    });

                }
            });
        }

    });

    $("#clipBtn").on('touchend', function(e){
        e.stopPropagation();
        $(".te3").hide();
        $("#rotateBtn").hide();
        var imageData = clipCanvas.getResults();

        if(!imageData){
            X.dialog.tips('请先选择照片');
            return;
        }

        $(".te4").show();
        imageData = imageData.split("data:image/png;base64,")[1];

        $.ajax({
            url: 'http://jump.word1k.com/pic/youtu/api/detectface',
            type: 'post',
            data: JSON.stringify({
                image: imageData, app_id: '10023196'
            }),
            dataType: 'json',
            contentType: 'text/json',

            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data){
                $(".te4").hide();
                if(data.errorcode != 0){
                    if(data.errormsg == "SDK_IMAGE_FACEDETECT_FAILED"){
                        X.dialog.tips('没有检测到人脸');
                        return;
                    }
                    X.dialog.tips(data.errormsg);
                    return;
                }

                point = Number(data.face[0].beauty);
                if(point >= 99){
                    $(".score1").show();
                }else if(point >= 90){
                    $(".score2").show();
                }else if(point >= 80){
                    $(".score3").show();
                }else if(point >= 70){
                    $(".score4").show();
                }else{
                    $(".score5").show();
                }

                if(!uploadPhoto){
                    initWeixin2();
                    uploadPhoto = true;
                }

                initWeixin2(point);

                mySwiper.slideNext();
            }
        });
    });

    $(".card-wrap").on("touchend", function(e){
        var code = $(this).data("code");

    });
    $("#myBtn").on("touchend", function(e){
        var list = hasPrizeList || [];
        if(!list.length){
            X.dialog.tips("您还没有礼品");
            return;
        }
        initCards(list, function(){
            mySwiper.slideTo(3);
        });
    });
}

function initCards(list, callback){

    var v1 = list[0];
    v1['value'] = Price_Map[v1['level']];

    $(".card-wrapF .money").text(v1['value'].v);
    $(".card-wrapF .cill").text(v1['value'].m);
    //$(".card-wrapF .code2").text(v1.code);
    $(".card-wrapF").data('code', v1.code);

    if(list.length == 2){
        $(".card-wrapF").addClass("card-wrap1");
        $(".text").addClass('two');

        var v2 = list[0];
        v2['value'] = Price_Map[v2['level']];
        $(".card-wrapF2 .money").text(v2['value'].v);
        $(".card-wrapF2 .cill").text(v2['value'].m);
        //$(".card-wrapF2 .code2").text(v2.code);

        $(".card-wrapF2").show().data('code', v2.code);

    }else{
        $(".card-wrapF2").hide();
    }

    if(callback){
        callback();
    }
}

function initSwipe() {
    $(".swiper-container").show();
    $(".preload").hide();

    mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        //noSwiping : true,
        onInit: function (swiper) {
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
            $('.leafX1').removeClass('leafT');
            $('.leafX2').removeClass('leafB');
            setTimeout(function(){
                $('.leafX1').addClass('leafT');
                $('.leafX2').addClass('leafB');
            }, 5000);
        },
        onSlideChangeEnd: function (swiper) {
            swiperAnimate(swiper);

            if (swiper.snapIndex == 1 && !photoInited) {
                photoInited = true;
                clipCanvas = new ImgClip({
                    canvas: 'canvas01', // canvas id
                    fileObj: 'file', // file id
                    cutBtn: 'clipBtn', // cut btn id
                    resultObj: 'hit', // result img i
                    cutScale: 1, // 1:1、3:4
                    rotateR: 'rotateBtn'
                });
            }else if (swiper.snapIndex == 2) {
                if(!pointW){
                    pointW = $(".point-wrap").width();
                }
                initCircle(point);
            }else{
                $(".score").hide();
                if(drawTimer){
                    clearInterval(drawTimer);
                }
                mackCanvasCTX.clearRect(0, 0, pointW, pointW);
            }

            if(swiper.snapIndex == 1){
                $('.leafPT2').removeClass('leafT');
                $('.leafPB2').removeClass('leafB');
                setTimeout(function(){
                    $('.leafPT2').addClass('leafT');
                    $('.leafPB2').addClass('leafB');
                }, 5000);
            }else if(swiper.snapIndex == 2){
                $('.leafPT3').removeClass('leafT');
                $('.leafPB3').removeClass('leafB');
                setTimeout(function(){
                    $('.leafPT3').addClass('leafT');
                    $('.leafPB3').addClass('leafB');
                }, 5000);
            }else if(swiper.snapIndex == 3){
                $('.leafPT4').removeClass('leafT');
                $('.leafPB4').removeClass('leafB');
                setTimeout(function(){
                    $('.leafPT4').addClass('leafT');
                    $('.leafPB4').addClass('leafB');
                }, 5000);
            }
        },
        onTransitionEnd: function (swiper) {
            swiperAnimate(swiper);
        }
    })
}

function initCircle(point) {
    var hasLoaded = 0;
    var unit = 50;

    mackCanvas.setAttribute('width', pointW + 'px');
    mackCanvas.setAttribute('height', pointW + 'px');

    runCircle(point);


    function runCircle(percent){
        var i = 0;
        drawTimer = setInterval(function(){
            if (hasLoaded > 100) {
                clearInterval(drawTimer);
                drawTimer = null;
                return true;
            }
            if (i <= percent) {
                runAction();
                i= i + 1; hasLoaded += 1;
            } else {
                clearInterval(drawTimer);
                drawTimer = null;
            }
        }, unit);
    }

    function runAction(){
        $('#loadedNum').text(hasLoaded);

        var loaded = hasLoaded * 2 / 100 * Math.PI,
            cw = pointW, hcw = cw / 2;

        mackCanvasCTX.clearRect(0, 0, cw, cw);
        mackCanvasCTX.beginPath();
        mackCanvasCTX.arc(hcw, hcw, hcw-1, 0, loaded, false);

        mackCanvasCTX.lineWidth = 2;
        mackCanvasCTX.strokeStyle = '#ee8a81';
        mackCanvasCTX.stroke();

        var x1 = hcw * Math.sin(loaded);
        var y1 = hcw - hcw * Math.cos(loaded);

        var pp = $(".particle:after"),
            w = pp.width(), h = pp.height();
        $(".particle").css({
            left: x1 -w /2 + 8, top: y1 - h /2
        });
    }
}
function initWeixin() {
    var wxtools = new WeixinTools({
        'debug': false,
        'signatureUrl': API_URL['signatureUrl'],
        'apis': [
            'checkJsApi'
        ]
    });
    wx.ready(function () {
        wx.hideOptionMenu();
    });
}
function initWeixin2(point) {
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
        title: "逆天！颜值还能当钱花？快来看看你的颜值是多少吧！",
        desc: " 颜值有礼，杭州大厦春季美妆节测颜值送好礼，快来测测自己的颜值有多少！",
        imgUrl: "http://jump.word1k.com/hzds/images/ds.jpg",
        link: 'http://jump.word1k.com/r/cwm/urlRedirect?id=25'
    };

    point = point || 0;
    if(point >= 99){
        shareInfo['title'] = "我的颜值" + point + "分，这张脸打99分，少一分是怕我骄傲！你也来试试吧！"
    }else if(point >= 90){
        shareInfo['title'] = "我的颜值" + point + "分，我离奥斯卡只差一座小金人了！你也来试试吧！"
    }else if(point >= 80){
        shareInfo['title'] = "我的颜值" + point + "分，靠脸吃饭，买化妆品不需要花钱！你也来试试吧！"
    }else if(point >= 70){
        shareInfo['title'] = "我的颜值" + point + "分，哇塞！快来围观，这里有个美人！你也来试试吧！"
    }else if(point >= 60){
        shareInfo['title'] = "我的颜值" + point + "分，哎呦！这么迷人，快到碗里来！你也来试试吧！"
    }

    wx.ready(function () {
        wx.showOptionMenu();
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
        }
    });
}

//})();

