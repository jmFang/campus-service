var app = getApp();
var url = "https://wx.qlogo.cn/mmopen/vi_32/74icsSQvsyt8SKR1rysqafqGXm7LlfoKRicR3p4b4YJevjlWtPwDlBib6ia03s0ZKqqNefOeZ1K3FdRUQ6aqRd7vdQ/0";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          product:{
              title:"指甲油黑樱桃色马卡龙灰色",
              description: "色号P11比较浅的粉色少女心已不在基本不用这个颜色\
              闲置了使用次数2次（膏体形状都没变，买回去用棉签擦掉表面试色就能用了，\
              不用担心二次污染问题）\
              17年11月购入的，但生产日期是16年5月，质保三年，开封5个月。\
              原价及试色图不放了，有需要自行某宝搜哦～",
              visit:11,
              createTime:"5小时前",
              sellPrice:50,
              publisher:{
                  avatarUrl: url,
                  selledNums:"13",
                  nickname:"xuan",
                  verified:true,
                  address:"南校区"
              },
              originPrice:150,
              photos:[
                'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/c2f5a24a40b460c08068ed08572829d0.jpg',
                'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/c2f5a24a40b460c08068ed08572829d0.jpg'
              ],
              commits:[
        
              ]
          }
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