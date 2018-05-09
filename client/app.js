// 后台服务API对象
var service = require('./service/service.api.js');
var config = require('./config.js');

App({
  onLaunch: function () {
      console.info("loading app...");
      wx.showLoading({
          title:"登录中",
          mask:true
      });
  },
  checkLogin:function(cb) {
      console.info("check login...");
      var skey = wx.getStorageSync('skey');
      if(skey) {
          console.log("in getuserinfo")
          this.getUserInfo(cb);
      } else {
          this.login(cb);
      }
  },
  login:function(cb){
      console.info("login...");
      var that = this;
      wx.login({
          success:function(res) {
              console.log("res.code", res.code);
              wx.request({
                  url: config.host+'/login',
                  data:{
                      code:res.code
                  },
                  method:'GET',
                  success:function(res) {
                      var skey = res.data.skey;
                      console.info("already login, skey is", skey);
                      
                      //没拿到，重试
                      if(!skey) {
                          console.log("skey is", skey);
                          //that.login(cb)
                          return;
                      }
                      //获取到skey,保存，并请求用户信息
                      wx.setStorageSync('skey', skey);
                      that.getUserInfo(cb);
                  }
              });
          }
      });
  },
  getUserInfo:function(cb) {
      var that = this;
      this.request({
          url:"/user",
          method:"GET",
          success:function(res) {
              if(res.statusCode === 401) {
                  that.login(cb);
              } else {
                  if(res.statusCode === 400) {
                      console.log("register called.")
                      that.registerUser(cb);
                  } else {
                      that.globalData.userInfo = res.data;
                      wx.hideLoading();
                      cb();
                  }
              }
          }
      });
  },

  registerUser:function(cb) {
      var that = this;
      wx.getUserInfo({
          success:function(res) {
              console.log("register success.")
              var userInfo = res.userInfo;
              console.log(userInfo)
              var info = {
                  avatar:userInfo.avatarUrl
              };
              that.request({
                  url:'/user',
                  method:"POST",
                  data:info,
                  success:function(res) {
                      console.log("already registered.")
                      that.globalData.userInfo = res.data.userInfo;
                      cb();
                      wx.hideLoading();
                  },
                  fail:function(err) {
                      console.log("register fail:", err);
                      cb();
                      wx.hideLoading()
                  }
              });
          },
        //   授权失败，用默认值注册
          fail:function() {
              that.request({
                  url:"/user",
                  method:"POST",
                  data:that.globalData.userInfo,
                  success:function() {
                      cb();
                      wx.hideLoading();
                  }
              });
          }
      })
  },

  request:function(obj) {
      var skey = wx.getStorageSync('skey');
      obj.url = config.host + obj.url;
      obj.header = {
          skey:skey,
          version:config.apiVersion
      };
      return wx.request(obj);
  },
  globalData:{
      userInfo:{
          avatar:'https://yunlaiwu0.cn-bj.ufileos.com/teacher_avatar.png'
      },
      userInfo_wx:null
  }
})