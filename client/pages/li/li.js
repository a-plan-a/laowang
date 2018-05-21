// pages/li/li.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    d:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var no = options.categoryno

    wx.request({
      url: 'http://127.0.0.1:8080/recommend/'+no+'',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var l = JSON.parse(res.data.result);
        that.setData({
          d: l
        })
      },
      fail: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})