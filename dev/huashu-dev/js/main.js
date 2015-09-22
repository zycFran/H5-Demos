(function(){
    var loadData = [
        {name: "bg", path: "./images/bg2_01.jpg"},
        //{name: "img1", path: "./images/bg_02.jpg"},

        //{name: "img2", path: "./images/p1/p1_1_03_974879c.png"},
        //{name: "img3", path: "./images/p1/p1_02.jpg"},
        //{name: "img4", path: "./images/p1/p1_2_03_0c3db23.png"},
        {name: "img51", path: "./images/p1/p1_03.png"},
        {name: "img52", path: "./images/p1/p1_06.png"},
        {name: "img53", path: "./images/p1/p3_03.png"},

        {name: "img4_11", path: "./images/p4/check_03.png"},
        {name: "img4_21", path: "./images/p4/p4_02.png"},
        {name: "img4_2", path: "./images/p4/p4_03.png"},
        {name: "img4_3", path: "./images/p4/p4_04.png"},
        {name: "img4_4", path: "./images/p4/p4b_03.png"},

        {name: "img5_1", path: "./images/p5/p5_03.png"},
        {name: "img5_2", path: "./images/p5/p5_07.png"},
        {name: "img5_3", path: "./images/p5/p5_11.png"},
        {name: "img5_4", path: "./images/p5/p5_15.png"},
        {name: "img5_5", path: "./images/p5/p5b_02.png"},

        {name: "img6_1", path: "./images/p6/p6_02.png"},
        {name: "img6_2", path: "./images/p6/p6b_03.png"},

        {name: "img7_1", path: "./images/p7/p7.png"},
        {name: "img7_2", path: "./images/p7/p8_03.png"},
        {name: "img7_3", path: "./images/p7/p8_06.png"},
        {name: "img7_4", path: "./images/p7/p8_11.png"},
        {name: "img7_5", path: "./images/p7/p8b_03.png"},
        {name: "img7_6", path: "./images/p7/p9_03.png"},

        {name: "img10_1", path: "./images/p10/p10_v_02.png"},
        {name: "img10_2", path: "./images/p10/p10_x_03.png"},
        {name: "img10_3", path: "./images/p10/p10_y_03.png"},
        {name: "img10_4", path: "./images/p10/p11_t1_03.png"},
        {name: "img10_5", path: "./images/p10/p11_t2_03.png"},
        {name: "img10_6", path: "./images/p10/p11_t3_03.png"},

        {name: "img11_1", path: "./images/p11/p11_01.png"},
        {name: "img11_2", path: "./images/p11/p11b_03.png"},

        {name: "img11_3", path: "./images/share_03.png"},
        {name: "img11_4", path: "./images/share.png"},
        {name: "img11_5", path: "./images/share_icon_03.png"}
        //{type: "sound", path: "./audio/tel.mp3"},
        //{type: "sound", path: "./audio/record.m4a"}
    ];
    LLoadManage.load(
        loadData,
        function(progress) {
            $("#process").css("width", Math.min(progress, 100) + "%");
        },
        function(result) {
            pageRender();
        }
    );
})();

var pageHeight;
var music_bg, music_tel, music_re;
var p1_timer, p2_timer, p2_timer_2, p2_timer_3;
var p1_clicked = false;
var p2_clicked = false;
var p3_clicked = false;
var p2_time = 0;
var p4_selected = [0, 0, 0, 0];

var mobile;
var ActivityName = '华数砍价';
var API_URL = {
    price: API_BASE + 'cwm/huashu/price?_dt=' + Math.random(),
    bargain: API_BASE + 'cwm/huashu/bargain?_dt=' + Math.random(),
    lottery: API_BASE + 'cwm/huashu/lottery?_dt=' + Math.random(),

    shareFromWeixin: API_BASE + 'cwm/shareFromWeixin?_dt=' + Math.random(),
    signatureUrl: API_BASE + 'wxconfig?_dt=' + Math.random(),

    isPhoneNumExist: API_BASE + 'cwm/huashu/isPhoneNumExist?_dt=' + Math.random()
};

function pageRender(){
    music_bg = $("#audio1")[0];
    //music_tel = $("#audio2")[0];
    //music_re = $("#audio3")[0];

    UtilFunc.initApiUrl(API_URL);

    pageHeight = $(window).height();
    $(".wrap").height(pageHeight);

    //$(".page1").show();
    $(".preload").hide();

    toP5Handler();

    bindEvent();

    //music_tel.play();

    //p1_timer = setTimeout(function(){
    //    if(!p1_clicked){
    //        toP2Handler();
    //    }
    //}, 15000);

    initWeixin();
}

function bindEvent(){
    // 拒绝
    $(".page1 .btn1").on("touchend", function(e){
        e.stopPropagation();
        p1_clicked = true;
        if(p1_timer){
            clearTimeout(p1_timer);
        }
        toP5Handler();
    });
    // 接听
    $(".page1 .btn2").on("touchend", function(e){
        e.stopPropagation();
        p1_clicked = true;
        toP2Handler();

    });
    // 数字键
    $(".page2 .btnx").on("touchend", function(e){
        e.stopPropagation();
        p2_clicked = true;
        if(p2_timer_2){
            clearTimeout(p2_timer_2);
        }
        toP3Handler();
    });
    // 数字键
    $(".page2 .jujue").on("touchend", function(e){
        e.stopPropagation();
        toP5Handler();
    });
    // 数字键
    $("#two").on("touchend", function(e){
        e.stopPropagation();
        p3_clicked = true;
        if(p2_timer_3){
            clearTimeout(p2_timer_3);
        }
        toP4Handler();
    });
    $("#one").on("touchend", function(e){
        e.stopPropagation();
        p3_clicked = true;
        if(p2_timer_2){
            clearTimeout(p2_timer_2);
        }
        toP5Handler();
    });

    // page4
    $(".page4 .item").on("touchend", function(e){
        e.stopPropagation();
        var index = $(this).index();
        p4_selected[index] = !p4_selected[index];
        if(p4_selected[index]){
            $(this).find(".check").show();
        }else{
            $(this).find(".check").hide();
        }
    });
    $(".page4 .btn1").on("touchend", function(e){
        e.stopPropagation();
        savePage4Handler(1)
    });
    $(".page4 .btn2").on("touchend", function(e){
        e.stopPropagation();
        savePage4Handler(0)
    });
    $(".page5 .btn1").on("touchend", function(e){
        e.stopPropagation();
        $(".page5").hide();
        $(".page6").show();
    });
    $(".page6 .btn1").on("touchend", function(e){
        e.stopPropagation();
        mobile = $("#phone").val();
        if(!X.valid.isMobile(mobile)){
            X.dialog.tips("请输入正确的手机号");
            return;
        }
        AjaxFunc.getAction({
            url: API_URL['isPhoneNumExist'],
            data: {
                phoneNum: mobile
            },
            alertFalse: 'no',
            callback: function(result){
                if(result.value){
                    X.dialog.tips("该手机号已参加过，不能再参加");
                    return;
                }
                $(".page6").hide();
                $(".page7").show();

                AjaxFunc.getAction({
                    url: API_URL['price'],
                    callback: function(result){
                        $("#num1").text('￥' + result.value.firstPrice);
                        $("#num2").text('￥' + result.value.secondPrice);
                    }
                });
            }
        });
    });

    $(".page7").on('touchstart', function (e) {
        e = e.changedTouches[0];
        onStart(e);
    }).on('touchmove', function (e) {
        onMove(e.changedTouches[0], e);
    }).on('touchend', function (e) {
        onEnd(e.changedTouches[0]);
    });
    $(".page7 .btn1").on("touchend", function(e){
        e.stopPropagation();
        runAxe();
    });
    $(".page7 .btn2,.page7 .btn3").on("touchend", function(e){
        e.stopPropagation();
        $(".page7").hide();
        $(".page10").show();
    });

    // 抽奖
    $(".page10 .btn").on("touchend", function(e){
        e.stopPropagation();
        AjaxFunc.getAction({
            url: API_URL['lottery'],
            data: {
                phoneNum: mobile
            },
            callback: function(result){
                var prize = Number(result.value.level);
                $(".box-open").show();
                if(prize >= 1){
                    $(".success").show();
                    $(".prize>div").eq(prize-1).show();
                    $(".page .txt2").show();
                }else{
                    $(".page .txt1").show();
                }
            }
        });
    });

    // 下一页
    $(".page10").on('touchstart', function (e) {
        e = e.changedTouches[0];
        onStart(e, 10);
    }).on('touchmove', function (e) {
        onMove(e.changedTouches[0], e, 10);
    }).on('touchend', function (e) {
        onEnd(e.changedTouches[0], 10);
    });

    $(".page11 .btn").on("touchend", function(e){
        $(".mask_bg").show();
        $(".share_icon").removeClass('flash animated').addClass('flash animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass('flash animated');
        });
    });
    $(".page11 .mask_bg").on("touchend", function(e){
        $(".mask_bg").hide();
    })
}

function toP2Handler(){
    clearTimeout(p1_timer);
    $(".page1").hide();
    $(".page2").show();
    music_tel.pause();
    music_re.play();

    p2_timer = setInterval(function(){
        p2_time++;
        $(".page2 .time").text(resetTime(p2_time));
    }, 1000);

    p2_timer_2 = setTimeout(function(){
        if(!p2_clicked){
            toP3Handler();
        }
    }, 20000);

    p2_timer_3 = setTimeout(function(){
        if(!p3_clicked){
            toP5Handler();
        }
    }, 36000);
}

function toP3Handler(){
    $(".page2 .number").show();
    $(".page2 .middle").hide();
}

function toP4Handler(){
    music_tel.pause();
    music_re.pause();
    music_bg.play();

    if(p2_timer){
        clearTimeout(p2_timer);
    }
    if(p2_timer_2){
        clearTimeout(p2_timer_2);
    }
    if(p2_timer_3){
        clearTimeout(p2_timer_3);
    }
    $(".sec").show();
    $(".page4").show();
}
function savePage4Handler(type){
    if(type){
        // 提交
    }else{
        // 满意
    }
    toP5Handler();
}
function toP5Handler(){
    //music_tel.pause();
    //music_re.pause();
    music_bg.play();

    if(p2_timer){
        clearTimeout(p2_timer);
    }
    if(p2_timer_2){
        clearTimeout(p2_timer_2);
    }
    if(p2_timer_3){
        clearTimeout(p2_timer_3);
    }

    $(".page2").hide();
    $(".page4").hide();
    $(".sec").show();
    $(".page5").show();
}

function toPage11Handler(){
    $(".page10").hide();
    $(".page11").show();
}

var margin;
var movePrevent;
var touchDown;
var startX;
var endX;
var endY;
var startY;

function onStart(e, pageNum) {
    if (movePrevent == true) {
        e.preventDefault();
        return false;
    }
    scrollPrevent = false;

    touchDown = true;

    // 起始点，页面位置
    startX = e.pageX;
    startY = e.pageY;

    $(".page7 .sitiao").hide();
}

function onMove(e, oe) {
    if (movePrevent == true || touchDown != true) {
        oe.preventDefault();
        return false;
    }
    oe.preventDefault();

    if (scrollPrevent == false && e.pageY != startY) {

    }
}

function onEnd(e,pageNum) {
    if (movePrevent == true) {
        e.preventDefault();
        return false;
    }

    touchDown = false;

    if (scrollPrevent == false) {
        // 抬起点，页面位置
        endX = e.pageX;
        endY = e.pageY;

        // 默认大于50px才会触发，小于这个就将页面归回
        if (Math.abs(endY - startY) <= 50) {
            return false;
        } else if (endY > startY) {
            if(pageNum == 10){

            }else{
                runAxe();
            }
        }else if(endY < startY){
            if(pageNum == 10){
                toPage11Handler();
            }
        }
    }
}
// 滑动斧头
function runAxe(){
    $(".page7 .axe").addClass("kan");
    setTimeout(function(){
        $(".page7 .axe").removeClass("kan");
        $(".page7 .sitiao").show();
        runAxeResult();
    }, 700);
}

// 砍价结果
function runAxeResult(){
    AjaxFunc.saveAction({
        url: API_URL['bargain'],
        data: {
            phoneNum: mobile
        },
        alertFalse: 'no',
        callback: function(result){
            if(!result.success){
                X.dialog.tips("您已参加过活动！谢谢参与！");
                return;
            }
            if(result.value.result){
                $(".dialog").show();
                $(".page7 .p8").show();
                $(".page7 #t1").text('【' + result.value.peopleNum + '】');
                $(".page7 #t2").text('【' + result.value.bargainPrice + '】');
                $(".page7 #t3").text("￥" + result.value.firstPrice);
                $(".page7 #t4").text("￥" + result.value.secondPrice);
            }else{
                $(".dialog").show();
                $(".page7 .p9").show();
                $(".page7 #t5").text('【' + result.value.peopleNum + '】');
            }
        }
    });

}

function resetTime(time){
    if(time < 10){
        return "00:0" + time;
    }else if(time < 60){
        return "00:" + Math.floor(time/10) + ''  +Math.floor(time%10);
    }else if(time < 600){
        var t1 = Math.floor(time%60);
        return "0" + Math.floor(time/60) + ':' + Math.floor(t1/10) + ''  +Math.floor(t1%10);
    }
}


function initWeixin(){
    var wxtools = new WeixinTools({
        'debug' : false,
        'signatureUrl' : API_URL['signatureUrl'],
        'apis' : [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ]
    });
    var shareInfo = {
        title: "9.18全民“kan”价节",
        desc:"宽带资费，你必须知道的秘密",
        imgUrl: "http://www.hydeze.com/s/huashu/images/p4/p4_03_0a3c584.png",
        link: 'http://www.hydeze.com/r/cwm/urlRedirect?id=4'
    };
    wx.ready(function(){
        wxtools.shareAppMessage(shareInfo);
        wxtools.shareTimeline(shareInfo);

        wx.checkJsApi({
            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
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


function shareHandler(type){
    AjaxFunc.getAction({
        url: API_URL['shareFromWeixin'],
        data: {
            type: type,
            activityName: ActivityName
        },
        callback: function(){
            //alert(type);
        }
    });
}