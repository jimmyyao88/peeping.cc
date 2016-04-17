var requestify=require('requestify');
var request = require('request');
exports.getSearchResult=function(req,res){
  var query = req.query.q;
  console.log(query);
  var url = 'https://api.soundcloud.com/tracks?q='+query+'&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      res.send(data);
  },function(err){
    console.log(err);
  });
};
