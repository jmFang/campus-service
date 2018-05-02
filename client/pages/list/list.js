var which = '';
var service = require('../../service/service.api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[],
    post:null,
    clt:null,
    msg:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      console.log(options);
      var msg, post, clt;
      [which, msg, post, clt] = this.whichType(options.which);
      console.log(msg)
      wx.setNavigationBarTitle({
          title: which,
      });
      this.setData({
          post: post,
          clt: clt,
          msg:msg
      });
  },
  whichType:function(which) {
      switch(which) {
          case 'msg':return ["我的消息",true,false,false];
          case 'post':return ["我的发布", false, true, false];
          case 'clt':return ["我的收藏", false, false, true];
      }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
        productList:[
            {
                id:'xdfg11111',
                title:'雅思托福',
                sellPrice:59,
                photoUrl:'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/c2f5a24a40b460c08068ed08572829d0.jpg',
                timeLeft:8,
                createTime:"3月12日",
                status:true

            },
            {
                id: 'xdfg11111',
                title: '雅思托福',
                sellPrice: 159,
                photoUrl:'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/c2f5a24a40b460c08068ed08572829d0.jpg',
                timeLeft: 8,
                status: true

            },
            {
                id: 'xdfg11111',
                title: '雅思托福',
                sellPrice: 259,
                photoUrl: 'http://bmob-cdn-17230.b0.upaiyun.com/2018/03/13/c2f5a24a40b460c08068ed08572829d0.jpg',
                timeLeft: 8,
                status: false

            }
        ]
    });
  },

    /*
    删除一条个人的收藏记录
    */   
  deleteCollection:function(e){
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var list = this.data.productList;
    list.splice(index, 1);
    this.setData({
          productList:list
    })
    //同时删除云数据库的收藏条目
    service.deleteCollection(id, function(res) {
        if(res.success) {
            console.log(res.status + " --success: " + res.success);
        }
    });
  },
/*
修改已发布产品的信息
*/   
  updatePost:function(e) {
      var id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      console.log('update:id=' + id);
      //前往产品详情页面修改
  },
  changeStatus:function(e) {
      var id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      var that = this;
      service.changePostStatus(id, function(res) {
          console.log(res.status + "---success:" + res.success + "---newId:" + res.newInfo.id);
          var plist = that.data.productList;
          plist[index].status = !plist[index].status;
          that.setData({
              productList: plist
          })
      })
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