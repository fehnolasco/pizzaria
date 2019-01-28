

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var server = express();

var app = require('./app/app');
var cms = require('./cms/cms');

global.dir = __dirname;
global.file_path = function (path) {
   return dir + path;
}
global.include = function (file) {
   return require(file_path('/' + file));
};

server.set('port', process.env.PORT || 3000);
server.use('/', app);
server.use('/admin', cms);



http.createServer(server).listen(server.get('port'), function () {
   console.log("Nogueira's server listening on port " + server.get('port'));
});