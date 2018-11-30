// pages/setting/open-api/decrypted/decrypted.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onTap:function(e){
    wx.login({
      success:function(loginRes){
        wx.request({
          url: 'http://45.77.176.90/wxopen/wxDecryptUserInfo.php',
          data:{
            code:loginRes.code,
            encryptedData:e.detail.encryptedData,
            iv:e.detail.iv
          },
          success:function(res){
            console.log(res.data);
          }
        })
      }
    })
  }
})