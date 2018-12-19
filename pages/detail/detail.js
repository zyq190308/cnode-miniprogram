// pages/detail/detail.js
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    id: '',
    detail: {},
    article: ''
  },
  onLoad: function(options) {
    this.setData({ 
      id: options.id,
    });
  },
  getDetail() {
    let that = this;
    let url = `https://cnodejs.org/api/v1/topic/${this.data.id}`;
    wx.request({
      url: url,
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        var temp = WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
        that.setData({
          detail: res.data.data,
          article: temp
        });
      }
    });
  },
  onReady: function() {
    this.getDetail();
  }
});