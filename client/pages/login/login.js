// //var WXBizDataCrypt = require('../../WXBizDataCrypt')
// //var appId = 'wx4f4bc4dec97d474b'
// var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
// var encryptedData =
//   'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM' +
//   'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS' +
//   '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+' +
//   '3hVbJSRgv+4lGOETKUQz6OYStslQ142d' +
//   'NCuabNPGBzlooOmB231qMM85d2/fV6Ch' +
//   'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6' +
//   '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw' +
//   'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn' +
//   '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs' +
//   '8LOddcQhULW4ucetDf96JcR3g0gfRK4P' +
//   'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB' +
//   '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns' +
//   '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd' +
//   'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV' +
//   'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG' +
//   '20f0a04COwfneQAGGwd5oa+T8yO5hzuy' +
//   'Db/XcxxmK01EpqOyuxINew=='
// var iv = 'r7BXXKkLb8qrSNn05n0qiA=='
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var bmap = require('../../libs/bmap-wx.min.js')
var wxMarkerData = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers:[],
    city:''
  },

  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  } ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxb04190e9d43c6c4e&secret=d7da7196da2801968ee093baac144900',
      data: {
        code: ''
      },
      success: function (res) {

        console.log('>>>>>'+res);
      }
    })
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: '79E437b14b41c5720a26e08c25063ad9'
    });
    var fail = function (data) {
      console.log(data)
    };
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code);
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxb04190e9d43c6c4e&secret=d7da7196da2801968ee093baac144900&js_code='+res.code+'&grant_type=authorization_code',
            data: {
              code: res.code
            },
            success: function (res) {
              
              console.log(res.data)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    wx.checkSession({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            console.log(res.userInfo)
          }
        })
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        wx.login() //重新登录
  }
})
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo']) {

          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                success: function (res) {
                  console.log(res.userInfo)
                }
              })
            }
          })
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
         
        }
      }
    })
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      console.log(wxMarkerData[0].title)
      console.log(wxMarkerData[1].title)
      console.log(wxMarkerData[2].title)
      that.setData({
        title: wxMarkerData[0].title
      });
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
      that.setData({
        title: wxMarkerData[0].title
      });
      that.setData({ city: data.originalData.results[0].city});
    }
    BMap.search({
      "query": '住宅',
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
    });
     // this.data.title = wxMarkerData[0].title;

  },
  // 用户登录示例
  login: function () {
    if (this.data.logged) return

    util.showBusy('正在登录')
    var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功')
          that.setData({
            userInfo: result,
            logged: true
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
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