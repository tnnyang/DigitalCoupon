// pages/mycard/mycard.js
const util = require('../../utils/util.js');
const sendRequestApi = require('../../api/sendRequestApi.js');
const getUserInfomation = require('../../api/getUserInfo.js');

Page({
  data: {
    cardList: [],
    total: 0,
    isShowPage: false,
    isShowMoreData: true
  },
  onLoad: function () {
    getUserInfomation.getOpenId().then(res => {
      let openId = util.dataStorage.Get("openId");
      let params = "";

      if (!openId){
        util.dataStorage.Save("openId", res.openId);
        params = {
          openId: res.openId
        }
        this.getCardList(params);
      }else{
        params = {
          openId: openId
        }
        this.getCardList(params);
      }
    });
  },
  getCardList(params){
    sendRequestApi.getMyCardListApi(params).then(res => {
      if (res.data.code == 200) {
        let { data: { data } } = res;

        for (let i = 0; i < data.length; i++) {
          data[i].end_time = data[i].end_time.replace(/-/g, "/").substr(2, 8);
          data[i].begin_time = data[i].begin_time.replace(/-/g, "/").substr(2, 8);
        }        

        this.setData({
          cardList: data,
          total: data.length,
          isShowPage: true,
          isShowMoreData: data.length < 1 ? false : true
        });

      }
    });
  }
})