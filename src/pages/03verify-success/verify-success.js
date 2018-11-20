// pages/chatbot-Success/chatbot-Success.js
Page({

  data: {
    user: {}
  },

  onLoad: function (options) {
    let self = this;
    wx.setNavigationBarTitle({
      title: 'Chat Bot',
    })
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('success', res.data);
        // this.data.user = res.data;
        self.setData({
          user: res.data
        });
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },

  goToChat: function (e) {
    wx.switchTab({
      url: '../chatlist/chatlist',
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})