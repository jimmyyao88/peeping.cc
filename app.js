var express=require('express');
var path=require('path');
var cookieParser = require('cookie-parser');
var bodyParser=require('body-parser');
var multiPart=require('connect-multiparty');
var app=express();
var port=4000;

app.use(express.static(path.join(__dirname,'www')));
app.use(bodyParser.urlencoded({ extended: true ,limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());
app.use(multiPart());

console.log('server start');
require('./config/routes')(app);

app.listen(port);
