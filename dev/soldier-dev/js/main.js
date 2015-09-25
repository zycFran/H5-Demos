/**
 * Created by zhouyc on 2015/9/10.
 */


//(function () {

var mobile;
var name;
var mySwiper;
var ActivityName = '印象城致敬老兵';
var music_bg;

var container = $(".swiper-container");

var hasUpload = 0;

var API_URL = {
    shareFromWeixin: API_BASE + 'cwm/shareFromWeixin?_dt=' + Math.random(),
    signatureUrl: API_BASE + 'wxconfig?_dt=' + Math.random(),

    getCode: API_BASE + 'cwm/laobing/getCode?_dt=' + Math.random(),
    submit: API_BASE + 'cwm/laobing/submit?_dt=' + Math.random(),
    getFileId: API_BASE + 'getFileId?_dt=' + Math.random(),
    getFile: API_BASE + 'download/files?_dt=' + Math.random()
};

if (container) {
    container.hide();
}

var loadData = [
    {name: 'img1', path: 'images/p1.jpg'},
    {name: 'img2', path: 'images/p2.jpg'},
    {name: 'img3', path: 'images/border_03.png'},
    {name: 'img4', path: 'images/p4.jpg'},
    {name: 'img5', path: 'images/p5.jpg'},
    {name: 'img6', path: 'images/p6.jpg'},
    {name: 'img7', path: 'images/p6_2.jpg'},
    {name: 'img9', path: 'images/p1_03.png'},
    {name: 'img10', path: 'images/p1_07.png'},
    {name: 'img11', path: 'images/p2_03.png'},
    {name: 'img12', path: 'images/p2_07.png'},
    {name: 'img13', path: 'images/p2_11.png'},
    {name: 'img14', path: 'images/p3_2_03.png'},
    {name: 'img15', path: 'images/p3_2_07.png'},
    {name: 'img16', path: 'images/p3_2_11.png'},
    {name: 'img17', path: 'images/p3_03.png'},
    {name: 'img18', path: 'images/p3_07.png'},
    {name: 'img19', path: 'images/p3_10.png'},
    {name: 'img20', path: 'images/p4_03.png'},
    {name: 'img21', path: 'images/p4_3_03.png'},
    {name: 'img22', path: 'images/p4_05.png'},
    {name: 'img23', path: 'images/p4_07.png'},
    {name: 'img24', path: 'images/p4_09.png'},
    {name: 'img25', path: 'images/p4_11.png'},
    {name: 'img26', path: 'images/p4_13.png'},
    {name: 'img27', path: 'images/p4_15.png'},
    {name: 'img28', path: 'images/p4_17.png'},
    {name: 'img29', path: 'images/p4_btn_27.png'},
    {name: 'img30', path: 'images/p5_03.png'},
    {name: 'img31', path: 'images/p5_07.png'},
    {name: 'img32', path: 'images/p5_10.png'},
    {name: 'img33', path: 'images/p7_btn_03.png'},
    {name: 'img34', path: 'images/p7x_03.png'}
];
PreLoad.load(
    loadData,
    function (progress) {
        //$("#process").css("width", Math.min(progress, 100) + "%");
    },
    function (result) {
        UtilFunc.initApiUrl(API_URL);

        bindEvent();

        fileId = UtilFunc.getQueryStringByName("fileId") || null;

        if(fileId){
            $(".page7").show();
            var img = API_URL['getFile'] + "&fileId=" + fileId;
            $("#SoldierImage").attr("src", img);
        }else{
            $(".page7").remove();
        }

        initSwipe();

        initWeixin();
    }
);

var user = {};
var sending = false;
var serverIds = [];
var uploaded = false;
var fileId;

function bindEvent() {
    $(".page4 .btn").on("touchend", function (e) {
        e.stopPropagation();
        $(".page4 .rule").show();
    });
    $(".page4 .close").on("touchend", function (e) {
        e.stopPropagation();
        $(".page4 .rule").hide();
    });
    $(".page5 .upload, .page5 .btn2").on("touchend", function (e) {
        e.preventDefault();
        e.stopPropagation();

        serverIds = [];
        uploaded = false;
        wx.chooseImage({
            count: 1,
            success: function (res) {
                upload(res.localIds);
                $(".uploadImage").attr("src", res.localIds[0]);
            }
        });
    });
    $(".page5 .btn1").on("touchend", function (e) {
        e.stopPropagation();
        if(!uploaded){
            X.dialog.tips("请先上传照片");
            return;
        }
        mySwiper.slideNext();
    });

    $(".page5, .page6, .page6_2").on("touchmove", function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $(".page6 .btn1").on("touchend", function (e) {
        e.stopPropagation();
        user['name'] = $("#name").val();
        user['sex'] = $("#sex").val();
        user['birthday'] = $("#birthday").val();
        user['mobile'] = $("#mobile").val();
        user['code'] = $("#code").val();

        if (!user['name']) {
            X.dialog.tips("请输入姓名");
            return;
        }
        if (!user['sex']) {
            X.dialog.tips("请输入性别");
            return;
        }
        if (!user['birthday']) {
            X.dialog.tips("请输入生日");
            return;
        }
        if (!user['mobile']) {
            X.dialog.tips("请输入手机");
            return;
        } else if (!X.valid.isMobile(user['mobile'])) {
            X.dialog.tips("请输入正确的手机号");
            return;
        }
        if (!user['code']) {
            X.dialog.tips("请输入验证码");
            return;
        }

        //mySwiper.slideNext();
        //return;

        AjaxFunc.saveAction({
            url: API_URL['submit'],
            data: {
                id: null,
                phoneNumber: user['mobile'],
                name: user['name'],
                sex: user['sex'],
                birthday: Number(new Date(user['birthday'])),
                code: user['code']
            },
            callback: function (result) {
                if (!result.success) {
                    X.dialog.tips("您已提交过，请勿重复提交！");
                    return;
                }

                mySwiper.slideNext();
            }
        });
    });

    $(".page6 .btn2").on("touchend", function (e) {
        e.stopPropagation();
        if (sending) {
            return;
        }
        user['mobile'] = $("#mobile").val();

        if (!user['mobile']) {
            X.dialog.tips("请输入手机");
            return;
        } else if (!X.valid.isMobile(user['mobile'])) {
            X.dialog.tips("请输入正确的手机号");
            return;
        }

        AjaxFunc.getAction({
            url: API_URL['phoneNum'],
            data: {
                phoneNumber: user['mobile']
            },
            callback: function (result) {
                if(result.success){
                    X.dialog.tips("验证码已发送，请查收");
                }
            }
        });

        sending = true;
        var time = 59;
        var dom = $(this);
        dom.text(time-- + "s");
        var timer = setInterval(function () {
            if (time <= 0) {
                clearInterval(timer);
                dom.text("发送验证码");
                sending = false;
                return;
            }
            dom.text(time-- + "s");
        }, 1000);
    });
    $(".page7 .btn").on("touchend", function (e) {
        e.stopPropagation();
        mySwiper.slideTo(1);
    });
}

function initSwipe() {
    $(".swiper-container").show();
    $(".preload").hide();

    mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        mousewheelControl: true,

        onInit: function (swiper) {
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
        },
        onSlideChangeEnd: function (swiper) {
            swiperAnimate(swiper);
        },
        onTransitionEnd: function (swiper) {
            swiperAnimate(swiper);
            if(hasUpload){
                if (swiper.snapIndex >= 6) {
                    $("#arrow").hide();
                } else {
                    $("#arrow").show();
                }
                if(swiper.snapIndex == 5){
                    setTimeout(function(){
                        $(".shine_border").addClass("shine_guang");
                    }, 8000);
                }
            }else{
                if (swiper.snapIndex >= 5) {
                    $("#arrow").hide();
                } else {
                    $("#arrow").show();
                }
                if(swiper.snapIndex == 4){
                    setTimeout(function(){
                        $(".shine_border").addClass("shine_guang");
                    }, 8000);
                }
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
            'onMenuShareAppMessage',

            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage'
        ]
    });
    var shareInfo = {
        title: '和印象城一起向抗战老兵敬礼，赢取IPhone6s',
        desc: "这是一场值得每一位国人参与的活动，70年前他们浴血奋战，硝烟散尽，抗战老兵已是耋耋老兵。但铮铮铁骨却应被每一个国人深刻铭记。老兵！让我们向你致敬！",
        imgUrl: "http://www.hydeze.com/s/soldier/images/share.jpg",
        //link: 'http://www.hydeze.com/r/cwm/urlRedirect?id=6'
        link: 'http://www.hydeze.com/s/soldier/index.html'
    };

    if(uploaded && fileId){
        //shareInfo['link'] = "http://www.hydeze.com/r/cwm/urlRedirect?id=6&hasUpload=1";
        shareInfo['link'] = "http://www.hydeze.com/s/soldier/index.html?id=6&fileId=" + fileId;
    }

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

//上传图片
function upload(imgList) {
    var index = 0;
    if (imgList && imgList[index]) {
        wx.uploadImage({
            localId: imgList[index],
            isShowProgressTips: 1,
            success: function (res) {
                serverIds.push(res.serverId);
                uploaded = true;

                //var link = "https://api.weixin.qq.com/cgi-bin/media/get?access_token=-LZIsjVUqNJqfFITr3tf2_a2L_dN7oD0u4h58BYSh4B55zi5qBNE9zcejIFspzcolgNgmIgoGn_d7FCwsDS-Dmy6oya4qVFwxOLjbBsaH48&media_id="
                //    + res.serverId;
                //
                //location.href = link;

                AjaxFunc.getAction({
                    url: API_URL['getFileId'],
                    data: {
                        mediaId: res.serverId
                    },
                    callback: function (result) {
                        fileId = result.value;

                        initWeixin();
                    }
                });

            },
            fail: function (res) {
            }
        });
    }
}
//})();
