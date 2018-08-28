const util = require('./util.js');
let DigitalCouponHttp = function(url, params = {}, method = "GET") {
  let data = "undefined";
  let requestUrl = "";
  
  if (method == "GET") {
    requestUrl = url + "?" + util.objToUrlParams(params);
  } else if (method == "POST") {
    data = params;
    requestUrl = url;
  }
  
  wx.showNavigationBarLoading();
  console.log("Request---" + requestUrl +"---start");
  return new Promise((resolve, reject) => {
    wx.request({
      url: requestUrl,
      data: data,
      method: method,
      success: res => {
        wx.hideNavigationBarLoading();
        console.log("Request---" + requestUrl + "---end");
        resolve(res);     
      },
      fail: error => {
        reject(error);
      }
    });
  });  
}

module.exports = DigitalCouponHttp