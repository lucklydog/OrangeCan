// pages/movie/movie.js
var util = require("../../util/util.js")
var app = getApp(); //获取app.js的数据
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheaterUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
    this.getMoviedListData(inTheaterUrl, "inTheaters", "正在热映");
    this.getMoviedListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMoviedListData(top250Url, "top250", "豆瓣Top250");
  },

  getMoviedListData: function(url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: "GET",
      header: {
        "content-type": "json"
      },
      success: function(res) {
        //console.log(res);
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function() {
        console.log(error)
      }
    })
  },

  processDoubanData:function(moviesDouban,settedKey,categoryTitle){
    var movies=[];
    //for 中的代码将所有豆瓣电影数据转化为我们想要的格式
    for(var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length>=6){
        //电影标题只取前面6个字符
        title = title.substring(0,6)+"...";
      }
      var temp = {
        stars:util.convertTostarsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp)
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle:categoryTitle,
      movies :movies
    }
    this.setData(readyData);
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

  }
})