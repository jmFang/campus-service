//app.js
var Bmob = require("./utils/bmob.js");
var common = require("./utils/common.js");
const _utils = require("./utils/util.js");

// 后台服务API对象
var service = require('./service/service.api.js');


//App id and RESTful ID
Bmob.initialize("6629633f78a72ce63cbc44f5b515460f","5d5ada11a62e8e0d001ac314f6ac786c");
App({
  version:"v1.0.0", //本项目的版本号
  onLaunch: function () {
    var that = this;
    // 调用系统API 获取设备信息
    wx.getSystemInfo({
      success: function(res) {
        var kScreenW = res.windowWidth / 375;
        var kScreenH = res.windowHeight / 603;
        wx.setStorageSync("kScreenW", kScreenW);
        wx.setStorageSync("kScreenH", kScreenH);
      },
    })

    // 调用系统API从本地缓存中获取数据
    try {
      var value = wx.getStorageSync("user_openid");
      if(value) {

      } else {
        console.log("执行login1");
        wx.login({
          success:function(res) {
            if(res.code) {
              console.log("执行log2",res);
            }
          }
        });
        wx.login({
          success:function(res) {
            if(res.code) {
              // 获取bmob 的 openId
              Bmob.User.requestOpenId(res.code, {
                // 回调成功
                success:function(userData) { 
                  wx.getUserInfo({
                    success:function(result) {
                      // 用户信息
                      var userInfo = result.userInfo;
                      var nickName = userInfo.nickName;
                      var avatarUrl = userInfo.avatarUrl;
                      var sex = userInfo.gender;

                      // 使用Bmob登录
                      Bmob.User.logIn(nickName, userData.openid, {
                        // 登录成功的回调
                        success:function(user) {
                          console.log(user);
                          try {
                            // 本地保存登录信息
                            wx.setStorageSync("user_openid", user.get('userData').openid);
                            wx.setStorageSync("user_id", user.id);
                            wx.setStorageSync("my_nick", user.get("nickname"));
                            wx.setStorageSync("my_username", user.get("username"));
                            wx.setStorageSync("my_sex", user.get("sex"));
                            wx.setStorageSync("my_avatar", user.get("userPic"));
                          } catch(e) {
                            console.log(e);
                          }
                          console.log("login successfully");
                        },
                        // 登录失败的回调
                        error:function(user, error) {
                          if(error.code == '101') {
                            // 开始注册
                            var user = new Bmob.User();
                            user.set('username',nickName);
                            user.set('password',userData.openid);
                            user.set('nickname',nickName);
                            user.set('userPic', avatarUrl);
                            user.set('userData', userData);
                            user.set('sex', sex);
                            user.set('feednum', 0);
                            user.signUp(null, {
                              // 注册成功
                              success:function(result) {
                                console.log("register successfully");
                                try {
                                  wx.setStorageSync("user_openid", user.get('userData').openid);
                                  wx.setStorageSync("user_id", user.id);
                                  wx.setStorageSync("my_nick", user.get("nickname"));
                                  wx.setStorageSync("my_username", user.get("username"));
                                  wx.setStorageSync("my_sex", user.get("sex"));
                                  wx.setStorageSync("my_avatar", user.get("userPic"));
                                } catch(e) {
                                  console.log(e);
                                }
                              },
                              // 注册失败
                              error:function(userData, error) {
                                console.log("openid=" + userData);
                                console.log(error);
                              }
                            }); //注册块的结束


                          } 

                        }
                      }); //登录块的结束
                    },
                  });
                },

                error: function (error) {
                  console.log("ERROR:" + error.code + " " + error.message);
                }
              });
            } else {
              console.log("获取用户登录状态失败"+ res.errMsg);
            }
          },
          complete:function(e) {
            console.log("获取用户登录成功" + e);
          }
        });
      }
    } catch(e) {
      console.log(e + " " + 登录失败);
    }

    // 检查 session
    wx.checkSession({
      success:function() {

      },
      fail:function() {
        // 登录状态过期，重新登录
        wx.login();
      }
    });
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onShow:function() {

  },
  // 时间格式
  formate_data:function(date) {
    let month_add = date.getMonth() + 1;
    var formate_result = date.getFullYear() + '年'
      + month_add + '月'
      + date.getDate() + '日'
      + ' '
      + date.getHours() + '点'
      + date.getMinutes() + '分';
      return formate_result;
  },
  // 自定义获取用户信息的接口
  // @param callback function
  getUserInfo:function(cb) {
    var that = this;
    if(this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      wx.login({
        success:function() {
          wx.getUserInfo({
            success:function(res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          });
        }
      });
    }
  },

  globalData: {
    userInfo: null,
  },

  onPullDownReflesh:function() {

  },
  onError:function(msg) {

  },
  // Touches:new Touches(),
  util:_utils,
})