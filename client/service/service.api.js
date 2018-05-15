var config = require('../config.js');

  var service = {};
  const baseUrl = config.host;
  var skey = wx.getStorageSync('skey');
  var header = {
      "Content-Type": "multipart/form-data",
      'accept': 'application/json',
      skey: skey,
      version: config.apiVersion
  };

  // 中大学生邮箱的尾缀
  /*发布商品
  @param product 待发布的商品表单
  @param filePaths 待传图片的本地路径
  @param callback 回调函数
  */

  function uploadDIY(filePaths, index, length, productForm, successUp, failUp, callback) {
      wx.uploadFile({
        url: baseUrl + "/publish",
        filePath: filePaths[index],
        name: "product_photo",
        formData: productForm,
        header: header,
        method:"POST",
        success:function(res) {
              successUp++;
              console.log(res)
          },
          fail:function(err) {
              failUp++;
          },
          complete:function() {
              index++;
              if(index == length){
                callback()
              } else {
                  uploadDIY(filePaths, index, length, productForm, successUp, failUp, callback);
              }
          }
      });
  }
  service.postProduct = function (productForm, filePaths,callback) {
      var length = filePaths.length;
      var index = 0, successUp = 0, failUp = 0;
      uploadDIY(filePaths, index, length, productForm, successUp, failUp, callback);
  }
  /* 获取商品列表
  @param which 按最新、最热，或者其他分类
  @param callback 回调函数
  */ 
  service.getProducts = function (which, callback) {
    wx.request({
      url: baseUrl + "/publish",
      method:'GET',
      header:header,
      success:function(res){
        //callback(res.data);
        console.log("返回成功的数据:" + res.data) //返回的会是对象，可以用JSON转字符串打印出来方便查看数据    
        console.log("返回成功的数据:" + JSON.stringify(res.data)) //这样就可以愉快的看到后台的数据啦 
      },
      fail:function(fail) {
        callback(fail);
      },
      complete:function(res) {
        callback(res.data);
      }
    })
  }

  service.getBaseUrl = function() {
    return "https:www.sysuygm.cn";
  }

  /* 根据用户ID，获取用户资料
  @param callback
  */ 

  service.getUserInfo = function(callback) {

  }
  /*
  @param userInfo 新的用户信息
  @param callback 回调函数
  */ 
  service.updateUserInfo = function(userInfo,callback) {

  }
  /* 根据用户ID，获取用户的收藏品列表
  @param userId 用户ID
  @param callback 回调函数
  */ 
  service.getCollections = function(callback) {

  }
  service.deleteCollection = function(productId, callback) {
     return callback({
        status:200,
        success:true
      });
      wx.request({
          url: baseUrl + "/api/users/:uid/collections/:cid",
          method: 'POST',
          data:{
              uid:userId,
              cid:productId
          },
          success: function (res) {
              callback(res);
              console.log("返回成功的数据:" + res.data)
          },
          fail: function (fail) {
              callback(fail);
          },
          complete: function (res) {
              callback(res);
          }
      })
  }

  /* 根据用户ID，获取用户发布过的商品列表
  @param userId 用户ID
  @param callback 回调函数
  */
  service.getPosts = function (callback) {

  }
  service.changePostStatus = function(pid,callback) {
      return callback({
          success:true,
          status:200,
          newInfo:{
              id: pid+"n1",
              name:'尚文'
          }
      });
  }

  /* 根据用户ID获取用户的消息
  @param userId 用户ID
  @param callback
  */ 
  service.getMessages = function(userId, callback) {

  }
  /* 邮箱验证
  @param netId 用于组成邮箱号
  @callback 回调函数
  */ 
  service.validateEmail = function(netId, callback) {

  }
  module.exports = service;
