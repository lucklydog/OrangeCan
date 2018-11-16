var dataObj = require("data/totalData.js")
App({
  onLaunch: function() {
    /**异步方式
     * wx.setStorage({
      key: 'postList',
      data: dataObj.postList,
      success:function(res){
        //success
      },
      fail:function(){

      }
      complete:function(){

      }
    }) 
    */
    //同步方式
    var storageData = wx.getStorageSync('postList');//获取指定key的缓存内容
    if(!storageData){
      var dataObj = require("data/totalData.js");
      wx.clearStorageSync();//先清除所有缓存数据
      wx.setStorageSync('postList', dataObj.postList);//重新读取设置初始化数据
    }
    
  }
})