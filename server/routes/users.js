var express = require('express');
var router = express.Router();
var moment = require('moment');
var fs = require('fs');
var multiparty = require('multiparty');
var loginCheckMiddleware = require('../util').loginCheckMiddleware;
var mysql = require('../util').mysql;
var config = require('../config/config.js');
var userTable = 'user';
// 获取腾讯云配置
// serverHost, tunnelServerUrl, tunnelSignatureKey, qcloudAppId, qcloudSecretId, qcloudSecretKey, wxMessageToken
//var qcloudConfig = JSON.parse(fs.readFileSync('/data/release/sdk.config.json', 'utf8'));

router.use(loginCheckMiddleware);
router.all('*', function (req, res, next) {
    if (!req.session) {
        res.status(401).json({
            error: "未登录"
        });
        return;
    }
    next();
});

// 获取用户
router.get('/', function (req, res, next) {
    mysql(userTable).where({
        uid: req.session.open_id
    })
    .select('*')
    .then(function (result) {
        if (result.length > 0) {
            var data = result[0];
            res.json({
                avatar: data.avatar,
                msg:"获取用户"
            });
        }
        else {
            res.status(400).json({
                error: '未创建用户'
            });
        }
    });
});

//新增用户
router.post('/', function (req, res, next) {
    var userInfo = req.body;
    if (!userInfo.avatar) {
        res.status(400).json({
            error: '参数错误'
        });
        return;
    }

    mysql(userTable).where({
        uid: req.session.open_id
    })
    .count('uid as hasUser')
    .then(function (ret) {
            if (ret[0].hasUser) {
                res.status(400).json({
                    error: '用户已创建'
                });
            }
            else {
                var curTime = moment().format("YYYY-MM-DD HH:mm:ss");
                var u_info = {
                    uid: req.session.open_id,
                    avatar: userInfo.avatar,
                    create_time: curTime,
                    college:"unkown",
                    grade:0,
                };
                mysql(userTable).insert(u_info)
                    .then(function () {
                        delete u_info.uid;
                        res.json(u_info);
                    });
            }
        });
})

module.exports = router;