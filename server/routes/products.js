var express = require('express');
var fs = require('fs');
var multiparty = require('multiparty');
var CosSdk = require('cos-nodejs-sdk-v5');
var route = express.Router();
var loginCheckMiddleware = require('../util').loginCheckMiddleware;
var mysql = require('../util').mysql;
var only = require('../util').only;
var config = require('../config/config.js');


route.post('/', function(req, res, next) {
    console.log("body", req.body)
    console.log(req.file)
    res.json({success:"ok",data:req.body})
})

module.exports = route;