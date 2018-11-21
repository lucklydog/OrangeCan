// pages/posts/post-detail/post-detail.js
import {
  DBPost
} from '../../../db/DBPost.js'; //利用ES6版本,必须用相对路径才可以显示内容

var app = getApp();
console.log(app)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.id;
    this.dbPost = new DBPost(postId);
    this.postData = this.dbPost.getPostItemById().data;
    this.setData({
      post: this.postData
    })
    this.addReadingTimes();
    this.setMusicMonitor();
    this.initMusicStatus();
    this.setAniation();
  },
  //创建一个动画
  setAniation:function(){
    var animationUp = wx.createAnimation({
      timingFunction:'ease-in-out'
    })
    this.animationUp = animationUp
  },
//增加阅读数
  addReadingTimes: function () {
    this.dbPost.addReadingTimes();
  },
  //当音乐播放停止时，图片变化
  setMusicMonitor: function() {
    var that = this;
    wx.onBackgroundAudioStop(
      function() {
        that.setData({
          isPlayingMusic: false
        })
        app.globalData.g_isPlayingMusic = false;
      }
    );
    wx.onBackgroundAudioPlay(
      function(event) {
        //只处理当前页面的音乐播放
        if (app.globalData.g_currentMusicPostId == that.postData.postId) {
          that.setData({
            isPlayingMusic: true
          })
        }
        app.globalData.g_isPlayingMusic = true;
      }
    );
    wx.onBackgroundAudioPause(
      function() {
        //只处理当前页面的音乐暂停
        if (app.globalData.g_currentMusicPostId == that.postData.postId) {
          that.setData({
            isPlayingMusic: false
          })
        }
        app.globalData.g_isPlayingMusic = false
      }
    )
  },

  //初始化音乐播放图标
  initMusicStatus() {
    var currentPostId = this.postData.postId;
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId == currentPostId) {
      this.setData({
        isPlayingMusic: true
      })
    } else {
      this.setData({
        isPlayingMusic: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.postData.title
    })
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
  onUnload: function() {},

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
    return{
      title:this.postData.title,
      desc:this.postData.content,
      path:"/pages/posts/post-detail/post-detail"
    }
  },
  //点击收藏文章按钮
  onCollectionTap: function(event) {
    //dbPost对象已经在onload中实例化了，无需再次实例化
    var newData = this.dbPost.collect();
    //重新绑定数据，注意，不要将整个newData全部作为setData的参数，应当有选择的更新部分数据
    this.setData({
      'post.collectionStatus': newData.collectionStatus,
      'post.collectionNum': newData.collectionNum
    })
    wx.showToast({
      title: newData.collectionStatus ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: false
    })
  },
  onUpTap: function(event) {
    var newData = this.dbPost.up();
    this.setData({
      'post.upStatus': newData.upStatus,
      'post.upNum': newData.upNum
    });
    //动画调用函数
    this.animationUp.scale(2).step();
    this.setData({
      animationUp:this.animationUp.export()
    });
    setTimeout(function(){
      this.animationUp.scale(1).step();
      this.setData({
        animationUp:this.animationUp.export()
      })
    }.bind(this),300);

    wx.showToast({
      title: newData.upStatus ? "點贊成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: false
    });
  },
  onCommentTap: function(event) {
    var id = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../post-comment/post-comment?id=' + id
    })
  },
  
  //切换音乐
  onMusicTap: function(event) {
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.postData.music.url,
        title: this.postData.music.title,
        coverImgUrl: this.postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentMusicPostId = this.postData.postId;
    }
  }
})