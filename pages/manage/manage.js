// pages/manage/manage.js
const util = require('../../utils/util.js');
const sendRequestApi = require('../../api/sendRequestApi.js');
const getUserInfomation = require('../../api/getUserInfo.js');

Page({
  data: {
    circular: true,
    isShowPage: false,
    openId: util.dataStorage.Get("openId"),
    cardList: [],
    swiperIndex: 1,
    isShowTips: false
  },
  onReady() {
    this.dialog = this.selectComponent("#dialog");
  },
  onLoad(){
    getUserInfomation.getOpenId().then(res => {
      let openId = util.dataStorage.Get("openId");
      let params = "";

      if (!openId) {
        util.dataStorage.Save("openId", res.openId);
        params = {
          openId: res.openId
        }
        this.getCardList(params);
      } else {
        params = {
          openId: openId
        }
        this.getCardList(params);
      }
    });
  },
  getCardList(params){
    sendRequestApi.getHrCardListApi(params).then(res => {
      if (res.data.code == 200) {
        let { data: { data } } = res;

        let cardArr = [];
        for (let i = 0; i < data.length; i++) {
          let cardList = {
            name: "",
            qrCodeSrc: "",
            cardNum: "",
            remarks: "",
            actId: 0,
            batchId: "",
            surplusNum: 0,
            issue: 0,
            receive: 0,
            setNumber: 1,
            isSetNumber: true,
            isShare: false
          }

          cardArr.push(cardList);
          cardArr[i].name = data[i].name;
          cardArr[i].surplusNum = data[i].restCount;
          cardArr[i].issue = data[i].use_count;
          cardArr[i].receive = data[i].count;
          cardArr[i].actId = data[i].id;
        }

        this.setData({
          isShowPage: true,
          cardList: cardArr
        });
      } else if (res.data.code == 400) {
        this.setData({
          isShowTips: true
        });
      }
    });
  },
  showSetNum(e){
    let idx = e.currentTarget.dataset.index;
    let surplusNum = e.currentTarget.dataset.surplusnum;

    this.dialog.showDialog(idx, surplusNum);
  },  
  confirm(e){
    let value = e.detail;
    let cardNum = "cardList[" + value.index + "].cardNum";
    let remarks = "cardList[" + value.index + "].remarks";
    let qrCodeSrc = "cardList[" + value.index + "].qrCodeSrc";
    let batchId = "cardList[" + value.index + "].batchId";

    let params = {
      openId: this.data.openId,
      actId: this.data.cardList[value.index].actId,
      amount: value.setNumber,
      remark: value.remarks
    }

    wx.showLoading({
      title: "正在设置",
      mask: true
    });

    sendRequestApi.SetAmountApi(params).then(res => {
      let qrCodePath = "";
      if(res.data.code == 200){        
        this.setData({
          [cardNum]: value.setNumber + "张",
          [remarks]: value.remarks,
          [batchId]: res.data.data
        });

        qrCodePath = "/pages/receive/receive" + res.data.data;

        let data = {
          path: qrCodePath
        }

        sendRequestApi.getQrCodeApi(data).then(res => {
          wx.hideLoading();
          this.setData({
            [qrCodeSrc]: res.data
          });
        });
      }else{
        wx.showModal({
          title: '温馨提示',
          content: res.data.message
        })
      }
    });
  },
  swiperChange(e){
    let idx = e.detail.current;
    let isShare = "cardList[" + idx + "].isShare";
    this.setData({
      swiperIndex: idx + 1,
      [isShare]: true
    });
  },
  onShareAppMessage(e) {
    // let remarks = "";
    let batchId = "";
    if (e.target){
      let idx = e.target.dataset.index;
      // remarks = this.data.cardList[idx].remarks;
      batchId = this.data.cardList[idx].batchId;
    } else if (this.data.swiperIndex){
      let idx = this.data.swiperIndex - 1;
      // remarks = this.data.cardList[idx].remarks;
      batchId = this.data.cardList[idx].batchId;
    }
    
    return {
      title: "",
      imageUrl: "",
      path: '/pages/receive/receive' + batchId
    }
  }
})