
var User=require('../model/User');
var jwt = require('jwt-simple');
var moment = require('moment');
var app = require('../app');
var Promise = require('promise');
var client_id = 'a3e059563d7fd3372b49b37f00a00bcf';
var requestify = require('requestify');
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

exports.getRecommend = function(req,res){
  //收藏的前3个的 前十个related
  if(req.body.favorites){
    console.log('favorites',req.body.favorites);
    if(req.body.favorites.length<=3){
      var favorites = req.body.favorites;
      var promiseArr = [];
      favorites.forEach(function(favorite,index){
        var url = 'http://api.soundcloud.com/tracks/'+favorite+'/related'+'?client_id='+client_id+'&limit=10';
        var promise = requestify.get(url).then(function(response){ return JSON.parse(response.body);});
        promiseArr.push(promise);
      });
      Promise.all(promiseArr).then(function(response){
        var data = [];
        response.forEach(function(tracks,index){
          tracks.forEach(function(track,index){
            track.url = '/play?id='+track.id;
            data.push(track);
          });
        });
        res.send(data);
      });
    }else{
      res.send('invalid access');
    }
  }else{
    res.send('invalid access');
  }
};
