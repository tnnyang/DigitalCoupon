const util = require('../utils/util.js');
const Http = require('../utils/Http.js');
const config = require('./config.js');

let sendRequestApi = {
  //获取openId
  getUserOpenId: function (data) {
    let url = util.ServerConfig.request + config.pathGetOpenId;
    return new Promise((resolve, reject) => {
      Http(url, data).then(res => {
        resolve(res);
      })
    })
  },
  //创建卡券
  createCardApi: function (data){
    let url = util.ServerConfig.request + config.CardApi.pathAddCart;
    return new Promise((resolve, reject) => {
      Http(url, data).then(res => {
        resolve(res);
      })
    })
  },
  //获取HR卡券列表
  getHrCardListApi: function (data) {
    let url = util.ServerConfig.request + config.CardApi.pathGetCartList;
    return new Promise((resolve, reject) => {
      Http(url, data).then(res => {
        resolve(res);
      })
    })
  },
  //卡券发放记录
  getCardRecodrApi: function (data) {
    let url = util.ServerConfig.request + config.CardApi.pathCardRecord;
    return new Promise((resolve, reject) => {
      Http(url, data).then(res => {
        resolve(res);
      })
    })
  },
  //转赠卡券
  CardShareApi: function (data) {
    let url = util.ServerConfig.request + config.CardApi.pathCardShare;    
    return new Promise((resolve, reject) => {
      Http(url, data).then(res => {
        resolve(res);
      })
    })
  },
  //卡券兑换-快递
  ExchangeEmsApi: function (data) {
    let url = util.ServerConfig.request + config.CardApi.pathExchangeEms;
    return new Promise((resolve, reject) => {
      Http(url, data).then(res => {
        resolve(res);
      })
    })
  },
  //卡券兑换-微信红包
  RedEnvelopeApi: function (data) {
    let url = util.ServerConfig.request + config.CardApi.pathRedEnvelope;
    return new Promise((resolve, reject) => {
      Http(url, data).then(res => {
        resolve(res);
      })
    })
  },
  //领取卡券
  ReceiveCardApi: function (data) {
    let url = util.ServerConfig.request + config.CardApi.pathReceiveCard;
    return new Promise((resolve, reject) => {
      Http(url, data).then(res => {
        resolve(res);
      })
    })
  },
  //我的卡券详情
  getCardDetailApi: function (data) {
    let url = util.ServerConfig.request + config.CardApi.pathCardDetail;
    return new Promise((resolve, reject) => {      
      Http(url, data).then(res => {
        resolve(res);
      })
    })
  },
  //我的卡券列表
  getMyCardListApi: function (data) {
    let url = util.ServerConfig.request + config.CardApi.pathMyCardList;
    return new Promise((resolve, reject) => {
      Http(url, data).then(res => {
        resolve(res);
      })
    })
  },
  //设置数量
  SetAmountApi: function (data) {
    let url = util.ServerConfig.request + config.CardApi.pathSetAmount;
    return new Promise((resolve, reject) => {
      Http(url, data, "POST").then(res => {
        resolve(res);
      })
    })
  },
  //生成小程序二维码
  getQrCodeApi: function(data){
    let url = util.ServerConfig.request + config.CardApi.pathGetQrCode;
    return new Promise((resolve, reject) => {
      Http(url, data).then(res => {
        resolve(res);
      })
    })
  },
  //转赠领取卡券
  ShareReceiveCardApi: function (data) {
    let url = util.ServerConfig.request + config.CardApi.pathShareReceiveCard;
    return new Promise((resolve, reject) => {
      Http(url, data).then(res => {
        resolve(res);
      })
    })
  }
}

module.exports = sendRequestApi