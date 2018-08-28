const util = require('../utils/util.js');
const sendRequestApi = require('./sendRequestApi.js');

let getUserInfomation = {
  //微信自动登录
  getOpenId: function () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          let data = {
            js_code: res.code
          }

          sendRequestApi.getUserOpenId(data).then(res => {
            if (res.data.code = 200) {
              resolve(res.data.data);
            }
          });
        },
        fail: res => {
          reject(res);
        }
      })
    });
        
  }
}

module.exports = getUserInfomation