// pages/setting/others/scroll-view/scroll-view.js
var order = ['red','yellow','blue','green','red','SlateGray','GoldEnrod']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView:'green',
    scrollTop:0
  },
  upper:function(e){
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap:function(e){
    //不断更新scroll-into-view属性的取值
    for(var i = 0;i<order.length;i++){
      if(order[i] === this.data.toView){
        this.setData({
          toView:order[i+1]
        })
        break
      }
    }
  },
  //不断更新scroll-top的取值
  tapMove:function(e){
    this.setData({
      scrollTop:this.data.scrollTop+10
    })
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

  }
})