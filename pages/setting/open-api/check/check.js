// pages/setting/open-api/check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onTap: function(e) {
    wx.login({
      success: function(loginRes) {
        console.log(loginRes.code);
        wx.request({
          url: 'http://45.77.176.90/wxopen/wxCheckUserInfo.php',
          data: {
            code: loginRes.code,
            signature: e.detail.signature,
            rawData: e.detail.rawData
          },
          success: function(res) {
            console.log(res.data);
          }
        })
      }
    })
  },



})