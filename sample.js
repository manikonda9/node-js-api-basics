var http = require('http');
var url = require('url');
//var date = require('./firstModule');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.end(txt);
    //res.write(req.url);
    //res.write("The date and time are currently: " + date.myDateTime());
    //res.end();
}).listen(8000);