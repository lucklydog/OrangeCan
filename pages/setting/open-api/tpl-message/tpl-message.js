// pages/setting/open-api/tpl-message/tpl-message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"2018-11-30"
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
  bindDateChange:function(event){
    this.setDate({
      data:event.detail.value
    })
  },
  //点击submit提交按钮事件
  formSubmit:function(event){
    wx.login({
      success:function(loginRes){
        wx.request({
          url:'http://45.77.176.90/wxopen/wxTPLMessage.php?code='+loginRes.code,
          data:{
            formId:event.detail.formId,
            formData:event.detail.value
          },
          method:"POST",
          success:function(res){
            console.log(res.data);
          }
        })
      }
    })
  }
})