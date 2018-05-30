var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://' + config.service.serverHost + ':8080/category/all',
      data: {

      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var l = JSON.parse(res.data.result);
        console.log(l);
        var arry = new Array();
        for (var j = 0; j < l.length / 4; j++) {
          arry[j] = new Array();
        }
        var a = -1;
        var b;
        for (var i in l) {
          if (i % 4 == 0) {
            a++;
            b = 0;
            arry[a][b] = l[i];
          }
          else {
            b++
            arry[a][b] = l[i];
          }
        }
        that.setData({
          categories: arry
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