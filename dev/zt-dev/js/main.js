
var ActivityName = '正泰游戏';

var API_URL = {
    shareFromWeixin: API_BASE + 'cwm/shareFromWeixin?_dt=' + Math.random(),
    signatureUrl: API_BASE + 'wxconfig?_dt=' + Math.random(),

    result: API_BASE + 'cwm/chnt/result?_dt=' + Math.random(),
    getResult: API_BASE + 'cwm/chnt/getResult?_dt=' + Math.random(),
    getMyResult: API_BASE + 'cwm/chnt/getMyResult?_dt=' + Math.random()
};

var container = $(".swiper-container");
if (container) {
    container.hide();
}

var loadData = [
    {name: "img10", path: "./images/p1.jpg"},
    {name: "img11", path: "./images/p1_2_03.png"},
    {name: "img12", path: "./images/p1_2_07.png"},
    {name: "img13", path: "./images/p1_3_03.png"},
    {name: "img14", path: "./images/wait.gif"}
];
var loadData2 = [
    {name: "img31", path: "./images/1_03.png"},
    {name: "img32", path: "./images/2_03.png"},
    {name: "img33", path: "./images/3_03.png"},
    {name: "img34", path: "./images/go_03.png"},
    {name: "img35", path: "./images/dark_03.jpg"},
    {name: "img36", path: "./images/dark_07.jpg"},
    {name: "img37", path: "./images/light_03.jpg"},
    {name: "img38", path: "./images/light_07.jpg"},
    {name: "img39", path: "./images/over.jpg"},
    {name: "img40", path: "./images/bg.jpg"},
    {name: "img42", path: "./images/sh.png"},
    {name: "img41", path: "./images/btn_03.png"}
];

var time = 29;
var point = 0;
var timer;
var start = false;
var over = false;
var music_bg;

PreLoad.load(
    loadData,
    function (progress) {},
    function (result) {
        UtilFunc.initApiUrl(API_URL);

        container.show();
        $(".preload").hide();
        $(".audio").show();

        bindEvent();

        initWeixin();

    }
);

function bindEvent() {
    $(".page1 .btn2").on("touchend", function(e){
        e.stopPropagation();
        $(".rule").show();
    });
    $(".page1 .btn1").on("touchend", function(e){
        e.stopPropagation();
        $('.waiting').show();
        PreLoad.load(
            loadData2,
            function (progress) {},
            function (result) {
                $('.waiting').hide();
                $(".page1").hide();
                $(".page2").show();
                initGame();
            }
        );
    });
    $(".page1 .btn3").on("touchend", function(e){
        e.stopPropagation();
        $(".tip").show();
    });
    $(".rule .btn").on("touchend", function(e){
        e.stopPropagation();
        $(".rule").hide();
    });
    $(".tip .btn").on("touchend", function(e){
        e.stopPropagation();
        $(".tip").hide();
    });

    $(".page2 .btn").on("touchend", function(e){
        e.stopPropagation();
        if(!start){
            return;
        }
        point ++;
        $(".page2 .point").text(point);

        if($(this).hasClass('light')){
            $(this).removeClass("light").addClass('dark');
            $(".page2 .pic").removeClass("light").addClass('dark');
        }else{
            $(this).removeClass("dark").addClass('light');
            $(".page2 .pic").removeClass("dark").addClass('light');
        }
    });

    $(".result .btn").on("touchend", function(e){
        e.stopPropagation();
        $(".page2").hide();
        $(".page3").show();

        AjaxFunc.getAction({
            url: API_URL['getResult'],
            callback: function(result){
                if(!result.success){
                    return;
                }
                var list = result.list.slice(0, 5);
                for(var i = 0; i < 5; i++){
                    $(".list" + i + " .name").text(list[i].nickname);
                    $(".list" + i + " .value").text((list[i].times||0) + "次");
                }
            }
        });

        AjaxFunc.getAction({
            url: API_URL['getMyResult'],
            callback: function(result){
                if(!result.success){
                    return;
                }
                $("#my").text(result.value);
            }
        });

    });
    $(".page3 .btn1").on("touchend", function(e){
        e.stopPropagation();
        $(".page3").hide();
        $(".page2").show();
        initGame();
    });
    $(".page3 .btn2").on("touchend", function(e){
        e.stopPropagation();
        $(".share").show();
    });
    $(".page3 .share").on("touchend", function(e){
        e.stopPropagation();
        $(".share").hide();
    });

    music_bg = $("#audio1")[0];

    $(".audio").on("touchend", function(){
        $(this).toggleClass("pause");
        if($(this).hasClass("pause")){
            music_bg.pause();
        }else{
            music_bg.play();
        }
    });
}

var timer_out1;
var timer_out2;
var timer_out3;
var timer_out4;
function initGame(){
    time = 29;
    point = 0;

    $(".page2 .time").text(time);
    $(".page2 .point").text(point);
    $(".result").hide();

    $(".page2 .go").removeClass("three two one start").addClass('three').show();
    $(".page2 .btn").removeClass("light dark").addClass('light');
    $(".page2 .pic").removeClass("light dark").addClass('light');

    if(timer){
        clearInterval(timer);
    }
    if(timer_out1){
        clearTimeout(timer_out1);
    }
    if(timer_out2){
        clearTimeout(timer_out2);
    }
    if(timer_out3){
        clearTimeout(timer_out3);
    }
    if(timer_out4){
        clearTimeout(timer_out4);
    }

    timer_out1 = setTimeout(function(){
        showTime(2);
    }, 1000);
    timer_out2 = setTimeout(function(){
        showTime(1)
    }, 2000);
    timer_out3 = setTimeout(function(){
        showTime(0)
    }, 3000);
    timer_out4 = setTimeout(function(){
        $(".page2 .go").hide();

        start = true;

        timer = setInterval(function(){
            time--;
            if(time <= 0){
                clearInterval(timer);
                $(".page2 .time").text(0);
                gameOver();

            }else{
                $(".page2 .time").text(time);
            }
        }, 1000);
    }, 4000);
}

function gameOver(){
    start = false;

    AjaxFunc.saveAction({
        url: API_URL['result'],
        data: {
            times: point
        },
        callback: function(result){
            if(!result.success){
                return;
            }

            $(".result").show();
            $('.result .pp').text(point);
        }
    });


}

function showTime(s){
    if(s == 2){
        $(".page2 .go").removeClass("three two one start").addClass("two");
    }else if(s == 1){
        $(".page2 .go").removeClass("three two one start").addClass("one");
    }else {
        $(".page2 .go").removeClass("three two one start").addClass("start");
    }
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
        title: '点赞狂魔快来挑战',
        desc: "手快有慢无，万次点击等你来挑战",
        imgUrl: "http://www.hydeze.com/s/zt/images/200X200.jpg",
        link: 'http://www.hydeze.com/r/auth/urlRedirect?id=20',
        successFn: shareHandler
    };

    wx.ready(function () {
        wxtools.shareAppMessage(shareInfo);
        wxtools.shareTimeline(shareInfo);
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
