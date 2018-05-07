var express = require('express');
var crypto = require('crypto');
var moment = require('moment');
var request = require('request');
var config = require('../config/config.js')
var route = express.Router();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);


var options = {
    host:'localhost',
    port:'3306',
    user:'root',
    password:'root',
    database:'session_test',
    checkExpirationInterval:300000, //一分钟检查一次
    expiration: 3600000, //最大的生命期
    connectionLimit: 1,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }

};
var sessionStore = new MySQLStore(options);

// 加密
function sha1(message) {
    return crypto.createHash('sha1').update(message, 'utf8').digest('hex');
}

route.get('/login', function(req, res, next) {
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
            var data = {
                lastTime:curTime,
                curTime:curTime
            }
            var sessionData = { 
                session_id:skey,
                expires:60000,         
                data: JSON.stringify(data)
            };
            sessionStore.set(skey,sessionData, function (err) {
                if(err) console.log(err)
              })
            res.json({session_data:sessionData, openid:openId})
        } else {
            res.json(err)
        }
    })
})

module.exports = route;
