/**
 * Created by zhouyc on 2015/9/14.
 */
var PreLoad = (function($){
    function PreLoad(){
        this.traceDebug = false;
        this.TYPE_IMAGE = 'image';
        this.TYPE_JS = 'js';
        this.TYPE_SOUND = 'sound';
    }
    PreLoad.prototype = {
        load : function (l, u, c) {
            var s = this;
            if (!l || l.length == 0) {
                c([]);
                return;
            }
            s.list = l, s.onupdate = u, s.oncomplete = c;
            s.loader = s, s.index = 0, s.loadIndex = 0, s.result = [], s.lresult = [];
            s.loadInit();
        },
        loadInit : function () {
            var s = this;
            if(s.index >= s.list.length){
                return;
            }
            s.loadIndex = 0;
            s.loadStart();
        },
        loadStart : function () {
            var s = this, d;
            if (s.loadIndex >= s.list.length) {
                return;
            }
            d = s.list[s.loadIndex];

            $.ajax({
                url: s.url(d.path),
                success: function(){
                    s.loadComplete();
                }
            });
            s.loadIndex++;
            s.loadStart();
        },
        loadComplete : function (e) {
            var s = this;
            s.index++;
            if (s.onupdate) {
                s.onupdate(Math.floor(s.index * 100 / s.list.length));
            }
            if (s.index >= s.list.length) {
                s.loader = null;
                var r = s.result;
                s.oncomplete(r);
            }
        },
        url : function (u) {
            if (!PreLoad.traceDebug) {
                return u;
            }
            return u + (u.indexOf('?') >= 0 ? '&' : '?') + 't=' + (new Date()).getTime();
        }
    };
    PreLoad.load = function(l, u, c){
        var loadObj = new PreLoad();
        loadObj.load(l, u, c);
    };
    return PreLoad;
})($);