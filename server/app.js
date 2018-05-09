var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var coment = require('moment');
var request = require('request');
var mogan = require('morgan');

var loginRouter = require('./routes/login.js');
var publishRouter = require('./routes/products.js')
var indexRouter = require('./routes/index.js')
var userRouter = require('./routes/users.js');


var config = require('./config/config.js')
var app = express();
// 腾讯云要求用5757端口
var port = config.port;

// 腾讯云会要求指定单一使用
app.use(bodyParser.json());

app.get('/', indexRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/publish',publishRouter);
// app.get('/register',registerRouter);

app.use(function(req, res, next) {
    res.status(404).json({
        error: '资源未找到'
    });
});

app.use(function(error, req, res, next) {
    console.log(error);
    res.status(500).json({
        error: '服务器内部错误'
    });
});

app.listen(port, function (err) {
    if (err) {
        console.log('err!');
    } else {
        console.log('server start! listening on localhost:${port}');
    }
})