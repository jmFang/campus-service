var express = require('express');
var fs = require('fs');
var moment = require('moment');
var multiparty = require('multiparty');
var CosSdk = require('cos-nodejs-sdk-v5');
var _ = require('underscore')
var route = express.Router();

var loginCheckMiddleware = require('../util').loginCheckMiddleware;
var mysql = require('../util').mysql;
var only = require('../util').only;
var timeNormalize = require('../util').timeNormalize;
var config = require('../config/config.js');
var productTable = config.productTable;
var sessionTable = config.sessionTable;
var photoTable = config.photoTable;
var userTable = config.userTable;
// 获取腾讯云配置
// serverHost, tunnelServerUrl, tunnelSignatureKey, qcloudAppId, qcloudSecretId, qcloudSecretKey, wxMessageToken
var qcloudConfig = JSON.parse(fs.readFileSync('./config/sdk.config.json', 'utf8'));

// 文件存储sdk初始化
var cos = new CosSdk({
    SecretId: qcloudConfig.qcloudSecretId,
    SecretKey: qcloudConfig.qcloudSecretKey
});

route.use(loginCheckMiddleware);
route.all('*', function (req, res, next) {
    if (!req.session) {
        res.status(401).json({
            error: '未登录'
        });
        return;
    }
    next();
});

var segProduct = {
    pid:productTable +".pid",
    title:productTable +".title",
    desc:productTable+".desc",
    uid:productTable+".uid",
    price:productTable+".s_price"
}
var segPhoto = {
    pid:photoTable +".pid",
    path:photoTable+".path"
}
var segUser = {
    uid:userTable+".uid",
    avater:userTable +".avatar"
}
route.get('/', function (req, res, next) {
    mysql.select(segProduct.pid,segProduct.title, segProduct.desc,segProduct.price, segPhoto.path, segUser.avater).from(productTable)
    .leftJoin(photoTable, segProduct.pid,segPhoto.pid)
    .leftJoin(userTable, segUser.uid, segProduct.uid)
    .then(function (result) {
        console.log("result", result)
        if(result.length > 0) {
            var sumProduct = new Set();
            var map = new Map();
            var ret = [];
            _.each(result, function (item) { 
                var tmp = {
                    pid:null,
                    title:null,
                    desc:null,
                    photoUrls:[],
                    avatar:null
                };
                if(!map.has(item.pid)) {
                    tmp.pid = item.pid;
                    tmp.title = item.title;
                    tmp.desc = item.desc;
                    tmp.price = item.s_price;
                    tmp.photoUrls.push(item.path);
                    tmp.avatar = item.avatar;
                    map.set(item.pid, tmp);
                } else {
                    map.get(item.pid).photoUrls.push(item.path);
                }
            });

            map.forEach(function (value, key) {
                console.log("key", key);
                console.log("value", value);
                ret.push(value);
            });
            console.log("ret", ret);
            res.json({
                data:ret,
                count:map.size,
                status:"ok"
            }) 
        }
      })
  })
route.post('/', function(req, res, next) {
   
    var form = new multiparty.Form({
        encoding:'utf8',
        autoFiles:true,
        uploadDir:'./uploads'
    });
    form.parse(req, function(err, fields, files) {
        if(err) {
            next(err);
        } else {
            var title = fields.title[0];
            var desc = fields.description[0];
            var o_price = fields.originPrice[0];
            var s_price = fields.sellingPrice[0];
            var p_type = fields.productType[0];
            var visit = fields.visits[0];
            var time_post = fields.timeUp[0];
            var time_u = moment(parseInt(time_post)).format("YYYY-MM-DD HH:mm:ss");
            var time_d = timeNormalize(fields.timeLimit[0]);
            var photo = files.product_photo[0]
            var file_tmp_path = photo.path;
            var file_mime_type = photo.headers['content-type'];
            var user_skey = fields.skey[0];
            var p_pid = user_skey + "&&" + time_post;

            var product_status='fail', file_staus = 'fail';
            mysql(sessionTable).where({
                skey:user_skey
            })
            .select('open_id')
            .then(function(result) {
                if(result.length > 0) {
                    var row = result[0];
                    var uid = row.open_id;
                    var product = {
                        pid:p_pid,
                        uid:uid,
                        title:title,
                        desc:desc,
                        o_price:o_price,
                        s_price:s_price,
                        time_d:time_d,
                        time_u:time_u,
                        p_type:p_type,
                        visit:0,
                        comments:0
                    };
                    console.log("product", product);
                    //存商品信息
                    mysql(productTable).insert(product)
                    .then(function() {
                        product_status = "success";
                    })
                    .catch(function(e) {
                        product_status = "fail";
                    });

                    //存图片文件
                    var fileExtension = file_tmp_path.split('.').pop();
                    var fileKey = parseInt(Math.random() * 1000000) + '_' + (+new Date) + '.' + fileExtension;

                    var params = {
                        Bucket:config.cos.fileBucket,
                        Region:config.cos.region,
                        Key:fileKey,
                        Body: fs.readFileSync(file_tmp_path),
                        ContentLength:photo.size
                    };
                    cos.putObject(params, function(err, data) {
                        fs.unlink(file_tmp_path);
                        if(err) {
                            next(err);
                            return;
                        }
                        var fileUrl = data.Location;
                        var photo_item = {
                            pid:p_pid,
                            name:fileKey,
                            path:fileUrl
                        };
                        mysql(photoTable).insert(photo_item)
                        .then(function() {
                            res.json({
                                product_status:product_status,
                                fileUrl:fileUrl,
                                file_status:"ok"
                            });
                        })
                        .catch(function(e) {
                            res.json({
                                err:e,
                                product_status: product_status,
                                file_status: "fail"
                            });
                            return;
                        });
                    });

                }
            })
            .catch(function(e) {
                res.json({
                    error:e,
                    status:"fail"
                });
                return;
            });
        }
    });
})

module.exports = route;