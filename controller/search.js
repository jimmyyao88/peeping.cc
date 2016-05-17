var requestify=require('requestify');
var request = require('request');
var offsetLimit = 10;
var client_id = 'a3e059563d7fd3372b49b37f00a00bcf';
exports.getSearchResult=function(req,res){
  var query = req.query.query;
  var url = 'https://api.soundcloud.com/tracks?q=' + query + '&client_id=' + client_id + '&offset=' + offsetLimit;
  requestify
   .get(url)
   .then(function(response){
      var resp=JSON.parse(response.body);
      var songs=[];
      resp.forEach(function(song,index){
           song.url= '/play?id='+song.id;
           if (song.user.username == "石濤.radio"||song.user.username == "user562297513"||song.title == "习近平"||song.title.indexOf("江泽民") != -1||song.title.indexOf("石涛") != -1||song.title.indexOf("共产党") != -1){
           }else{
             songs.push(song);
           }
      });
      res.send(songs);
  },function(err){
    console.log(err);
  });
};
