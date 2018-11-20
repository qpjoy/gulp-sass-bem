// pages/authenticate/authenticate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      // title: that.data.mername
      title: 'One Chat'
    })

    wx.setNavigationBarColor({
      frontColor: '#000000', // 下拉背景字体、loading 图的样式为dark
      backgroundColor: '#ffffff',
      animation: {}
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  setNavigationBarTitle: function () {
    wx.setNavigationBarTitle({
      title: '我是通过API设置的NavigationBarTitle'
    })
  },

  showNavigationBarLoading: function () {
    wx.showNavigationBarLoading()
  },

  hiddenNavigationBarLoading: function () {
    wx.hideNavigationBarLoading()
  },


  navigateTo: function () {
    wx.navigateTo({
      //传递参数方式向get请求拼接参数一样
      url: file + '?phone=18939571&password=1992',
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  redirectTo: function() {
    wx.redirectTo({
      url: '',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  navigateBack: function () {
    wx.navigateBack()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})