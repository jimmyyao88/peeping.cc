
var User=require('../model/user');
var jwt = require('jwt-simple');
var moment = require('moment');
var app = require('../app');
exports.signup=function(req,res){
    var _user=req.body.user;
    console.log(_user);
    var user=new User(_user);
    console.log('signup ',user);
    user.save(function(err,user){
        console.log('user signup',user);
        //  moment().add(number, period).
        var expires = moment().add(90,'days').valueOf;
        var token = jwt.encode({
          iss: user._id,
          exp: expires
        }, app.get('jwtTokenSecret'));
        res.send({
          user: {
            nickname : user.nickname,
            email : user.email,
            token : token,
            favorites : user.favorites
          }
        });
    });
};

exports.signin = function(req,res){
  var _user=req.body.user;
  console.log('_user',_user);
  User.findOne({email:_user.email},function(err,user){
      if(!user){
        console.log('无此用户');
        //res.end('counldnt sign you in',401);
        res.send(403, 'Counldnt sign you in,Please check ur input');
      }else{
          user.comparePassword(_user.password,function(err,isMatch){
              if(isMatch){
                var expires = moment().add(90,'days').valueOf;
                var token = jwt.encode({
                  iss: user._id,
                  exp: expires
                }, app.get('jwtTokenSecret'));

                res.send({
                  user: {
                    nickname : user.nickname,
                    email : user.email,
                    token : token,
                    favorites : user.favorites
                  }
                });
              }else{
                res.send(403, 'Counldnt sign you in,Please check ur input');
                  //res.redirect('/admin/showlogin');
              }
          });
      }
  });
};

exports.validToken = function(req,res,next){
  var token = req.headers['access_token'];
  console.log(req.headers);
  if (token) {
    try {
      var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
      if (decoded.exp <= Date.now()) {
        res.send(403, 'Access token has expired');
      }else{
        req.userId =  decoded.iss;
        next();
      }
    } catch (err) {
      res.send(500, 'internal error');
    }
  } else {
    res.send(403, 'unauthorized');
  }
};

exports.saveFavorite = function(req,res){
  var id = req.body.id;
  var promise = User.findByIdAndUpdate(req.userId,{$addToSet:{favorites:id}}).exec();
  promise.then(function(user){
    console.log('user',user);
    res.send(200, 'success' );
  });
};

exports.getFavorites = function(req,res){
  var promise = User.find({_id:req.userId}).exec();
  promise.then(function(user){
    res.send(user[0].favorites);
  });
};
