var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var crypto = require('crypto');
var coment = require('moment');
var request = require('request');
var mogan = require('morgan');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var loginRouter = require('./routes/login.js');
var publishRouter = require('./routes/publish.js')
var registerRouter = require('./routes/register.js')

var options = {
    host:'localhost',
    port:'3306',
    user:'root',
    password:'root',
    database:'campus_service',
    checkExpirationInterval:600000, //一分钟检查一次
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

var app = express();
// 腾讯云要求用5757端口
var port = 5757;


//app.use(cookieParser());
app.use(bodyParser());

app.use(session({
    key: 'mgyusys',
    secret: 'sysuygm',
    cookie: { 
        maxAge: 60000
    },
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.get('/', function (req, res) {
    res.setHeader("Set-Cookie",["name=sysu",'pass=uuuu']);
    res.send('<h1>hello world </h1>');
    console.log(req.session)
    req.session.save(function(err){
        console.log(err);
    })
});

app.get('/login', loginRouter);
app.post('/publish',publishRouter);
app.get('/register',registerRouter);

app.listen(port, function (err) {
    if (err) {
        console.log('err!');
    } else {
        console.log('server start! listening on localhost:${port}');
    }
})