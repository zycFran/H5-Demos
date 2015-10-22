
var ActivityName = '老凤祥2015会员盛典';
var mySwiper;

var API_URL = {
    shareFromWeixin: API_BASE + 'cwm/shareFromWeixin?_dt=' + Math.random(),
    signatureUrl: API_BASE + 'wxconfig?_dt=' + Math.random()
};

var container = $('.swiper-container');
if (container) {
    container.hide();
}

var loadData = [
    {name: "img1", path: "./images/p1.jpg"}
];

PreLoad.load(
    loadData,
    function (progress) {},
    function (result) {
        UtilFunc.initApiUrl(API_URL);

        container.show();
        $(".preload").hide();

        bindEvent();

        initWeixin();

        initSwipe();

    }
);

function bindEvent() {
    $(".page1 .t2").on("touchend", function(e){
        e.stopPropagation();
        mySwiper.slideNext();

        $(".page2 .t1").addClass("move_action");
    });
}

function initSwipe(index) {
    $(".swiper-container").show();
    $(".preload").hide();

    mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        mousewheelControl: true,
        initialSlide: index,

        onInit: function (swiper) {
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
        },
        onSlideChangeEnd: function (swiper) {
            swiperAnimate(swiper);
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
