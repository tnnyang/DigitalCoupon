// pages/receive/receive.js
const util = require('../../utils/util.js');
const sendRequestApi = require('../../api/sendRequestApi.js');
const getUserInfomation = require('../../api/getUserInfo.js');
const app = getApp();

Page({
  data: {
    batchId: "",
    id: "",
    hrId: "",
    normalId: "",
    notGet: true,
    alreadyGet: false,
    isShowSuccess: true,
    getTips: "领取成功",
    isShowModel: true,
    failTips: "",
    openId: util.dataStorage.Get("openId"),
    nickName: util.dataStorage.Get("nickName"),
    faceUrl: util.dataStorage.Get("avatarUrl"),
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function (opts) {
    //保存用户openId
    getUserInfomation.getOpenId().then(res => {
      let openId = util.dataStorage.Get("openId");
      let params = "";

      if (!openId) {
        util.dataStorage.Save("openId", res.openId);
        this.setData({
          openId: res.openId
        });
      } else {
        this.setData({
          openId: openId
        });
      }
    });

    //获取用户信息
    this.getUserInfo();

    if (opts.batchId){
      this.setData({
        batchId: opts.batchId
      });
    }else if (opts.id) {
      this.setData({
        id: opts.id
      });
    }
  },
  // getUserInfo: function (e) {
  //   util.dataStorage.Save("nickName", e.detail.userInfo.nickName);
  //   util.dataStorage.Save("avatarUrl", e.detail.userInfo.avatarUrl);

  //   this.setData({
  //     hasUserInfo: true
  //   })

  //   app.globalData.userInfo = e.detail.userInfo;
  // },
  getUserInfo(){
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
  getCard(){
    if (this.data.batchId){
      let params = {
        openId: this.data.openId,
        batchId: this.data.batchId,
        nickname: this.data.nickName,
        faceurl: this.data.faceUrl
      }

      sendRequestApi.ReceiveCardApi(params).then(res => {
        if (res.data.code == 200) {
          this.setData({
            notGet: false,
            alreadyGet: true,
            isShowSuccess: false,
            getTips: res.data.message,
            hrId: res.data.data
          });
        }else{
          this.setData({
            isShowModel: false,
            failTips: res.data.message
          });
        }
      });
    } else if (this.data.id){
      let params = {
        openId: this.data.openId,
        id: this.data.id,
        nickName: this.data.nickName,
        faceUrl: this.data.faceUrl
      }

      sendRequestApi.ShareReceiveCardApi(params).then(res => {
        if (res.data.code == 200) {
          this.setData({
            notGet: false,
            alreadyGet: true,
            isShowSuccess: false,
            getTips: res.data.message
          });
        } else {
          this.setData({
            isShowModel: false,
            failTips: res.data.message
          });
        }
      });
    }
  },
  changeCard(){
    if (this.data.hrId) {
      wx.navigateTo({
        url: "/pages/cardDetails/details?id=" + this.data.hrId
      })
    } else if (this.data.id) {
      wx.navigateTo({
        url: "/pages/cardDetails/details?id=" + this.data.id
      })
    }
  },
  close(){
    this.setData({
      isShowModel: true
    });
  }
})