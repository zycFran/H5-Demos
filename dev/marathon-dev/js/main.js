
var ActivityName = '杭州马拉松';

var API_URL = {
    shareFromWeixin: API_BASE + 'cwm/shareFromWeixin?_dt=' + Math.random(),
    signatureUrl: API_BASE + 'wxconfig?_dt=' + Math.random()
};

var container = $(".swiper-container");

if (container) {
    container.hide();
}

var loadData = [
    {name: "img1", path: "./images/p1.jpg"},
    {name: "img2", path: "./images/p2.jpg"},
    {name: "img3", path: "./images/p3.jpg"},
    {name: "img4", path: "./images/p1_1_03.png"},
    {name: "img5", path: "./images/p1_2_03.png"},
    {name: "img6", path: "./images/p2_1_03.png"},
    {name: "img7", path: "./images/p2_2_03.png"},
    {name: "img8", path: "./images/p2_f_03.png"},
    {name: "img9", path: "./images/p2_f_05.png"},
    {name: "img10", path: "./images/p2_r_03.png"},
    {name: "img11", path: "./images/p2_tt_03.png"},
    {name: "img12", path: "./images/p2_tt_04.png"},
    {name: "img13", path: "./images/p3_4_03.png"},
    {name: "img14", path: "./images/p3_5_btn_03.png"},
    {name: "img15", path: "./images/p3_btn2_03.png"},
    {name: "img16", path: "./images/p3_btn_03.png"},
    {name: "img17", path: "./images/p3x_03.png"}
];
PreLoad.load(
    loadData,
    function (progress) {},
    function (result) {
        UtilFunc.initApiUrl(API_URL);

        container.show();
        $(".preload").hide();

        bindEvent();

        initData();

        initWeixin();
    }
);

var point = 0;
var time = 4 * 60;
var runInterval, timeInterval;

function initGame(){
    if(runInterval){
        clearInterval(runInterval);
    }
    if(timeInterval){
        clearInterval(timeInterval);
    }
    runInterval = setInterval(function(){
        $(".p1").toggle();
        $(".p1_2").toggle();
    }, 250);

    time--;
    $(".time").text(getTime());

    timeInterval = setInterval(function(){
        time--;
        if(time <= 0){
            clearInterval(timeInterval);
            $(".time").text(0, 0);
            gameOver();
        }else{
            $(".time").text(getTime());
        }
    }, 1000);

    $(".t1_1").removeClass("move_action").addClass("move_action");
    $(".t1").removeClass("move_action1").addClass("move_action1");
    $(".t2_1").removeClass("move_action2").addClass("move_action2");
    $(".t2").removeClass("move_action3").addClass("move_action3");

    $(".point").text(point.toFixed(1));
}

function gameOver(){

}

function initData(){
    var data2 = {
        name: '看看是',
        value: 13000
    };

    $(".t1 .name_text").text(data2['name']);
    $(".t1 .value_text").text(Math.floor(data2['value']/1000));
    $(".t1 .value2_text").text(Math.floor((42000 - data2['value'])/1000));

    var data = [
        {name: '航马', value: 10000},
        {name: '航马234', value: 20000},
        {name: '航马订单', value: 30000}
    ];

    $(".top1 .name_txt").text(data[0].name);
    $(".top1 .value_txt").text(data[0].value);

    $(".top2 .name_txt").text(data[1].name);
    $(".top2 .value_txt").text(data[1].value);

    $(".top3 .name_txt").text(data[2].name);
    $(".top3 .value_txt").text(data[2].value);

    var data3 = [
        {name: '航马', value: 10000},
        {name: '航马234', value: 20000},
        {name: '航马234', value: 20000},
        {name: '航马234', value: 20000},
        {name: '航马234', value: 20000},
        {name: '航马订单', value: 30000}
    ];
    for(var i = 1; i <= data3.length; i++){
        $(".ppp-item" + i + " .value").text(Math.floor(data3[i-1].value / 1000) + "km");
        $(".ppp-item" + i).show();
    }
}

function bindEvent() {
    $(".b1").on("touchend", function(e){
        e.stopPropagation();
        $(".tip1").show();
    });
    $(".b3").on("touchend", function(e){
        e.stopPropagation();
        $(".tip2").show();
    });
    $(".b2").on("touchend", function(e){
        e.stopPropagation();
        $(".page1").hide();
        $(".page2").show();
    });
    $(".close1").on("touchend", function(e){
        e.stopPropagation();
        $(".tip1").hide();
    });
    $(".close2").on("touchend", function(e){
        e.stopPropagation();
        $(".tip2").hide();
    });

    $(".page3 .b4").on("touchend", function(e){
        e.stopPropagation();
        $(".tip3").show();
    });
    $(".page3 .close3").on("touchend", function(e){
        e.stopPropagation();
        $(".tip3").hide();
    });

    $("body").on("touchend", function(e){
        e.stopPropagation();
        $(".fff").hide();
        initGame();
    });

    $(".foot").on("touchend", function(e){
        e.stopPropagation();
        $(this).removeClass("active");

        point += 0.1;

        $(".point").text(point.toFixed(1));

    }).on("touchstart", function(e){
        e.stopPropagation();
        $(this).addClass("active");
    });
}

function getTime(){
    var s = Math.floor(time%60);
    if(s < 10){
        s = '0' + s;
    }
    return Math.floor(time/60) + ":" + s;
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
        title: '杭州马拉松',
        desc: "杭州马拉松",
        imgUrl: "http://www.hydeze.com/s/marathon/images/200x200.jpg",
        link: 'http://www.hydeze.com/r/cwm/urlRedirect?id=17',
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


