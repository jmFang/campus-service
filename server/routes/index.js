var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.setHeader("Set-Cookie",["name=sysu",'pass=uuuu']);
    res.send('<h1>hello world </h1>');
    console.log(req.session)
    req.session.save(function(err){
    console.log(err);
   })
});

module.exports = router;
