// pages/detail/detail.js
import api from '../../api/index';
let WxParse = require('../../wxParse/wxParse.js');
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
    api.getDetail({
      id: this.data.id
    }, res => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        var temp = WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
        that.setData({
          detail: res.data.data,
          article: temp
        });
    });
  },
  onReady: function() {
    this.getDetail();
  }
});