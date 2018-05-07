//app.js
var Bmob = require("./utils/bmob.js");
var common = require("./utils/common.js");
const _utils = require("./utils/util.js");

// 后台服务API对象
var service = require('./service/service.api.js');

App({
  version:"v1.0.0", //本项目的版本号
  onLaunch: function () {
    var that = this;
    // 调用系统API 获取设备信息
    wx.getSystemInfo({
      success: function(res) {
        var kScreenW = res.windowWidth / 375;
        var kScreenH = res.windowHeight / 667;
        wx.setStorageSync("kScreenW", kScreenW);
        wx.setStorageSync("kScreenH", kScreenH);
      },
    })

    // 调用系统API从本地缓存中获取数据
    try {
      var value = wx.getStorageSync("session_id");
      if(value) {
        console.log("session_id",value)
      } else {
        wx.login({
          success:function(res) {
            if(res.code) {
              console.log("res.code",res.code)
              wx.request({
                  url: 'https://nermpswq.qcloud.la/login',
                  data:{
                      code:res.code
                  },
                  method:"GET",
                  success:function(res) {
                      console.log(res)
                      var session_data = res.data.session_data;
                      var session_id = session_data.session_id;
                      var expires = session_data.expires;
                      var data = session_data.data;
                      wx.setStorageSync('session_id', session_id)
                  }

              })
            } else {
              console.log("获取用户登录状态失败"+ res.errMsg);
            }
          },
          complete:function(e) {
            console.log("获取用户登录成功" + e.toString());
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

  }
})