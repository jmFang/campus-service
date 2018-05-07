var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var request = require('request');
var moment = require('moment');
var model = require('../model/model.js');
var config = require('../config/config.js');

var connection = mysql.createConnection({
  host     : 'localhost',
  post     : 3306,
  user     : 'root',
  password : 'root',
  database : 'campus_service'
});

var INSET_USER = "INSERT INTO user(uid,create_time) \
                  VALUES (?,?)";

connection.connect();
connection.query(model.userSql, function (err, result, fields) {
    if(err) throw err;
    console.log('the result is ', result);
  })


router.get('/register', function (req, res, next) {
    var code = req.query.code;
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
            var openId = data.openid;
            if(openId) {
                var curTime = moment().format("YYYY-MM-DD HH:mm:ss");
                var values = [openId, curTime];
                connection.query(INSET_USER, values, function (err, result, fields) {
                    if(err) throw err;
                    console.log('insert user',result);
                })             
            }
            res.json({statusCode:resp.statusCode,openid:openId})  
        } else {
            res.json(err)
        }
    })
  })


  module.exports = router;