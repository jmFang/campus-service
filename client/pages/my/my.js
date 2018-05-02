var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    unreaded:0,
    myposted:1,
    mycollected:4,
    display:'none',
    hidden:'visible'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = app.globalData.userInfo;
    this.setData({
      userInfo: userInfo,
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
    this.setData({
      display: 'none',
      hidden: 'visible'
    })
    var that = this;
    setTimeout(function(){
      that.setData({
        display : '',
        hidden:'hidden'
      })
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      display: 'none',
      hidden: 'visible'
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      display: 'none',
      hidden: 'visible'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
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
  goToList: function (e) {
      let which = e.currentTarget.dataset.which;
      console.log(which);
      wx.navigateTo({
          url: '/pages/list/list?which=' + which,
      })
  },
  clickItem:function(e) {
    var target = e.currentTarget.id;
    switch (target) {
      case 'userInfo':
        console.log('userInfo');
        wx.navigateTo({
            url:'/pages/userInfo/userInfo'
        })
        break;
      case 'eMail':
        console.log('email');
        break;
      case 'realName':
        console.log('realName');
        break;
      case 'settings':
        console.log('settings');
        break;
      case 'help':
        console.log('help');
        break;
      case 'aboutUs':
        console.log('aboutUs');
        break;
      default:
      break;

    }
  }
})