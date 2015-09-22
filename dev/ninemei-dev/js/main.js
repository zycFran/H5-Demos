var pageWidth, pageHeight;
var curPage = 0;

var scrollPrevent;
var movePrevent;
var touchDown;
var startX;
var startY;
var margin;

var endX;
var endY;
var totalPages = 12;
var sections = 12;

var process = 0;
var $process;


var p9_index = 0;
var p9_size = 6;
var p9_thing_width;
var p9_name = '';
var p9_num = 9515;

var ActivityName = '宁美国度';
var API_URL = {
    shareFromWeixin: API_BASE + 'cwm/shareFromWeixin?_dt=' + Math.random(),
    select: API_BASE + 'cwm/ningmei/select?_dt=' + Math.random(),
    signup: API_BASE + 'cwm/signup?_dt=' + Math.random(),
    signatureUrl: API_BASE + 'wxconfig?_dt=' + Math.random()
};

var loaded = false;
var num = 0;
var inited = false;

var timer_loader = setInterval(function(){
    if(!$process){
        $process = $("#process");
    }
    if(!$process){
        return;
    }
    if(loaded){
        num++;

        if(!inited){
            inited = true;

            UtilFunc.initApiUrl(API_URL);

            initPage();
            bindEvent();
        }
        process = process+5;
    }
    if(num >= 10){

        clearInterval(timer_loader);

        $(".preload").hide();
        $(".main-wrap").show();

        $("#k_ring")[0].play();

        p9_thing_width = $("#things-wrap .thing").width();
    }
    process = process+2;
    if(num == 8){
        process = 98;
    }
    $process.text(Math.min(process, 100));
}, 100);

window.onload = function(){
    loaded = true;
};


function initPage() {
    pageWidth = $(window).width();
    pageHeight = $(window).height();

    sections = $(".wrap section");
    totalPages = sections.length;

    $(".wrap").height(pageHeight);

    sections.height(pageHeight).show();

    initWeixin();

    animatePage(curPage);
}
function onStart(e) {
    if (movePrevent == true) {
        e.preventDefault();
        return false;
    }
    scrollPrevent = false;

    touchDown = true;

    // 起始点，页面位置
    startX = e.pageX;
    startY = e.pageY;

    margin = $(".sec").css("-webkit-transform");
    margin = margin.replace("matrix(", "");
    margin = margin.replace(")", "");
    margin = margin.split(",");
    margin = parseInt(margin[5]);
}

function onMove(e, oe) {
    if (movePrevent == true || touchDown != true) {
        oe.preventDefault();
        return false;
    }
    oe.preventDefault();

    // 从第9页开始禁止 下滑
    if(e.pageY < startY && curPage >= 8){
        return false;
    }

    if (scrollPrevent == false && e.pageY != startY) {
        //var temp = margin + e.pageY - startY;
        //$(".sec").css("-webkit-transform", "matrix(1, 0, 0, 1, 0, " + temp + ")");
    }
}

function onEnd(e) {
    if (movePrevent == true) {
        e.preventDefault();
        return false;
    }

    touchDown = false;

    if (scrollPrevent == false) {
        // 抬起点，页面位置
        endX = e.pageX;
        endY = e.pageY;
        // swip 事件默认大于50px才会触发，小于这个就将页面归回
        if (Math.abs(endY - startY) <= 50) {
            animatePage(curPage);
        } else {
            if (endY > startY) {
                prevPage();
            } else {
                // 从第9页开始禁止 下滑
                if(endY < startY && curPage >= 8){
                    return false;
                }
                nextPage();
            }
        }
    }
}

function prevPage() {
    var newPage = curPage - 1;
    animatePage(newPage);
}
function nextPage() {
    var newPage = curPage + 1;
    animatePage(newPage);
}

var render_page12 = false;
var render_page9 = false;
function animatePage(newPage) {
    if (newPage < 0) {
        newPage = 0;
    }
    if (newPage > totalPages - 1) {
        newPage = totalPages - 1;
    }

    if(newPage == totalPages - 1 && render_page12){
        return;
    }

    curPage = newPage;
    var newMarginTop = newPage * (-pageHeight);

    $(".sec").css({
        "-webkit-transform": "matrix(1, 0, 0, 1, 0, " + newMarginTop + ")"
    });

    if(curPage == 11){
        render_page12 = true;
    }
    if(curPage == 4){
        $(".page5 .txt3").addClass("fadeIn");
    }
    if(curPage == 5){
        $(".page6 .txt3").addClass("fadeIn");
    }
    if(curPage == 8 && !render_page9){
        render_page9 = true;
       setTimeout(function(){
           $(".page9 .tt3").hide();
       }, 2000)
    }

    movePrevent = true;
    setTimeout(function(){
        movePrevent=false;

        if(curPage == 11){
            $(".page12").show().siblings().hide();
            $(".sec").css({
                "transition": "none",
                "-webkit-transition": "none",
                "-webkit-transform": "matrix(1, 0, 0, 1, 0, " + 0 + ")"
            });
        }
    }, 300);
}

function orient() {
    if (window.orientation == 0 || window.orientation == 180) {
        $("#land").hide();
        return false;
    }
    else if (window.orientation == 90 || window.orientation == -90) {
        $("#land").find("p").css("top", $(window).height() / 2).css("left", $(window).width() / 2 - 80);
        $("#land").show();
        return false;
    }
}

function bindEvent(){

    $("body").on('touchstart', function (e) {
        e = e.changedTouches[0];
        onStart(e);
    }).on('touchmove', function (e) {
        onMove(e.changedTouches[0], e);
    }).on('touchend', function (e) {
        onEnd(e.changedTouches[0]);
    });

    $(document).on('orientationchange', function (e) {
        orient();
    });


    $(".page10, .page12").on("touchstart", function(e){
        e.preventDefault();
        e.stopPropagation();
    });
    // 选择机器
    $(".page9 .btn").on("touchend", function(e){
        e.stopPropagation();
        p9_name = $(".page9 .thing").eq(p9_index).attr("name");
        AjaxFunc.saveAction({
            url: API_URL['select'],
            data: {
                name: p9_name
            },
            callback: function(result){
                p9_num = result.value || 9515;

                $(".page10 .name").text(p9_name);
                $(".page10 .num").text(p9_num);

                initWeixin();
                nextPage();
            }
        });
    });
    $(".page10 .btn1").on("touchend", function(e){
        e.stopPropagation();
        prevPage();
    });
    $(".page10 .btn2").on("touchend", function(e){
        e.stopPropagation();
        nextPage();
    });
    $(".page10 .btn3").on("touchend", function(e){
        e.stopPropagation();
        $(".page10 .rule").show();
    });
    $(".page10 .rule .close").on("touchend", function(e){
        e.stopPropagation();
        $(".page10 .rule").hide();
    });

    $(".page11 .btn").on("touchend", function(e){
        e.stopPropagation();
        nextPage();
    });

    var curTipsIndex = 0;
    $(".page11 .point").on("touchend", function(e){
        e.stopPropagation();
        var index = $(this).index();
        if(curTipsIndex == index){
            return;
        }
        curTipsIndex = index;
        $(".tips").removeClass("fadeIn").eq(index).addClass('fadeIn');
    });
    $(".page11 .close").on("touchend", function(e){
        e.stopPropagation();
        curTipsIndex = -1;
        $(".tips").removeClass("fadeIn");
    });

    $(".page12 .confirm").on("touchend", function(e){
        e.stopPropagation();
        $(".success").hide();
        $(".share").show();
    });
    $(".page12 .close").on("touchend", function(e){
        e.stopPropagation();
        $(".success").hide();
    });
    $(".page12 input").on("touchstart", function(e){
        e.stopPropagation();
    }).on("blur", function(e){
        animatePage(curPage);
    });
    $(".page12 .share").on("touchstart", function(e){
        $(".share").hide();
    });

    // 报名
    $(".page12 .btn").on("touchend", function(e){
        e.stopPropagation();

        var pd = getFormData();
        var re = validateForm(pd);
        if(!re.success){
            X.dialog.tips(re.message);
            return;
        }
        pd['ActivityName'] = ActivityName;
        AjaxFunc.saveAction({
            url: API_URL['signup'],
            data: pd,
            callback: function(result){
                if(!result.success){
                    setTimeout(function(){
                        $(".success").hide();
                        $(".share").show();
                    }, 2000);
                }else{
                    $(".success").show();
                }
            }
        });
    });

    $(".right_btn").on("touchend", function(e){
        e.stopPropagation();

        if(p9_index >= p9_size - 1){
            return;
        }
        p9_index++;
        $("#things-wrap").css({
            "-webkit-transform": "translate(" + -p9_thing_width * p9_index + "px,0)",
            "transform": "translate(" + -p9_thing_width * p9_index + "px,0)"
        });
        fixShineBorder();
    });
    $(".left_btn").on("touchend", function(e){
        e.stopPropagation();

        if(p9_index <= 0){
            return;
        }
        p9_index --;
        $("#things-wrap").css({
            "-webkit-transform": "translate(" + -p9_thing_width * p9_index + "px,0)",
            "transform": "translate(" + -p9_thing_width * p9_index + "px,0)"
        });
        fixShineBorder();
    });

    $(".audio").on("touchend", function(){
        $(".audio").toggleClass("pause");

        if($(".audio").hasClass("pause")){
            $("#k_ring")[0].pause();
        }else{
            $("#k_ring")[0].play();
        }
    });


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
        title: "我和全国" + p9_num + "人一样选择了" + p9_name +"，你会选择哪款曾经带给你快乐的神器？",
        desc:"我们一直热爱游戏，因为我们一直在探寻快乐的意义。快乐是什么？是方块机？红白机？PS3？网吧电脑？当我们长大，看看那些曾经带给我们快乐的游戏机，追忆童年！",
        imgUrl: "http://www.hydeze.com/s/ningmei/images/share.jpg",
        link: 'http://www.hydeze.com/r/cwm/urlRedirect?id=3'
    };
    if(!p9_name){
        shareInfo = {
            title: "探寻快乐的意义，致那些年带给我们童年快乐的游戏机！",
            desc:"我们一直热爱游戏，因为我们一直在探寻快乐的意义。快乐是什么？是方块机？红白机？PS3？网吧电脑？当我们长大，看看那些曾经带给我们快乐的游戏机，追忆童年！",
            imgUrl: "http://www.hydeze.com/s/ningmei/images/share.jpg",
            link: 'http://www.hydeze.com/r/cwm/urlRedirect?id=3'
        };
    }
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

function fixShineBorder(){
    if(p9_index >= p9_size - 1){
        $(".right_btn").removeClass('shine_ani');
    }else{
        $(".right_btn").addClass('shine_ani');
    }

    if(p9_index <= 0){
        $(".left_btn").removeClass('shine_ani');
    }else{
        $(".left_btn").addClass('shine_ani');
    }
}

function getFormData(){
    var pd = {};
    pd['name'] = $("#form-name").val() || '';
    pd['phoneNumber'] = $("#form-phone").val() || '';
    pd['QQNumber'] = $("#form-qq").val() || '';
    pd['faverGame'] = $("#form-game").val() || '';
    pd['reason'] = $("#form-reason").val() || '';
    return pd;
}

function validateForm(pd){
    var bool = true;
    var msg = '';

    if(!pd.reason){
        bool = false;
        msg = '请填写申请理由';
    }
    if(!pd.faverGame){
        bool = false;
        msg = '请填写最爱的游戏';
    }
    if(!pd.QQNumber){
        bool = false;
        msg = '请填写QQ号';
    }
    if(!pd.phoneNumber){
        bool = false;
        msg = '请填写手机号';
    }else{
        if(!X.valid.isMobile(pd.phoneNumber)){
            bool = false;
            msg = '请输入正确的手机号';
        }
    }
    if(!pd.name){
        bool = false;
        msg = '请填写姓名';
    }

    return {
        success: bool,
        message: msg
    };
}
    