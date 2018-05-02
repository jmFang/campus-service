var express = require('express');
var app = express();
var port = 5757;

app.get('/', function (req, res) {
    res.send('<h1>hello world </h1>');
});

app.listen(port, function (err) {
    if (err) {
        console.log('err!');
    } else {
        console.log('server start! listening on localhost:${port}');
    }
})