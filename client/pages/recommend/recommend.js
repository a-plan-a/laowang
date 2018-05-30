var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: [],
    id:''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var id=options.id;
    console.log(">>>>>>>"+id);
    var that=this;

    that.setData({
      id:id
    });

    console.log(">>>>>>>" + this.data.id);
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
  ,
  // 上传图片接口
  doUpload: function () {
    var that = this;
    var i = 0;
    var imgs = [];

    // 选择图片
    wx.chooseImage({
      count: 4,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        for (var index in res.tempFilePaths) {
          var filePath = res.tempFilePaths[index];
          console.log("filePath:" + filePath);
          // 上传图片
          console.log("filePath:" + "上传图片" + config.service.uploadUrl);
          wx.uploadFile({
            url: config.service.uploadUrl,
            filePath: filePath,
            name: 'file',
            success: function (res) {
              var j = i + 1;
              util.showSuccess('第' + j + '张图片上传成功')
              console.log(res)
              res = JSON.parse(res.data)
              console.log(res)
              imgs[i] = res.data.imgUrl
              that.setData({
                imgUrl: imgs
              })
              i++
            },
            fail: function (e) {
              util.showModel('上传图片失败')
            }
          })
        }
      },
      fail: function (e) {
        console.error(e)
      }
    })
  },

  // 预览图片
  previewImg: function () {
    wx.previewImage({
      current: this.data.imgUrl,
      urls: [this.data.imgUrl]
    })
  }
  ,
  formSubmit: function (e) {
    var d = e.detail.value;
    console.log(d)
    wx.request({
      url: 'http://' + config.service.serverHost+':8080/recommend/insert',
      data: {
        d
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var status;
        if (res.data.status == 'success') {
            status='推荐成功';
        }
        else {
          status ='推荐失败';
        }
        wx.showToast({
          title: status,
          icon: 'success',
          duration: 2000
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
})