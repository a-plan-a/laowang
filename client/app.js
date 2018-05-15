//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
      console.log("app");
        qcloud.setLoginUrl(config.service.loginUrl)
    }
})