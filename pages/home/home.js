// pages/home/home.js
Page({
  data: {
    tabs: [{
      name: '全部',
      tab: 'all'
    },{
      name: '精华',
      tab: 'good'
    },{
      name: '分享',
      tab: 'share'
    },{
      name: '问答',
      tab: 'ask'
    },{
      name: '招聘',
      tab: 'job'
    }],
    params: {
      active: 'all',
      page: 1,
      limit: 20
    },
    articles: [],
    type: 'new'//new新数据 more更多
  },
  onReady: function () {
    this.getArticle();
  },
  jump(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` });
  },
  getArticle() {
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    let url = `https://cnodejs.org/api/v1/topics?page=${this.data.params.page}&limit=${this.data.params.limit}&tab=${this.data.params.active}`;
    wx.request({
      url: url,
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if(that.data.type === 'new') {
          that.setData({
            articles: res.data.data
          });
        }else {
          that.setData({
            articles: that.data.articles.concat(res.data.data)
          });
        }
      }
    });
  },
  changeTab(e) {
    let tab = e.currentTarget.dataset.tab;
    this.setData({
      articles: [],
      ['params.active']: tab,
      ['params.page']: 1
    });
    this.getArticle();
  },
  onPullDownRefresh: function () {
    this.setData({
      type: 'new'
    });
    this.getArticle();
  },
  onReachBottom: function () {
    this.setData({
      type: 'more',
      ['params.page']: this.data.params.page + 1
    });
    this.getArticle();
  }
});