// pages/setting/setting.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cache: [{
      iconurl: "/images/icon/wx_app_clear.png",
      title: "缓存清理",
      tap: "clearCache"
    }],
    device: [{
        iconurl: "/images/icon/wx_app_cellphone.png",
        id :1,
        title: "系统信息",
        tap: "showSystemInfo"
      },
      {
        iconurl: "/images/icon/wx_app_network.png",
        id :2,
        title: "网络状态",
        tap: "showNetWork"
      },
      {
        iconurl: "/images/icon/wx_app_location.png",
        id:3,
        title: "地图显示",
        tap: "showMap"
      },
      {
        iconurl: "/images/icon/wx_app_compass.png",
        id :4,
        title: "指南针",
        tap: "showCompass"
      },
      {
        iconurl: "/images/icon/wx_app_lonlat.png",
        id :5,
        title: "当前速度、位置",
        tap: "showLanLat"
      },
      {
        iconurl: "/images/icon/wx_app_shake.png",
        id :6,
        title: "摇一摇",
        tap: "shake"
      },
      {
        iconurl: "/images/icon/wx_app_scan.png",
        id :7,
        title: "二维码",
        tap: "scanQRCode"
      },
    ],
    api: [{
        iconurl: "/images/icon/wx_app_list.png",
        title: "下载pdf、word文档",
        tap: "downloadDocumentList"
      },
      {
        iconurl: "",
        title: "用户登录",
        tap: "login"
      },
      {
        iconurl: "",
        title: "校验用户信息",
        tap: "check"
      },
      {
        iconurl: "",
        title: "获取用户加密信息",
        tap: "decrypted"
      },
      {
        iconurl: "",
        title: "模板消息",
        tap: "tplMessage"
      },
      {
        iconurl: "",
        title: "微信支付",
        tap: "wxPay"
      },
    ],
    others: [{
        iconurl: "",
        title: "wx:keys示例",
        tap: "showWxKeyDemo"
      },
      {
        iconurl: "",
        title: "scroll-view高级用法演示",
        tap: 'showScrollViewDemo'
      },
    ],
    compassVal: 0,
    compassHidden: true,
    shakeInfo: {
      gravityModalHidden: true,
      num: 0,
      enabled: false
    },
    shakeData: {
      x: 0,
      y: 0,
      z: 0
    }
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

  //显示模态窗口
  showModal: function(title, content, callback) {
    wx.showModal({
      title: title,
      content: content,
      confirmColor: "#1F4BA5",
      cancelColor: "#7F8389",
      success: function(res) {
        if (res.confirm) {
          callback && callback();
        }
      }
    })
  },
  //缓存清理
  clearCache: function() {
    this.showModal('缓存清理', '确定吗？', function() {
      wx.clearStorage({
        success: function(msg) {
          wx.showToast({
            title: '缓存清理成功',
            duration: 1000,
            mask: true,
            icon: "success"
          })
        },
        fail: function(e) {
          console.log(e)
        }
      })
    });
  },
  //显示系统信息
  showSystemInfo: function() {
    wx.navigateTo({
      url: 'device/device'
    });
  },

  //获取网络状态
  showNetWork: function() {
    var that = this;
    wx.getNetworkType({
      success: function(res) {
        var networkType = res.networkType
        that.showModal('网路状态', "您当前的网络：" + networkType);
      },
    })
  },
  //显示当前位置坐标与当前速度
  showLanLat: function() {
    var that = this;
    this.getLonLat(function(lon, lat, speed) {
      var lonStr = lon >= 0 ? "东经" : "西经",
        latStr = lat >= 0 ? '北纬' : '南纬';
      lon = lon.toFixed(2);
      lat = lat.toFixed(2);
      lonStr += lon;
      latStr += lat;
      speed = (speed || 0).toFixed(2);
      that.showModal('当前位置和速度', '当前位置：' + lonStr + ',' + latStr + '。速度:' + speed + 'm/s');
    })
  },

  //获取当前位置的经纬度与当前速度
  getLonLat: function(callback) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        callback(res.longitude, res.latitude, res.speed);
      }
    });
  },
  //在地图上显示当前位置
  showMap: function() {
    this.getLonLat(function(lon, lat) {
      wx.openLocation({
        latitude: lat,
        longitude: lon,
        scale: 15,
        name: '广东金融学院',
        address: '迎龙路527号',
        fail: function() {
          wx.showToast({
            title: '地图打开失败',
            duration: 1000,
            icon: "cancel"
          });
        }
      });
    })
  },
  showCompass: function() {
    var that = this;
    this.setData({
      compassHidden: false
    })
    wx.onCompassChange(function(res) {
      if (!that.data.compassHidden) {
        that.setData({
          compassVal: res.direction.toFixed(2)
        });
      }
    })
  },
  hideCompass: function() {
    this.setData({
      compassHidden: true
    })
  },

  //摇一摇
  shake: function() {
    var that = this;
    //启动摇一摇
    this.gravityModalConfirm(true);
    wx.onAccelerometerChange(function(res) {
      //摇一摇核心代码，判断手机晃动幅度
      var x = res.x.toFixed(4),
        y = res.y.toFixed(4),
        z = res.z.toFixed(4);
      var flagX = that.getDelFlag(x, that.data.shakeData.x),
        flagY = that.getDelFlag(y, that.data.shakeData.y),
        flagZ = that.getDelFlag(z, that.data.shakeData.z);
      that.data.shakeData = {
        x: res.x.toFixed(4),
        y: res.y.toFixed(4),
        z: res.z.toFixed(4)
      };
      if (flagX && flagY || flagX && flagZ || flagY && flagZ) {
        //如果摇一摇幅度足够大，就认为摇一摇成功
        if (that.data.shakeInfo.enabled) {
          that.data.shakeInfo.enabled = false;
          that.playShakeAudio();
        }
      }
    })
  },
  gravityModalConfirm: function(flag) {
    if (flag != true) {
      flag = false;
    }
    var that = this;
    this.setData({
      shakeInfo: {
        gravityModalHidden: !that.data.shakeInfo.gravityModalHidden,
        num: 0,
        enabled: flag
      }
    })
  },
  //计算摇一摇的偏移量
  getDelFlag: function(val1, val2) {
    return (Math.abs(val1, val2) >= 1);
  },
  //摇一摇成功后播放声音并累加摇一摇次数
  playShakeAudio: function() {
    var that = this;
    wx.playBackgroundAudio({
      dataUrl: 'http://www.170hi.com/kw/sf.sycdn.kuwo.cn/resource/n3/64/36/4138474318.mp3',
      title: '',
      coverImgUrl: ''
    });
    wx.onBackgroundAudioStop(function() {
      that.data.shakeInfo.num++;
      that.setData({
        shakeInfo: {
          num: that.data.shakeInfo.num,
          enabled: true,
          gravityModalHidden: false
        }
      });
    });
  },

  //扫描二维码
  scanQRCode: function() {
    var that = this;
    wx.scanCode({
      success: function(res) {
        console.log(res)
        that.showModal("扫描二维码、条形码", res.result, false);
      },
      fail: function(res) {
        that.showModal('扫描二维码/条形码', "扫描失败，请重试", false);
      }
    })
  },
  //跳转到下载页面

  downloadDocumentList: function() {
    wx.navigateTo({
      url: "/pages/setting/documents/download/download"
    });
  },
  //登录页面
  login:function(){
    wx.navigateTo({
      url:"/pages/setting/open-api/login/login"
    })
  },
  check:function(){
    wx.navigateTo({
      url: '/pages/setting/open-api/check/check',
    })
  },
  decrypted:function(){
    wx.navigateTo({
      url: '/pages/setting/open-api/decrypted/decrypted',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  tplMessage:function(){
    wx.navigateTo({
      url:"/pages/setting/open-api/tpl-message/tpl-message"
    });
  },
  wxPay:function(){
    wx.navigateTo({
      url:'/pages/setting/open-api/wx-pay/wx-pay'
    });
  },
  showWxKeyDemo:function(){
    wx.navigateTo({
      url:'/pages/setting/others/wx-key/wx-key'
    })
  },
  showScrollViewDemo:function(){
    wx.navigateTo({
      url:"/pages/setting/others/scroll-view/scroll-view"
    })
  }
})