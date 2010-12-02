if (!sina) {
        var sina = {};
}

sina.info = {
        app: {
                consumer_key: "2123410449",
                consumer_secret: "397646f2c7d19fa44e7b517143987948",
                app_name: "微博天下",
                app_url: 'https://chrome.google.com/extensions/detail/dlnibcgilcbfohdalmandfokomeljkfc'
        },

        mode: {
                ssl: false,
                dev: false,
                debug: false,
                multi: false
        },

        version: {
                major: 3,
                minor: 0,
                revision: 0,
                toString: function() {
                        return this.major + '.' + this.minor + '.' + this.revision;
                }
        }
};

sina.urls = {
        request_url: "http://api.t.sina.com.cn/oauth/request_token",
        authorize_url: "http://api.t.sina.com.cn/oauth/authorize",
        access_url: "http://api.t.sina.com.cn/oauth/access_token",
        update_url: "http://api.t.sina.com.cn/statuses/update.json",
        share_url: "http://v.t.sina.com.cn/share/share.php"
};

sina.oauth = ChromeExOAuth.initBackgroundPage({
        'request_url': sina.urls.request_url,
        'authorize_url': sina.urls.authorize_url,
        'access_url': sina.urls.access_url,
        'consumer_key': sina.info.app.consumer_key,
        'consumer_secret': sina.info.app.consumer_secret,
        'scope': '',
        'app_name': sina.info.app.app_name
});

sina.send = function(data, tab) {
        var type = data.mediaType;
        var pageUrl = data.pageUrl;
        var srcUrl = data.srcUrl;
        var text = data.selectionText;

        var title = tab.title || '';
        var pUrl = tab.url || '';


        //未选择图片或者未选择文字，则默认为发送页面
        if (!type & ! text) {
                text = '我正在浏览：' + title;
        }

        //右键点击图片，未选中文字，则默认为转发图片
        if (type == 'image' && ! text) {
                text = '转发图片：' + title;
        }

        if (!sina.oauth.hasToken()) {
                sina.oauth.authorize(function() {
                        sina.sendStatus(text);
                });
        } else { //已经验证
                //sina.sendStatus(text);
                sina.popSendStatus(screen, document, encodeURIComponent, sina.info.app.app_name, sina.info.app.app_url, srcUrl, text + " | ", pageUrl, 'utf-8');
                //sendStatus(text);
        }
};

sina.onSend = function(resp, xhr) {
        alert('authened');
};

sina.sendStatus = function(content) {
        var url = sina.urls.update_url;
        var encode_content = encodeURIComponent(content);
        var request = {
                'method': 'post',
                'parameters': {
                        'status': encode_content
                }
        };
        sina.oauth.sendSignedRequest(url, sina.onSend, request);
};

sina.popSendStatus = function(screen, doc, comp, source, sourceUrl, srcUrl, content, pageUrl, encode) {
        //  alert("a="+screen+" ,b="+doc+", c="+comp+", source="+source+", srcUrl="+srcUrl+", sourceUrl="+sourceUrl+" ,content="+content+", encode="+encode);
        var updateUrl = sina.urls.share_url + "?";
        var url = pageUrl || doc.location;
        var params = ['url=', comp(url), '&title=', comp(content || doc.title), '&source=', comp(source), '&sourceUrl=', comp(sourceUrl), '&content=', encode || 'gb2312', '&pic=', comp(srcUrl || '')].join('');
        if (!window.open([updateUrl, params].join(''), 'mb', ['toolbar=0,status=0,resizable=1,width=440,height=430,left=', (screen.width - 440) / 2, ',top=', (screen.height - 430) / 2].join(''))) {
                url.href = [updateUrl, params].join('');
        }
};

