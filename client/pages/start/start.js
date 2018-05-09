// pages/start/start.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind:"loading...",
    angle:0,
    userInfo:{}
  },
  goToIndex: function () {
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.checkLogin(function() {
        console.log("in start page");
    });
    wx.getUserInfo({
        success:function(res) {
            var info = res.userInfo;
            that.setData({
                userInfo: info,
            }); 
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
      setTimeout(function () {
          _this.setData({
              remind: ""
          })
     }, 1000)

    wx.onAccelerometerChange(function(res){
      var angle = -(res.x*30).toFixed(1);
      if(angle > 14) {
        angle = 14;
      } else if(angle < -14) {
        angle = -14;
      }
      if(_this.data.angle !== angle) {
        _this.setData({
          angle:angle
        });
      }
    });
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})