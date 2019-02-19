var $ = require('jquery');

module.exports = {
    init: function() {
        // 当前页面访问路径
        var url = location.href.split('#')[0].toString();
        var getUrl = 'http://game.quantify.site/activity/wechat/getsignature'; // ajax请求路径

        $.get(getUrl,
            {"url": url}).done(function (data) {
            // 注意这里的url，一定要这样写，也就是动态获取，千万不要写死，不然也不会成功的。链接前缀要和安全域名一致
            console.log(data);
            if (data.code == 1) {
                var wxInfo = data.wxInfo;
                if (wxInfo.signature != null) {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: wxInfo.appId, // 必填，公众号的唯一标识
                        timestamp: wxInfo.timestamp, // 必填，生成签名的时间戳
                        nonceStr: wxInfo.nonceStr, // 必填，生成签名的随机串
                        signature: wxInfo.signature,// 必填，签名，见附录1
                        jsApiList: [
                            'onMenuShareTimeline', 'onMenuShareAppMessage'
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                }
            }
        }).fail(function (msg) {
            console.log("error:" + msg);
        });

        var fenxiangJson_data = {
            title: document.title, // 分享标题
            desc: '卡尔史托斯2019My Benefits!', // 分享描述
            link: 'http://karlstorz.quantify.site', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://karlstorz.quantify.site/images/favicon.png', // 分享图标
            success: function () {
                // 设置成功
            }
        };
        wx.ready(function () {
            wx.onMenuShareTimeline(fenxiangJson_data);        // 分享到微信朋友圈
            wx.onMenuShareAppMessage(fenxiangJson_data);            // 分享给微信朋友
            wx.error(function (res) {
                //alert(res.errMsg);
            });
        });
    }
}