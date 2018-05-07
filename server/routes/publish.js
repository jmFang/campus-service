var express = require('express');
var multer  = require('multer')
var route = express.Router();
var formidable = require('formidable');


var storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, './uploads/')
      },
    filename:function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +'.' + file.mimetype.substr(6))
      }
})
var upload = multer({storage:storage});

route.post('/publish', upload.single('ppp'), function(req, res, next) {
    console.log("body", req.body)
    console.log(req.file)
    res.json({success:"ok",data:req.body})
})

module.exports = route;