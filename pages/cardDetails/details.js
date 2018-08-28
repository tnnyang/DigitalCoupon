// pages/cardDetails/details.js
const util = require('../../utils/util.js');
const sendRequestApi = require('../../api/sendRequestApi.js');

Page({
  data: {
    isShowPage: false,
    cardDetail: {},
    date:"",
    isShowAddress: true,
    realChangeSuccess: true,
    shareCard: true,
    changeCash: true,
    changeCashSuccess: true,
    id: "",
    openId: util.dataStorage.Get("openId"),
    emsName: "",
    emsPhone: "",
    emsAddress: "",
    
  },
  onLoad(opts){
    let params = {
      id: opts.id
    }

    sendRequestApi.getCardDetailApi(params).then(res => {
      if(res.data.code == 200){
        let date = res.data.data.end_time.substr(0, 10);

        this.setData({
          cardDetail: res.data.data,
          date,
          id: opts.id,
          isShowPage: true
        });

        util.dataStorage.Save("id", opts.id);
      }
    });
  },
  onShow(){
    this.setData({
      isShowAddress: true,
      realChangeSuccess: true,
      changeCash: true,
      changeCashSuccess: true,
      shareCard: true
    });
  },
  choiceGift(){
    this.setData({
      isShowAddress: false
    });
  },
  closeAddress(){
    this.setData({
      isShowAddress: true,
      emsName: "",
      emsPhone: "",
      emsAddress: ""
    });
  },
  setName(e){
    this.setData({
      emsName: e.detail.value
    });
  },
  setTel(e) {
    this.setData({
      emsPhone: e.detail.value
    });
  },
  setAddress(e) {
    this.setData({
      emsAddress: e.detail.value
    });
  },
  //兑换实物
  confirmChange(){
    let emsName = this.data.emsName;
    let emsPhone = this.data.emsPhone;
    let emsAddress = this.data.emsAddress;    

    if (emsName.length < 1){
      util.showToast("请输入收货人姓名！");
      return false;
    } else if (emsPhone.length < 1){
      util.showToast("请输入手机号码！");
      return false;
    } else if (!emsPhone.match("^((13[0-9])|(14[0-9])|(15[0|1|2|3|5|6|7|8|9])|(17[0-9])|18[0-9]|19[0-9])\\d{8}|(170\\d{8})$")) {
      util.showToast("手机号格式错误！");
      return false;
    } else if (emsAddress.length < 1) {
      util.showToast("请输入收货地址！");
      return false;
    }else{
      let params = {
        id: this.data.id,
        openId: this.data.openId,
        emsName,
        emsPhone,
        emsAddress
      }

      sendRequestApi.ExchangeEmsApi(params).then(res => {
        if(res.data.code == 200){
          this.setData({
            isShowAddress: true,
            realChangeSuccess: false
          });
        }        
      });
    }    
  },
  closeRealChangeSuccess(){
    wx.navigateTo({
      url: "/pages/cardDetails/details?id=" + util.dataStorage.Get("id")
    })
  },
  choiceFriend(){
    this.setData({
      shareCard: false
    });
  },
  closeShareCard(){
    this.setData({
      shareCard: true
    });
  },
  //转赠
  confirmShareCard(){
    let params = {
      id: this.data.id,
      openId: this.data.openId
    }

    this.setData({
      shareCard: true
    });

    sendRequestApi.CardShareApi(params).then(res => {
      if(res.data.code == 200){
        this.setData({
          shareCard: true,

        });
      }      
    });
  },
  choiceCash(){
    this.setData({
      changeCash: false
    });
  },
  closeChangeCash(){
    this.setData({
      changeCash: true
    });
  },
  //兑换现金
  confirmChangeCash(){  
    let params = {
      id: this.data.id,
      openId: this.data.openId
    }

    this.setData({
      changeCash: true,
      changeCashSuccess: false
    });

    sendRequestApi.RedEnvelopeApi(params).then(res => {
      if(res.data.code == 200){
        this.setData({
          changeCash: true,
          changeCashSuccess: false
        });
      }      
    });
  },
  copy(){
    wx.setClipboardData({
      data: this.data.cardDetail.emsNo,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data);
          }
        })
      }
    })
  },
  onShareAppMessage(){
    return {
      path: '/pages/receive/receive?id=' + this.data.id
    }
  }
})