// pages/isssueRecord/record.js
const util = require('../../utils/util.js');
const sendRequestApi = require('../../api/sendRequestApi.js');
let listArr = [];

Page({
  data: {
    recordList: [],
    isShowPage: false,
    isShow: true,
    dialogAvatar: "",
    dialogName: "",
    dialogQrCode: "",
    dialogCardNum: 0,
    batchId: "",
    pageIndex: 1,
    pageSize: 10,
    hasNextPage: true
  },
  onLoad(opts){
    let params = {
      openId: util.dataStorage.Get("openId"),
      actId: opts.actId,
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize
    }

    this.setData({
      actId: opts.actId
    });

    listArr = [];

    this.getList(params);
  },
  onReachBottom: function () {
    let pageIndex = this.data.pageIndex;
    this.setData({
      pageIndex: pageIndex + 1
    });
    pageIndex++;

    let params = {
      openId: util.dataStorage.Get("openId"),
      actId: this.data.actId,
      pageIndex: pageIndex,
      pageSize: this.data.pageSize
    }

    if (this.data.hasNextPage) {
      wx.showLoading({
        title: "加载中"
      });
      this.getList(params);
    }
  },
  getList: function (params) {
    sendRequestApi.getCardRecodrApi(params).then(res => {
      if (res.data.code == 200) {
        wx.hideLoading();

        let { data: { data: { hasNextPage, list } } } = res;
        for (var i in list) {
          listArr.push(list[i]);
        }

        this.setData({
          isShowPage: true,
          recordList: listArr
        });

        if (!hasNextPage) {
          this.setData({
            hasNextPage: false
          });
        }
      }
    });
  },
  share(e){
    let idx = e.currentTarget.dataset.index;
    let dialogAvatar = this.data.recordList[idx].detail_img;
    let dialogName = this.data.recordList[idx].user_nickname;
    let dialogCardNum = this.data.recordList[idx].num;
    let batchId = this.data.recordList[idx].batch_id;

    this.setData({
      batchId
    });

    let data = {
      path: "/pages/receive/receive?batchId=" + batchId
    }

    sendRequestApi.getQrCodeApi(data).then(res => {
      this.setData({
        dialogQrCode: res.data
      });
    });

    this.setData({
      isShow: false,
      dialogAvatar,
      dialogName,
      dialogCardNum
    })
  },
  close(){
    this.setData({
      isShow: true
    })
  },
  onShareAppMessage(){
    this.setData({
      isShow: true
    })

    return {
      imageUrl: "",
      path: '/pages/receive/receive?batchId=' + this.data.batchId
    }
  }
})