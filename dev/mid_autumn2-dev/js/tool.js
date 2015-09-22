/**
 * tool
 * Created by apple on 15-9-1.
 */

var Base = {
    openid: 'openid1',
    password: 'csj150kg'
};

var API_BASE = '/r/';
var AjaxFunc = {
    // 读取数据
    getAction: function(opt){
        if(opt.data){
            for( var key in opt.data){
                opt.url += '&' + key + "=" + opt.data[key];
            }
        }
        opt.alertFalse =  opt.alertFalse || 'yes';
        var option = {
            url: opt.url,
            type: 'GET',
            contentType: 'application/json',
            dataType: "json",

            success: function (result) {
                if(!result) return;
                if(result.success){

                }else{
                    if(result.message && opt.alertFalse == 'yes'){
                        X.dialog.tips(result.message);
                    }
                }
                // 处理回调
                if(opt.callback){
                    opt.callback(result);
                }
            }
        };
        $.ajax(option);
    },

    // 提交数据
    saveAction: function(opt) {
        opt.alertFalse = opt.alertFalse || 'yes';
        var option = {
            url: opt.url,
            type: opt.method || 'POST',
            data: JSON.stringify(opt.data),
            contentType: 'application/json',
            dataType: "json",

            success: function (result) {
                if (!result) return;
                if (result.success) {

                } else {
                    if (result.message && opt.alertFalse == 'yes') {
                        X.dialog.tips(result.message);
                    }
                }
                // 处理回调
                if (opt.callback) {
                    opt.callback(result);
                }

            }
        };
        $.ajax(option);
    }
};
var UtilFunc = {
    //获取QueryString的数组
    getQueryString: function(){
        var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+","g"));
        for(var i = 0; i < result.length; i++){
            result[i] = result[i].substring(1);
        }
        return result;
    },

    //根据QueryString参数名称获取值
    getQueryStringByName: function(name){
        var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
        if(result == null || result.length < 1){
            return "";
        }
        return result[1];
    },
    /*
     *功能：设置Cookie
     *cookieName 必选项，cookie名称
     *cookieValue 必选项，cookie值
     *seconds 生存时间，可选项，单位：秒；默认时间是3600 * 24 * 7秒
     *path cookie存放路径，可选项
     *domain cookie域，可选项
     *secure 安全性，指定Cookie是否只能通过https协议访问，一般的Cookie使用HTTP协议既可访问，如果设置了Secure（没有值），则只有当使用https协议连接时cookie才可以被页面访问
     */
    setCookie: function (cookieName, cookieValue, seconds, path, domain, secure) {
        var expires = new Date();
        var seconds = arguments[2] ? arguments[2] : 3600 * 24 * 7;
        expires.setTime(expires.getTime() + seconds * 1000);
        document.cookie = escape(cookieName) + '=' + escape(cookieValue) + (expires ? ';expires=' + expires.toGMTString() : '') + (path ? ';path=' + path : '/') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
    },
    /*
     *功能：获取Cookie
     *name 必选项，cookie名称
     */
    getCookie: function (name) {
        var cookie_start = document.cookie.indexOf(name);
        var cookie_end = document.cookie.indexOf(";", cookie_start);
        return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
    },

    /*
     *功能：删除或清空Cookie
     *name 必选项，cookie名称
     */
    delCookie: function (name, value) {
        var value = arguments[1] ? arguments[1] : null;
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var val = this.getCookie(name);
        if (val != null) {
            document.cookie = name + '=' + value + ';expires=' + exp.toGMTString();
        }
    },

    isIE: function(ver){
        var b = document.createElement('b');
        b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->';
        return b.getElementsByTagName('i').length === 1;
    },

    is_weixin: function(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    },

    initApiUrl: function(api_url){
        if(UtilFunc.is_weixin()){
            return;
        }
        for(var key in api_url){
            if(api_url[key].indexOf("?") < 0){
                api_url[key] += '?_dt=' + Math.random();
            }
            api_url[key] = api_url[key] + '&openid=' + Base.openid + '&password=' + Base.password;
        }
    }
};


//对话框
var X = {};
X.dialog={
    //打开的对话框、提示框、选择框、消息框、加载框索引
    dbs:[],
    //打开对话框 ps:topic(对话框主题名称),width,notify
    //db[索引，宽度，高度，信息层，背景层，回调]
    open:function(content,ps){
        ps=$.init(ps,{topic:'',width:280,notify:null});
        var t=this,w=ps.width,bgi=X.zi(),di=X.zi(),db=[di,w],p=X.ps(),ww=p.width,wh=p.height,dl=$.round((ww-w)/2),dt=-60,s=new Text();
        if(dl<10)dl=10;
        if(content)s._($.replace(content,'#di#',di));
        db[3]=$.ce('div');
        db[3].addClass('db-bg');
        db[3].css('zIndex',bgi);
        db[3].attr('id','dialog-bg-'+di);
        db[4]=$.ce('div');
        db[4].addClass('db-wrap');
        db[4].css('zIndex',di);
        db[4].css('width',w+'px');
        db[4].css('left',dl+'px');
        //db[4].css('display','none');
        db[4].attr('id','dialog-'+di);
        db[4].html(s.ts());
        db[5]=ps.notify;
        X.body.append(db[3],db[4]);
        db[2]=db[4].height();
        dt=$.round((wh-db[2])/2+dt);
        if(dt<10)dt=10;
        db[4].css('top',dt+'px');
        db[4].show();
        t.dbs.push(db);
    },
    //提醒对话框 ps:title,msg,icon,width,btn(按钮名称),notify
    alert:function(msg,ps){
        ps=$.init(ps,{title:'',msg:msg,width:280,btn:'确定'});
        if(ps.width<180)ps.width=180;
        var t=this,s=new Text();
        if(ps.title){
            s._('<div class="db-title">')._(ps.title)._('</div>');
        }
        s._('<div class="db-content">')._(msg)._('</div>');
        s._('<div class="db-foot">');
        if(ps.cfm)
            t.addBtn(s,ps.btn1,2);
        if(ps.ensure){
            t.addBtn(s,ps.btn,1);
        }else{
            t.addBtn(s,ps.btn,0);
        }
        s._('</div>');
        t.open(s.ts(),ps);
    },
    //确认对话框 ps:title,msg,icon,width,btn(按钮名称),btn1(第二个按钮名称),notify
    confirm:function(msg,ps){
        ps=$.init(ps,{ensure:true,msg:msg,btn1:'取消'});
        ps.cfm=true;
        this.alert(msg,ps)
    },
    tips:function(msg, callback)    {
        clearTimeout(window.tipsTimer);
        var a = $('<div class="db-tip">' + msg + "</div>");
        $("body").append(a);
        window.tipsTimer = setTimeout(function() {
            $(".db-tip").remove();
            if(callback){
                callback();
            }
        }, 2000);
    },
    //添加按钮代码(对话框按钮)
    addBtn:function(s,name,nt){
        this.addButton(s,{id:'dialog-btn-#di#',name:name,click:'X.dialog.close(#di#,'+nt+');'});
    },
    //添加按钮代码 ps:id,name,css(按钮CSS),style,click(点击事件),effects(点击效果CSS),type(是按钮或者连接样式)
    addButton:function(s,ps){
        s._('<p');
        if(ps.id)
            s._(' id="')._(ps.id)._('"');
        if(ps.css)
            s._(' class="')._(ps.css)._('"');
        if(ps.style)
            s._(' style="')._(ps.style)._('"');
        if(ps.click)
            s._(' onclick="')._(ps.click)._('"');
        s._('>'+ps.name+'</p>');
    },
    //操作通知
    notify:function(di,nt){
        var db=this.get(di);
        if(db[5])db[5]($.no(nt)?0:nt);
    },
    //关闭对话框或提示框(0不关闭,1关闭,2关闭并关闭上级对话框)
    close:function(di,nt){
        var t=this,b,l,c=1,cn,cv;
        if($.no(nt))nt=0;
        if(!$.no(di)){
            b=t.get(di);
            if(b){
                if($.isN(di)){
                    if(b[5]){
                        if(nt != 0){
                            b[5](nt);
                            t.get(di,true);b[4].remove();b[3].remove();
                        }else{
                            b[5](nt,function(){	t.get(di,true);b[4].remove();b[3].remove();})
                        }
                    }else{
                        t.get(di,true);b[4].remove();b[3].remove();
                    }
                }
            }else{return;}
        }
        //关闭最后打开的对话框
//		l=t.dbs.length;
//		if(l>0)t.close(t.dbs[l-1][0],0);
    },
    //返回对话框
    get:function(di,del){
        var t=this,bs=t.dbs,b;
        for(var i=0;i<bs.length;i++){
            if(bs[i][0]==di){
                b=bs[i];
                if(del)
                    bs.splice(i,1);
                break;
            }
        }
        return b;
    }
};

X.valid = {
    isMobile:function(mobile){
//			return mobile&&/^1[3-9]\d{9}$/.test(mobile);
        return mobile&&/^1[3|5|8|7][0-9]\d{8}$/.test(mobile);
    },
    isEmail:function(email){
        return email&&/^[0-9a-zA-Z_\-]+@[0-9a-zA-Z_\-]+\.\w{1,5}(\.\w{1,5})?$/.test(email);
    },
    isBankCard:function(cardNumber){
        return cardNumber&&/^\d{16,30}$/.test(cardNumber);
    }
};


// rem 布局
//完全自适应，通过JS来控制。
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
        };

    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
