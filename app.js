//app.js
const util = require('./utils/util.js');
const getUserInfomation = require('./api/getUserInfo.js');
util.ServerConfigInt();

App({
  onLaunch: function () {
    // 获取用户信息
    wx.login({
      success: function () {
        wx.getSetting({
          success: res => {
            if (!res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  util.dataStorage.Save("nickName", res.userInfo.nickName);
                  util.dataStorage.Save("avatarUrl", res.userInfo.avatarUrl);
                  
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          }
        })
      }
    });
  },
  globalData: {
    userInfo: null
  }
})