var express = require('express');
var crypto = require('crypto');
var moment = require('moment');
var request = require('request');
var config = require('../config/config.js');
var route = express.Router();
var mysql = require('../util').mysql;
var sessionTable = config.sessionTable;

// 加密
function sha1(message) {
    return crypto.createHash('sha1').update(message, 'utf8').digest('hex');
}

route.get('/', function(req, res, next) {
    var code = req.query.code;
    var curTime = moment().format("YYYY-MM-DD HH:mm:ss");
    // 向微信服务器请求sesion_key
    request.get({
        url:"https://api.weixin.qq.com/sns/jscode2session",
        json:true,
        qs:{
            grant_type:'authorization_code',
            appid:config.appid,
            secret:config.secret,
            js_code:code
        }
    }, function(err, resp, data) {
        if (resp.statusCode == 200) {
            var sessionKey = String(data.session_key);
            var openId = data.openid;
            var skey = sha1(sessionKey);
            var sessionData = {
                skey:skey,
                last_login_time:curTime,
                create_time:curTime,
                session_key:sessionKey
            };
            // 查看是否存在该open_id
            mysql(sessionTable).count('open_id as hasUser').where({
                open_id:openId
            })
            .then(function (result) {
                //如果存在则更新，不存在则创建
                if(result[0].hasUser) {
                    return mysql(sessionTable).update(sessionTable).where({
                        open_id:openId
                    });
                } else {
                    sessionData.open_id = openId;
                    return mysql(sessionTable).insert(sessionData);
                }
              })
              .then(function() {
                  res.json({
                      skey:skey
                  });
              })
              .catch(function (e) {
                  res.json({
                      skey:null,
                      msg:"insert user fail."
                  });
                });

        } else {
            res.json({
                error:err,
                skey:null
            });
        }
    });
});

module.exports = route;
