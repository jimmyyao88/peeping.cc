var requestify=require('requestify');
var client_id = 'a3e059563d7fd3372b49b37f00a00bcf';
var limitOffset = 15;
var API_PROFILE = 'https://api.soundcloud.com/users/';

exports.getProfile = function(req,res){
  var userId = req.params.id;
  var url = API_PROFILE + userId + '/' +'?client_id='+client_id;
  console.log('url',url);
  requestify.
  get(url)
  .then(function(response){
    var data=JSON.parse(response.body);
    res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getProfileTracks = function(req,res){
  var page = req.query.page;
  var userId = req.params.id;
  var url = API_PROFILE + userId + '/tracks/' + '?limit=' + limitOffset + '&client_id=' + client_id + '&offset=' + (page*limitOffset);
  requestify.
  get(url)
  .then(function(response){
    var data=JSON.parse(response.body);
    data.forEach(function(song,index){
        data[index].url= '/play?id='+song.id;
    });
    res.send(data);
  },function(err){
    console.log(err);
  });
};
