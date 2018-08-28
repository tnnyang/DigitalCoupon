let apiConfig = {
  //获取openId
  pathGetOpenId: "/act/card/getOpneId",
  //卡券API
  CardApi: {
    pathAddCart: "/act/card/addCard",
    pathGetCartList: "/act/card/getCardList",
    pathCardRecord: "/act/card/take/Record",
    pathCardShare: "/act/card/take/card_share",
    pathExchangeEms: "/act/card/take/exchange_ems",
    pathRedEnvelope: "/act/card/take/exchange_red",
    pathReceiveCard: "/act/card/take/getCardDo",
    pathCardDetail: "/act/card/take/getMyCardDetail",
    pathMyCardList: "/act/card/take/getMyCardList",
    pathSetAmount: "/act/card/take/setAmount",
    pathShareReceiveCard: "/act/card/take/share_getCardDo",
    pathGetQrCode: "/wechat/createWxaqrcode"
  },
}

module.exports = apiConfig