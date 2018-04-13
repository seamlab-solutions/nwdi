const express = require('express')
const app = express()
var body_parser = require('body-parser')

app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static('ui'))

var https = require('https');
var http = require('http');
var fs = require('fs');

var options = {
    pfx: fs.readFileSync('./nwdi.pfx'),
    passphrase: 'P@sst0SSL'
};


var listener = https.createServer(options, app).listen(443, function () {
    console.log('Express HTTPS server listening on port ' + listener.address().port);
})

http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);