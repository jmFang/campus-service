var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    iconPath:'../../static/images/more/enter.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = {
        avatarUrl: 'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/10/e915e3a840c832b380bb70aa93441506.jpg',
        school:"中山大学",
        grade:"大一",
        college:"数据科学与计算机学院",
        nickName: app.globalData.nickName,
        phoneNumber:"134-5667-7777",
        wechat:"YGM1234567",
        qq:"123456676"
    };

    this.setData({
        userInfo:userInfo
    });
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