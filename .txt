const express = require('express');
const app = express();

const path = require('path');
const router = express.Router();

var http = require('http');
var fs = require('fs');

const log = console.log;

app.use(express.urlencoded({
    extended: true
  }));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('port',process.env.PORT || 3000);

var server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});

app.get('/', function (req, res) {
    res.sendfile('public/index.html');
  });

console.log('http://localhost:3000');
