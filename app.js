var express=require('express');
var path=require('path');
var cookieParser = require('cookie-parser');
var session=require('express-session');
var bodyParser=require('body-parser');
var MongoStore = require('connect-mongo')(session);
var multiPart=require('connect-multiparty');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var app=express();
var port=4000;
var dbUrl="mongodb://127.0.0.1/peeping";

mongoose.connect(dbUrl);
app.locals.moment=require('moment');
app.use(session({
    secret: 'peeping',
    store:new MongoStore({
        url:dbUrl,
        collection:'sessions'
    })
}));
app.set('jwtTokenSecret', 'PEEPING_TOKEN');
app.use(express.static(path.join(__dirname,'www')));
app.use(cookieParser());
app.use(multiPart());



console.log('server start');
require('./config/routes')(app);

app.listen(port);
