var Base={openid:"openid1",password:"csj150kg"},API_BASE="/r/",AjaxFunc={getAction:function(e){if(e.data)for(var t in e.data)e.url+="&"+t+"="+e.data[t];e.alertFalse=e.alertFalse||"yes";var i={url:e.url,type:"GET",contentType:"application/json",dataType:"json",timeout:3e4,success:function(t){t&&(t.success||t.message&&"yes"==e.alertFalse&&X.dialog.tips(t.message),e.callback&&e.callback(t))}};$.ajax(i)},saveAction:function(e){e.alertFalse=e.alertFalse||"yes";var t={url:e.url,type:e.method||"POST",data:JSON.stringify(e.data),contentType:"application/json",dataType:"json",timeout:3e4,success:function(t){t&&(t.success||t.message&&"yes"==e.alertFalse&&X.dialog.tips(t.message),e.callback&&e.callback(t))}};$.ajax(t)}},UtilFunc={getQueryString:function(){for(var e=location.search.match(new RegExp("[?&][^?&]+=[^?&]+","g")),t=0;t<e.length;t++)e[t]=e[t].substring(1);return e},getQueryStringByName:function(e){var t=location.search.match(new RegExp("[?&]"+e+"=([^&]+)","i"));return null==t||t.length<1?"":t[1]},setCookie:function(e,t,i,n,a,o){var s=new Date,i=arguments[2]?arguments[2]:604800;s.setTime(s.getTime()+1e3*i),document.cookie=escape(e)+"="+escape(t)+(s?";expires="+s.toGMTString():"")+(n?";path="+n:"/")+(a?";domain="+a:"")+(o?";secure":"")},getCookie:function(e){var t=document.cookie.indexOf(e),i=document.cookie.indexOf(";",t);return-1==t?"":unescape(document.cookie.substring(t+e.length+1,i>t?i:document.cookie.length))},delCookie:function(e,t){var t=arguments[1]?arguments[1]:null,i=new Date;i.setTime(i.getTime()-1);var n=this.getCookie(e);null!=n&&(document.cookie=e+"="+t+";expires="+i.toGMTString())},isIE:function(e){var t=document.createElement("b");return t.innerHTML="<!--[if IE "+e+"]><i></i><![endif]-->",1===t.getElementsByTagName("i").length},is_weixin:function(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)?!0:!1},initApiUrl:function(e){if(!UtilFunc.is_weixin())for(var t in e)e[t].indexOf("?")<0&&(e[t]+="?_dt="+Math.random()),e[t]=e[t]+"&openid="+Base.openid+"&password="+Base.password}},X={};X.dialog={dbs:[],open:function(e,t){t=$.init(t,{topic:"",width:280,notify:null});var i=this,n=t.width,a=X.zi(),o=X.zi(),s=[o,n],d=X.ps(),r=d.width,c=d.height,l=$.round((r-n)/2),u=-60,m=new Text;10>l&&(l=10),e&&m._($.replace(e,"#di#",o)),s[3]=$.ce("div"),s[3].addClass("db-bg"),s[3].css("zIndex",a),s[3].attr("id","dialog-bg-"+o),s[4]=$.ce("div"),s[4].addClass("db-wrap"),s[4].css("zIndex",o),s[4].css("width",n+"px"),s[4].css("left",l+"px"),s[4].attr("id","dialog-"+o),s[4].html(m.ts()),s[5]=t.notify,X.body.append(s[3],s[4]),s[2]=s[4].height(),u=$.round((c-s[2])/2+u),10>u&&(u=10),s[4].css("top",u+"px"),s[4].show(),i.dbs.push(s)},alert:function(e,t){t=$.init(t,{title:"",msg:e,width:280,btn:"确定"}),t.width<180&&(t.width=180);var i=this,n=new Text;t.title&&n._('<div class="db-title">')._(t.title)._("</div>"),n._('<div class="db-content">')._(e)._("</div>"),n._('<div class="db-foot">'),t.cfm&&i.addBtn(n,t.btn1,2),t.ensure?i.addBtn(n,t.btn,1):i.addBtn(n,t.btn,0),n._("</div>"),i.open(n.ts(),t)},confirm:function(e,t){t=$.init(t,{ensure:!0,msg:e,btn1:"取消"}),t.cfm=!0,this.alert(e,t)},tips:function(e,t){clearTimeout(window.tipsTimer);var i=$('<div class="db-tip">'+e+"</div>");$("body").append(i),window.tipsTimer=setTimeout(function(){$(".db-tip").remove(),t&&t()},2e3)},tips2:function(e,t){clearTimeout(window.tipsTimer);var i=$('<div class="db-tip">'+e+"</div>");$("body").append(i),window.tipsTimer=setTimeout(function(){$(".db-tip").remove(),t&&t()},2e3)},addBtn:function(e,t,i){this.addButton(e,{id:"dialog-btn-#di#",name:t,click:"X.dialog.close(#di#,"+i+");"})},addButton:function(e,t){e._("<p"),t.id&&e._(' id="')._(t.id)._('"'),t.css&&e._(' class="')._(t.css)._('"'),t.style&&e._(' style="')._(t.style)._('"'),t.click&&e._(' onclick="')._(t.click)._('"'),e._(">"+t.name+"</p>")},notify:function(e,t){var i=this.get(e);i[5]&&i[5]($.no(t)?0:t)},close:function(e,t){var i,n=this;if($.no(t)&&(t=0),!$.no(e)){if(i=n.get(e),!i)return;$.isN(e)&&(i[5]?0!=t?(i[5](t),n.get(e,!0),i[4].remove(),i[3].remove()):i[5](t,function(){n.get(e,!0),i[4].remove(),i[3].remove()}):(n.get(e,!0),i[4].remove(),i[3].remove()))}},get:function(e,t){for(var i,n=this,a=n.dbs,o=0;o<a.length;o++)if(a[o][0]==e){i=a[o],t&&a.splice(o,1);break}return i}},X.valid={isMobile:function(e){return e&&/^1[3|5|8|7][0-9]\d{8}$/.test(e)},isEmail:function(e){return e&&/^[0-9a-zA-Z_\-]+@[0-9a-zA-Z_\-]+\.\w{1,5}(\.\w{1,5})?$/.test(e)},isBankCard:function(e){return e&&/^\d{16,30}$/.test(e)}},function(e,t){var i=e.documentElement,n="orientationchange"in window?"orientationchange":"resize",a=function(){var e=i.clientWidth;e&&(i.style.fontSize=100*(e/320)+"px")};e.addEventListener&&(t.addEventListener(n,a,!1),e.addEventListener("DOMContentLoaded",a,!1))}(document,window);