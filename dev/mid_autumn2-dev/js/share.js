(function($, win, doc, wx){
	
	/**
	 * @param {String} [opt.signatureUrl] :  签名获取URL地址
	 * @param {Array}  [opt.apis] :  想要使用的API列表
	 * @param {Boolean}  [opt.debug] :  是否调试
	 */
	WeixinTools = function(opt){
		this.options = $.extend({}, {'debug' : true}, opt);
//		alert(JSON.stringify(this.options));
		if (this.options.signatureUrl && this.options.apis){
			this.init();
		}
	};
	
	WeixinTools.prototype = {
		init : function(){
			var self = this;
			$.get(self.options.signatureUrl, {'url' : encodeURIComponent(win.location.href)}, function(res){
				res = JSON.parse(res);
				if (!res.success){
					return;
				}
				wx.config({
				    debug: self.options.debug, 
				    appId: res.value.appId,
				    timestamp: res.value.timestamp,
				    nonceStr: res.value.noncestr,
				    signature: res.value.signature,
				    jsApiList: self.options.apis 
				});
			});
		},
		shareAppMessage:function(opt){
			wx.onMenuShareAppMessage({
				title: opt.title, // 分享标题
				desc: opt.desc, // 分享描述
				link:opt.link , // 分享链接
				imgUrl: opt.imgUrl, // 分享图标
				cancel: function () {
				   if(opt.cancelFn){
					   opt.cancelFn();
				   }
				},
				success: function () {
					// 用户确认分享后执行的回调函数
					if(opt.successFn){
						opt.successFn();
					}
				}
			});
		},
		shareTimeline:function(opt){
			wx.onMenuShareTimeline({
				title: opt.desc, // 分享标题
				link:opt.link , // 分享链接
				imgUrl: opt.imgUrl, // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
					if(opt.successFn){
						opt.successFn();
					}
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
					if(opt.cancelFn){
						opt.cancelFn();
					}
				}
			});
		}
	};
})($, window, document, wx);

