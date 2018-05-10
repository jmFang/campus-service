var moment = require('moment');
var config = require('./config/config.js');
var sessionTable = config.sessionTable;

var mysql = require('knex')({
  client: 'mysql',
  connection: {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    charset: config.mysql.charset
  }
});

//检查是否有session，如果有就给req添加上
var loginCheckMiddleware = function (req, res, next) {
    console.log("req.header",req.headers)
    var skey = req.headers.skey;
    console.log('skey:',skey)
    req.session = null;

    if(!skey) {
        next();
        return;
    }

    mysql(sessionTable).select('*').where({
        skey:skey
    })
    .then(function (result) {
        if(result.length > 0) {
            var session = result[0];
            console.log(result)
            var lastLoginTime = session.last_login_time;
            var expire_time = config.expires * 1000;

            if(moment(lastLoginTime,"YYYY-MM-DD HH:mm:ss").valueOf() + expire_time > (+new Date)) {
                req.session = session;
            }
        }
        next();
      })
      .catch(function(e) {
          next();
      });
  };

  var only = function(obj, keys) {
    obj = obj || {};
    if ('string' == typeof keys) keys = keys.split(/ +/);
    return keys.reduce(function (ret, key) {
      if (null == obj[key]) return ret;
      ret[key] = obj[key];
      return ret;
    }, {});
  };
  
  var timeNormalize = function(expires) {
      var limit = parseInt(expires);
      var now = new Date();
      var days = limit * 30;
      now.setDate(now.getDate() + days)
      return moment(now).format("YYYY-MM-DD HH:mm:ss");
  }

  module.exports = {
    mysql: mysql,
    loginCheckMiddleware: loginCheckMiddleware,
    only:only,
    timeNormalize:timeNormalize
  };