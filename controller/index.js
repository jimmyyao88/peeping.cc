var requestify=require('requestify');
var request = require('request');
var client_id = 'a3e059563d7fd3372b49b37f00a00bcf';

exports.getTrend=function(req,res){
  var url = 'https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud:genres:all-music&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      data.favorited='';
      data.success=false;
      data.user=null;
      data.songs=[];
      console.log('data');
      data.collection.forEach(function(song,index){
          song.track.url= '/play?id='+song.track.id;
          data.songs.push(song.track);
      });
      data.tracks=data.collection;

      //data.songs=data.collection;
      res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getIndie=function(req,res){
  var url = 'https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud:genres:indie&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      data.favorited='';
      data.success=false;
      data.user=null;
      data.songs=[];
      console.log('data');
      data.collection.forEach(function(song,index){
          song.track.url= '/play?id='+song.track.id;
          data.songs.push(song.track);
      });
      data.tracks=data.collection;

      //data.songs=data.collection;
      res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getRawLink=function(req,res){
  console.log('hehe');
  console.log(req.query);
  var id = req.query.id;
  requestify
   .head('http://api.soundcloud.com/tracks/'+id+'/stream?client_id='+client_id)
   .then(function(response){
      // var data=JSON.parse(response.headers);
      // res.send({'link':data.location});
  },function(response){
    console.log('response');
    //var data=JSON.parse(response.headers);
    console.log(response);
    res.redirect(response.headers.location);
    //res.send({'link':response.headers.location});
  });
};

exports.getMetal=function(req,res){
  var url = 'https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud:genres:meta&limit=50l&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      data.favorited='';
      data.success=false;
      data.user=null;
      data.tracks=data.collection;
      res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getElectronic=function(req,res){
  var url = 'https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud:genres:electronic&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      data.favorited='';
      data.success=false;
      data.user=null;
      data.songs=[];
      console.log('data');
      data.collection.forEach(function(song,index){
          song.track.url= '/play?id='+song.track.id;
          data.songs.push(song.track);
      });
      data.tracks=data.collection;

      //data.songs=data.collection;
      res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getHiphop=function(req,res){
  var url = 'https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud:genres:hiphoprap&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      data.favorited='';
      data.success=false;
      data.user=null;
      data.songs=[];
      console.log('data');
      data.collection.forEach(function(song,index){
          song.track.url= '/play?id='+song.track.id;
          data.songs.push(song.track);
      });
      data.tracks=data.collection;

      //data.songs=data.collection;
      res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getPop=function(req,res){
  var url = 'https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud:genres:pop&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      data.favorited='';
      data.success=false;
      data.user=null;
      data.songs=[];
      console.log('data');
      data.collection.forEach(function(song,index){
          song.track.url= '/play?id='+song.track.id;
          data.songs.push(song.track);
      });
      data.tracks=data.collection;

      //data.songs=data.collection;
      res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getNew=function(req,res){
  var url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:all-music&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      data.favorited='';
      data.success=false;
      data.user=null;
      data.tracks=data.collection;
      res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getRock=function(req,res){
  var url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:rock&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      data.favorited='';
      data.success=false;
      data.user=null;
      data.songs=[];
      console.log('data');
      data.collection.forEach(function(song,index){
          song.track.url= '/play?id='+song.track.id;
          data.songs.push(song.track);
      });
      data.tracks=data.collection;

      //data.songs=data.collection;
      res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getDeephouse=function(req,res){
  var url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:deephouse&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      data.favorited='';
      data.success=false;
      data.user=null;
      data.songs=[];
      console.log('data');
      data.collection.forEach(function(song,index){
          song.track.url= '/play?id='+song.track.id;
          data.songs.push(song.track);
      });
      data.tracks=data.collection;

      //data.songs=data.collection;
      res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getHouse=function(req,res){
  var url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:house&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      data.favorited='';
      data.success=false;
      data.user=null;
      data.songs=[];
      console.log('data');
      data.collection.forEach(function(song,index){
          song.track.url= '/play?id='+song.track.id;
          data.songs.push(song.track);
      });
      data.tracks=data.collection;
      res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getRbsoul=function(req,res){
  var url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:rbsoul&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      data.favorited='';
      data.favorited='';
      data.success=false;
      data.user=null;
      data.songs=[];
      console.log('data');
      data.collection.forEach(function(song,index){
          song.track.url= '/play?id='+song.track.id;
          data.songs.push(song.track);
      });
      data.tracks=data.collection;
      res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getJazzblues=function(req,res){
  var url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:jazzblues&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      data.favorited='';
      data.favorited='';
      data.success=false;
      data.user=null;
      data.songs=[];
      console.log('data');
      data.collection.forEach(function(song,index){
          song.track.url= '/play?id='+song.track.id;
          data.songs.push(song.track);
      });
      data.tracks=data.collection;
      res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getTrap=function(req,res){
  var url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:trap&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      data.favorited='';
      data.favorited='';
      data.success=false;
      data.user=null;
      data.songs=[];
      console.log('data');
      data.collection.forEach(function(song,index){
          song.track.url= '/play?id='+song.track.id;
          data.songs.push(song.track);
      });
      data.tracks=data.collection;
      res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getCountry=function(req,res){
  var url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:country&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      data.favorited='';
      data.favorited='';
      data.success=false;
      data.user=null;
      data.songs=[];
      console.log('data');
      data.collection.forEach(function(song,index){
          song.track.url= '/play?id='+song.track.id;
          data.songs.push(song.track);
      });
      data.tracks=data.collection;
      res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getDancehall=function(req,res){
  var url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:dancehall&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      data.favorited='';
      data.success=false;
      data.user=null;
      data.songs=[];
      console.log('data');
      data.collection.forEach(function(song,index){
          song.track.url= '/play?id='+song.track.id;
          data.songs.push(song.track);
      });
      data.tracks=data.collection;
      res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getDubstep=function(req,res){
  var url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:dubstep&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf';
  requestify
   .get(url)
   .then(function(response){
      var data=JSON.parse(response.body);
      data.favorited='';
      data.success=false;
      data.user=null;
      data.songs=[];
      console.log('data');
      data.collection.forEach(function(song,index){
          song.track.url= '/play?id='+song.track.id;
          data.songs.push(song.track);
      });
      data.tracks=data.collection;
      res.send(data);
  },function(err){
    console.log(err);
  });
};

exports.getTrackInfo = function(req,res){
  var id = req.query.id;
  var url = 'http://api.soundcloud.com/tracks/'+id+'?client_id='+client_id;
  requestify
   .get(url)
   .then(function(response){
     console.log('response',response);
     res.send(response.body);
   },function(err){
     console.log(err);
   });
};
