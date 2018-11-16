class DBPost{
  constructor(url){
    this.storageKeyName='postList';
  }
  //得到全部文章信息
  getAllPostData(){
    var res =wx.getStorageSync(this.storageKeyName);
    if(!res){
      res = require('../data/data.js').postList;
      this.initPostList(res);
    }
    return res;
  }
  execSetStorageSync(data){
    wx.setStorageSync(this.storageKeyName,data);
  }
};
export{DBPost}