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
    api.getDetail({
      id: this.data.id
    }).then(res => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        let temp = WxParse.wxParse('article', 'html', res.data.data.content, this, 5);
        this.setData({
          detail: res.data.data,
          article: temp
        });
    });
  },
  onReady: function() {
    this.getDetail();
  }
});