/**
 * Created by zhouyc on 2015/9/10.
 */


//(function () {

var mobile;
var name;
var mySwiper;
var ActivityName = '穿越到杭州';
var music_bg;

var container = $(".swiper-container");

var num;
var fileId;

var API_URL = {
    shareFromWeixin: API_BASE + 'cwm/shareFromWeixin?_dt=' + Math.random(),
    signatureUrl: API_BASE + 'wxconfig?_dt=' + Math.random(),

    passhzRandom: API_BASE + 'cwm/passhz/random?_dt=' + Math.random(),
    passhzNum: API_BASE + 'cwm/passhz/num?_dt=' + Math.random(),
    getPasshzUser: API_BASE + 'cwm/passhz/query?_dt=' + Math.random()
};

if (container) {
    container.hide();
}

var user = {};
var data = [
    {
        name: '许仙',
        desc: '眉清目秀、善良敦厚，白娘子被镇压后，伤心欲绝，前往金山寺出家。放在现在有可能是男闺蜜或者“好人卡”类型……',
        src: 'images/data/0.png'
    },
    {
        name: '法海',
        desc: '法力强大，拆散许仙白娘子，连歌也唱的“法海你不懂爱”，不过你只想说：“人妖不能联姻，为啥你们都怪我啊！”',
        src: 'images/data/1.png'
    },
    {
        name: '孙权',
        desc: '紫髯碧眼，长上短下，二十四年虎踞龙盘江东！',
        src: 'images/data/2.png'
    },
    {
        name: '苏东坡',
        desc: '虽然你不是杭州人，但说到杭州名人最有名的就是你！苏堤啦，东坡肉啦，从水患成灾的杭州到天堂美名的西湖，你功不可没！',
        src: 'images/data/3.png'
    },
    {
        name: '白居易',
        desc: '最爱湖东行不足，绿杨阴里白沙堤。你为西湖修建的那条白公堤早已不见，但没有人忘记你曾经的付出。',
        src: 'images/data/4.png'
    },
    {
        name: '岳飞',
        desc: '抗金名将，民族英雄，奈何为奸人所害，美丽的杭州成为你的蒙难之地。',
        src: 'images/data/5.png'
    },
    {
        name: '武松',
        desc: '身躯凛凛，双目寒星，酒憨过岗一拳伏虎震景阳！',
        src: 'images/data/6.png'
    },
    {
        name: '章太炎',
        desc: '三百年一出的大学者！这么一说知道前世多牛了吧？古今中外无不通，简称……“通人”！',
        src: 'images/data/7.png'
    },
    {
        name: '胡雪岩',
        desc: '从贫寒的幼年，一路成为红顶商人，富可敌国，而且还有14位太太，最终又一贫如洗，你前世绝对是“传奇”！',
        src: 'images/data/8.png'
    },
    {
        name: '郁达夫',
        desc: '生于富阳，娶杭州第一美女为妻，在杭城建起理想的家园，不管身埋何处，你的心里，对杭州一定有着别样的情感吧！',
        src: 'images/data/9.png'
    },
    {
        name: '徐志摩',
        desc: '天马行空、才气横溢，你在短暂人生留下瑰丽的诗歌和令人唏嘘的爱情故事，而西子湖畔留下你求学与恋爱的身影。',
        src: 'images/data/10.png'
    },
    {
        name: '戴望舒',
        desc: '你写诗、成名、恋爱、失恋、结婚、离婚，爱情是场一波三折的悲剧，但心里住着丁香一样的姑娘。',
        src: 'images/data/11.png'
    },
    {
        name: '梁山伯',
        desc: '善良诚实，有才学见识，与祝英台相爱却奈何祝有婚约，因爱生忧，因爱生怖，因爱生病，抑郁而终。',
        src: 'images/data/12.png'
    },
    {
        name: '白娘子',
        desc: '一袭白衣，秀美脱俗，千年修炼成人形，嫁给许仙来报恩，完全颠覆女妖妖媚祸人的形象啊！',
        src: 'images/data/13.png'
    },
    {
        name: '小青',
        desc: '爱憎分明、率真可爱，与白娘子情同姐妹，绝对不是现在自拍时往后站的“心机girl”。',
        src: 'images/data/14.png'
    },
    {
        name: '螺蛳夫人',
        desc: '精明果断，胆识过人，是红顶商人胡雪岩的贤内助，还给他娶了12个姨太太，话说你到底咋想的？',
        src: 'images/data/15.png'
    },
    {
        name: '王映霞',
        desc: '婷婷袅袅，明眸如水，是当年的“杭州第一美人”，旧爱郁达夫为你筑起“风雨茅庐”。',
        src: 'images/data/16.png'
    },
    {
        name: '苏小小',
        desc: '玲珑秀美，气韵非常，是有名的才女佳人。生在西泠，死在西泠，葬在西泠，不负一生爱好山水。',
        src: 'images/data/17.png'
    },
    {
        name: '冯小青',
        desc: '名门千金，秀丽端雅，聪颖伶俐，无奈家道中落，红颜薄命。艳女、才女、怨女，未有一人如小青者。',
        src: 'images/data/18.png'
    },
    {
        name: '陆小曼',
        desc: '你是奢侈任性抽烟挥霍的坏女孩，也是写诗作画造诣有加的好姑娘，前半生美颜肆意，后半生平静安宁，是一道不可不看的风景。',
        src: 'images/data/19.png'
    },
    {
        name: '祝英台',
        desc: '女扮男装，活泼爽朗，求学杭州与梁山伯相识相爱却无法相守，为爱殉情化作蝶，佩服你的勇气！',
        src: 'images/data/20.png'
    },
    {
        name: '张岱',
        desc: '旅行、音律、戏曲、茶道、文章……没有你不擅长的！但你又落拓不羁，淡泊功名，放到现在，你绝对是文艺女青年最爱！',
        src: 'images/data/21.png'
    },
    {
        name: '于谦',
        desc: '当然不是德云社那个于谦！是明朝名臣、民族英雄于谦，可惜最后也被奸人陷害了。',
        src: 'images/data/22.png'
    },
    {
        name: '陈端生',
        desc: '没听过？以为是男性？那这一世的你真没上一世有文化！你是著名的弹词女作家，不到18岁就开始写《再生缘》，与《红楼梦》并称南缘北梦！',
        src: 'images/data/23.png'
    },
    {
        name: '济公',
        desc: '别以为自己前世只是衣衫褴褛，貌似疯癫，你是个打抱不平，医术精湛，而且诗文造诣也超级高的个性高僧！',
        src: 'images/data/24.png'
    },
    {
        name: '龚自珍',
        desc: '别看你写诗考试做官，忧国忧民，其实你还是个怪癖颇多的多情种子！',
        src: 'images/data/25.png'
    },
    {
        name: '沈括',
        desc: '北宋时期你就是个科学家了！物理、数学、天文、地理、生物、医学都是你的强项，文学、音乐、艺术、史学你也不落下，连算卦你都会！简直是完美理科男啊！',
        src: 'images/data/26.png'
    },
    {
        name: '杨孟瑛',
        desc: '现在的你知道西湖历史离不开白居易，离不开苏东坡，那么知不知道也离不开前世的你自己！快去百度杨公堤！',
        src: 'images/data/27.png'
    },
    {
        name: '贺知章',
        desc: '写得一手好诗文，一手好草书！特别喜欢趁着酒兴写诗，一开始写就根本停不下来，把纸写完才算数！',
        src: 'images/data/28.png'
    },
    {
        name: '林逋',
        desc: '绝对的淡泊出尘之人！写诗写完就丢，作画从不外传，书法作品现在也只有三件，苏东坡对你的诗书人品都高度赞赏！',
        src: 'images/data/29.png'
    },
    {
        name: '柳永',
        desc: '追求功名仕途坎坷，不过你还是让世人记住了你！柳词在当时的流传盛况……和现在周杰伦的流行程度也差不多吧。',
        src: 'images/data/30.png'
    },
    {
        name: '马文才',
        desc: '大家都为梁祝在惋惜，坏名声落在你身上，可你其实也爱祝英台啊，你也不那么坏。放在今天，肯定很多女生喜欢你。',
        src: 'images/data/31.png'
    },
    {
        name: '钱鏐',
        desc: '你是吴越国的创建者，历史上对你的评价有高有低，但“海龙王”的称号证明你对两浙地区经济民生的贡献！',
        src: 'images/data/32.png'
    },
    {
        name: '年羹尧',
        desc: '你就是年贵妃的哥哥啦，名声很大，位极人臣，但侍功而骄过了点，so结局很惨……',
        src: 'images/data/33.png'
    },
    {
        name: '秋瑾',
        desc: '志趣高尚，性格刚烈，是为革命献身的女中豪杰，鉴湖女侠！',
        src: 'images/data/34.png'
    },
    {
        name: '赵孟頫',
        desc: '楷书四大家之一，书画极其出彩！不过还是有人对你身为宋太祖后人，却在元朝为官这件事耿耿于怀。',
        src: 'images/data/35.png'
    },
    {
        name: '施子安',
        desc: '没错，就是写《水浒传》的施耐庵，你也在杭州当过官，对这里熟悉的很，简直是“钱塘施耐庵”，别说这部巨著里头蕴含了多少杭州元素你自己不知道！ ',
        src: 'images/data/36.png'
    }
];
var loadData = [
    {name: 'img1', path: 'images/p1.jpg'},
    {name: 'img2', path: 'images/p2.jpg'},
    {name: 'img_0', path: 'images/data/0.png'},
    {name: 'img_1', path: 'images/data/1.png'},
    {name: 'img_2', path: 'images/data/2.png'},
    {name: 'img_3', path: 'images/data/3.png'},
    {name: 'img_4', path: 'images/data/4.png'},
    {name: 'img_5', path: 'images/data/5.png'},
    {name: 'img_6', path: 'images/data/6.png'},
    {name: 'img_7', path: 'images/data/7.png'},
    {name: 'img_8', path: 'images/data/8.png'},
    {name: 'img_9', path: 'images/data/9.png'},
    {name: 'img_10', path: 'images/data/10.png'},
    {name: 'img_11', path: 'images/data/11.png'},
    {name: 'img_12', path: 'images/data/12.png'},
    {name: 'img_13', path: 'images/data/13.png'},
    {name: 'img_14', path: 'images/data/14.png'},
    {name: 'img_15', path: 'images/data/15.png'},
    {name: 'img_16', path: 'images/data/16.png'},
    {name: 'img_17', path: 'images/data/17.png'},
    {name: 'img_18', path: 'images/data/18.png'},
    {name: 'img_19', path: 'images/data/19.png'},
    {name: 'img_20', path: 'images/data/20.png'},
    {name: 'img_21', path: 'images/data/21.png'},
    {name: 'img_22', path: 'images/data/22.png'},
    {name: 'img_23', path: 'images/data/23.png'},
    {name: 'img_24', path: 'images/data/24.png'},
    {name: 'img_25', path: 'images/data/25.png'},
    {name: 'img_26', path: 'images/data/26.png'},
    {name: 'img_27', path: 'images/data/27.png'},
    {name: 'img_28', path: 'images/data/28.png'},
    {name: 'img_29', path: 'images/data/29.png'},
    {name: 'img_30', path: 'images/data/30.png'},
    {name: 'img_31', path: 'images/data/31.png'},
    {name: 'img_32', path: 'images/data/32.png'},
    {name: 'img_33', path: 'images/data/33.png'},
    {name: 'img_34', path: 'images/data/34.png'},
    {name: 'img_35', path: 'images/data/35.png'},
    {name: 'img_36', path: 'images/data/36.png'}
];

PreLoad.load(
    loadData,
    function (progress) {
        //$("#process").css("width", Math.min(progress, 100) + "%");
    },
    function (result) {
        UtilFunc.initApiUrl(API_URL);

        bindEvent();

        //$(".audio").show();
        //music_bg = $("#audio1")[0];

        AjaxFunc.getAction({
            url: API_URL['passhzNum'],
            callback: function(result){
                if(result.value){
                    num = result.value;
                    $("#num").text(num);
                }
            }
        });

        fileId = UtilFunc.getQueryStringByName("fileId");
       // var name = UtilFunc.getQueryStringByName("name");
        if(fileId != undefined && fileId != ""){
            fileId = Number(fileId);

            AjaxFunc.getAction({
                url: API_URL['getPasshzUser'],
                data: {
                    id: fileId
                },
                callback: function(result){
                    if(!result.success){
                       return;
                    }
                    var item = data[result.value.userId];
                    user['cross_name'] = item['name'];
                    user['tip'] = item['desc'];
                    user['image'] = item['src'];

                    user['name'] = result.value.name;

                    $("#name2").text( user['name'] );
                    $("#name3").text( user['cross_name'] );
                    $("#tip").text( user['tip'] );
                    $("#headImage").attr("src", item['src']);

                    initSwipe(1);

                    initWeixin();
                }
            });

        }else{

            initSwipe(0);

            initWeixin();
        }

    }
);


function bindEvent() {
    $(".page1, .page2").on("touchmove", function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $(".page1 input").on("touchend", function (e) {
        e.stopPropagation();
    });
    $(".page1 .btn1").on("touchend", function (e) {
        e.stopPropagation();
        user['name'] = $("#name").val();

        if (!user['name']) {
            X.dialog.tips("请输入姓名");
            return;
        }

        AjaxFunc.getAction({
            url: API_URL['passhzRandom'],
            data:{
                name: user['name']
            },
            callback: function(result){
                if(!result.success){
                    return;
                }
                fileId = Number(result.value.id);

                var item = data[Number(result.value.userId)];
                user['cross_name'] = item['name'];
                user['tip'] = item['desc'];
                user['image'] = item['src'];

                $("#name2").text( user['name'] );
                $("#name3").text( user['cross_name'] );
                $("#tip").text( user['tip'] );
                $("#headImage").attr("src", item['src']);

                mySwiper.slideNext();
                initWeixin();
            }
        });
    });
    $(".share").on("touchend", function (e) {
        e.stopPropagation();
        $(".share_mask").show();
    });
    $(".share_mask").on("touchend", function (e) {
        e.stopPropagation();
        $(".share_mask").hide();
    });
    $(".page2 .btn1").on("touchend", function (e) {
        e.stopPropagation();
        mySwiper.slidePrev();
    });

    //$(".audio").on("touchend", function(){
    //    $(this).toggleClass("pause");
    //    if($(this).hasClass("pause")){
    //        music_bg.pause();
    //    }else{
    //        music_bg.play();
    //    }
    //});
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
            'onMenuShareAppMessage',

            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage'
        ]
    });
    var shareInfo = {
        title: '快来测试你在杭州前世是谁！',
        desc: "穿越到杭州，我的前世竟然是...",
        imgUrl: "http://www.hydeze.com/s/cross/images/share_ico.png",
        link: 'http://www.hydeze.com/r/cwm/urlRedirect?id=12',

        successFn: shareHandler
    };

    if(user['name'] && user['cross_name']){
        shareInfo['desc'] = user['name'] + "穿越到杭州，前世竟然是" + user['cross_name'] + "，你敢信？";
        shareInfo['imgUrl'] = "http://www.hydeze.com/s/cross/" + user['image'];
        shareInfo['link'] = 'http://www.hydeze.com/r/cwm/urlRedirect?id=12'
            + "&fileId=" + fileId;
    }

    wx.ready(function () {

        wxtools.shareAppMessage(shareInfo);
        wxtools.shareTimeline(shareInfo);

    });
}
function checkLen(obj){
    var maxChars = 8;//最多字符数

    if (obj.value.length > maxChars)
        obj.value = obj.value.substring(0,maxChars);

    //obj.value = curr;
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
//})();
