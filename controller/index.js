var requestify=require('requestify');
var request = require('request');
var client_id = 'a3e059563d7fd3372b49b37f00a00bcf';
var limitOffset = 32;

exports.getTrend=function(req,res){
  var page = req.query.page ;
  var url="";
  if (page >=2) {
    url = 'https://api.soundcloud.com/search/sounds?limit=50&q=*&filter.tag=trap&client_id=a3e059563d7fd3372b49b37f00a00bcf&offset=' + ((page-1)*50);
    requestify
     .get(url)
     .then(function(response){
       console.log('get');
        var data=JSON.parse(response.body);
        data.favorited='';
        data.success=false;
        data.user=null;
        data.songs=[];
        data.collection.forEach(function(song,index){
            song.url= '/play?id='+song.id;
            data.songs.push(song);
        });
        data.tracks=data.collection;

        res.send(data);
    },function(err){
      console.log(err);
    });
  }else{
    url = 'https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud:genres:all-music&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf&offset=' + (page*50);
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
  }

};

exports.getIndie=function(req,res){
  var page = req.query.page ;
  var url = '';
  if (page >=2) {
    url = 'https://api.soundcloud.com/search/sounds?limit=50&q=*&filter.tag=indie&client_id=a3e059563d7fd3372b49b37f00a00bcf&offset=' + ((page-1)*50);
    requestify
     .get(url)
     .then(function(response){
       console.log('get');
        var data=JSON.parse(response.body);
        data.favorited='';
        data.success=false;
        data.user=null;
        data.songs=[];
        data.collection.forEach(function(song,index){
            song.url= '/play?id='+song.id;
            data.songs.push(song);
        });
        console.log(data.songs);
        console.log('here');
        data.tracks=data.collection;

        res.send(data);
    },function(err){
      console.log(err);
    });
  }else{
    url = 'https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud:genres:indie&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf&offset=' + (page*50);
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
  }
};

exports.getMetal=function(req,res){
  var page = req.query.page ;
  var url = '';
  if (page >=2) {
    url = 'https://api.soundcloud.com/search/sounds?limit=50&q=*&filter.tag=metal&client_id=a3e059563d7fd3372b49b37f00a00bcf&offset=' + ((page-1)*50);
    requestify
     .get(url)
     .then(function(response){
       console.log('get');
        var data=JSON.parse(response.body);
        data.favorited='';
        data.success=false;
        data.user=null;
        data.songs=[];
        data.collection.forEach(function(song,index){
            song.url= '/play?id='+song.id;
            data.songs.push(song);
        });
        console.log(data.songs);
        console.log('here');
        data.tracks=data.collection;

        res.send(data);
    },function(err){
      console.log(err);
    });
  }else{
    url = 'https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud:genres:meta&limit=50l&client_id=a3e059563d7fd3372b49b37f00a00bcf&offset=' + (page*50);
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
  }
};

exports.getElectronic=function(req,res){
  var page = req.query.page ;
  var url = '';
  if(page >= 2){
    url = 'https://api.soundcloud.com/search/sounds?limit=50&q=*&filter.tag=electronic&client_id=a3e059563d7fd3372b49b37f00a00bcf&offset=' + ((page-1)*50);
    requestify
     .get(url)
     .then(function(response){
       console.log('get');
        var data=JSON.parse(response.body);
        data.favorited='';
        data.success=false;
        data.user=null;
        data.songs=[];
        data.collection.forEach(function(song,index){
            song.url= '/play?id='+song.id;
            data.songs.push(song);
        });
        console.log(data.songs);
        data.tracks=data.collection;
        res.send(data);
    },function(err){
      console.log(err);
    });
  }else{
    url = 'https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud:genres:electronic&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf&offset=' + (page*50);
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
  }

};

exports.getHiphop=function(req,res){
  var page = req.query.page ;
  var url = '';
  if(page >= 2){
    url = 'https://api.soundcloud.com/search/sounds?limit=50&q=*&filter.tag=hiphoprap&client_id=a3e059563d7fd3372b49b37f00a00bcf&offset=' + ((page-1)*50);
    requestify
     .get(url)
     .then(function(response){
       console.log('get');
        var data=JSON.parse(response.body);
        data.favorited='';
        data.success=false;
        data.user=null;
        data.songs=[];
        data.collection.forEach(function(song,index){
            song.url= '/play?id='+song.id;
            data.songs.push(song);
        });
        console.log(data.songs);
        data.tracks=data.collection;

        res.send(data);
    },function(err){
      console.log(err);
    });
  }else{
    url = 'https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud:genres:hiphoprap&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf&offset=' + (page*50);
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
  }
};

exports.getPop=function(req,res){
  var page = req.query.page ;
  var url = '';
  if(page >= 2){
    url = 'https://api.soundcloud.com/search/sounds?limit=50&q=*&filter.tag=pop&client_id=a3e059563d7fd3372b49b37f00a00bcf&offset=' + ((page-1)*50);
    requestify
     .get(url)
     .then(function(response){
       console.log('get');
        var data=JSON.parse(response.body);
        data.favorited='';
        data.success=false;
        data.user=null;
        data.songs=[];
        data.collection.forEach(function(song,index){
            song.url= '/play?id='+song.id;
            data.songs.push(song);
        });
        data.tracks=data.collection;
        res.send(data);
    },function(err){
      console.log(err);
    });
  }else{
    url = 'https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud:genres:pop&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf&offset=' + (page*50);
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
  }

};

exports.getNew=function(req,res){
  var page = req.query.page ;
  var url = '';
  if(page >= 2){
    url = 'https://api.soundcloud.com/search/sounds?limit=50&q=*&filter.tag=all-music&client_id=a3e059563d7fd3372b49b37f00a00bcf&offset=' + ((page-1)*50);
    requestify
     .get(url)
     .then(function(response){
       console.log('get');
        var data=JSON.parse(response.body);
        data.favorited='';
        data.success=false;
        data.user=null;
        data.songs=[];
        data.collection.forEach(function(song,index){
            song.url= '/play?id='+song.id;
            data.songs.push(song);
        });
        console.log(data.songs);
        data.tracks=data.collection;
        res.send(data);
    },function(err){
      console.log(err);
    });
  }else{
    url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:all-music&limit=50&client_id=a3e059563d7fd3372b49b37f00a00bcf&offset=' + page*50;
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
  }
};

exports.getRock=function(req,res){
  var page = req.query.page ;
  var url = '';
  if(page >= 2){
    url = 'https://api.soundcloud.com/search/sounds?limit='+limitOffset+'&q=*&filter.tag=rock&client_id='+client_id+'&offset=' + ((page-1)*limitOffset);
    requestify
     .get(url)
     .then(function(response){
       console.log('get');
        var data=JSON.parse(response.body);
        data.favorited='';
        data.success=false;
        data.user=null;
        data.songs=[];
        data.collection.forEach(function(song,index){
            song.url= '/play?id='+song.id;
            data.songs.push(song);
        });
        console.log(data.songs);
        data.tracks=data.collection;

        res.send(data);
    },function(err){
      console.log(err);
    });
  }else{
    url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:rock&limit='+limitOffset+'&client_id='+client_id+'&offset=' + (page*limitOffset);
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
  }

};

exports.getDeephouse=function(req,res){
  var page = req.query.page ;
  var url = '';
  if(page >= 2){
    url = 'https://api.soundcloud.com/search/sounds?limit='+limitOffset+'&q=*&filter.tag=deephouse&client_id='+client_id+'&offset=' + ((page-1)*limitOffset);
    requestify
     .get(url)
     .then(function(response){
       console.log('get');
        var data=JSON.parse(response.body);
        data.favorited='';
        data.success=false;
        data.user=null;
        data.songs=[];
        data.collection.forEach(function(song,index){
            song.url= '/play?id='+song.id;
            data.songs.push(song);
        });
        console.log(data.songs);
        data.tracks=data.collection;

        res.send(data);
    },function(err){
      console.log(err);
    });
  }else{
    url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:deephouse&limit='+limitOffset+'&client_id='+client_id+'&offset=' + (page*limitOffset);
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
  }

};

exports.getHouse=function(req,res){
  var page = req.query.page ;
  var url = '';
  if(page >= 2){
    url = 'https://api.soundcloud.com/search/sounds?limit='+limitOffset+'&q=*&filter.tag=house&client_id='+client_id+'&offset=' + ((page-1)*limitOffset);
    requestify
     .get(url)
     .then(function(response){
       console.log('get');
        var data=JSON.parse(response.body);
        data.favorited='';
        data.success=false;
        data.user=null;
        data.songs=[];
        data.collection.forEach(function(song,index){
            song.url= '/play?id='+song.id;
            data.songs.push(song);
        });
        console.log(data.songs);
        data.tracks=data.collection;

        res.send(data);
    },function(err){
      console.log(err);
    });
  }else {
    url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:house&limit='+limitOffset+'&client_id='+client_id + '&offset=' + (page*limitOffset);
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
  }
};

exports.getRbsoul=function(req,res){
  var page = req.query.page ;
  var url = '';
  if(page >= 2){
    url = 'https://api.soundcloud.com/search/sounds?limit='+limitOffset+'&q=*&filter.tag=house&client_id='+client_id+'&offset=' + ((page-1)*limitOffset);
    requestify
     .get(url)
     .then(function(response){
       console.log('get');
        var data=JSON.parse(response.body);
        data.favorited='';
        data.success=false;
        data.user=null;
        data.songs=[];
        data.collection.forEach(function(song,index){
            song.url= '/play?id='+song.id;
            data.songs.push(song);
        });
        console.log(data.songs);
        data.tracks=data.collection;

        res.send(data);
    },function(err){
      console.log(err);
    });
  }else{
    url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:rbsoul&limit='+limitOffset+'&client_id='+client_id+'&offset='+(page*limitOffset);
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
  }
};

exports.getJazzblues=function(req,res){
  var page = req.query.page ;
  var url = '';
  if(page >= 2){
    url = 'https://api.soundcloud.com/search/sounds?limit='+limitOffset+'&q=*&filter.tag=jazzblues&client_id='+client_id+'&offset=' + ((page-1)*limitOffset);
    requestify
     .get(url)
     .then(function(response){
       console.log('get');
        var data=JSON.parse(response.body);
        data.favorited='';
        data.success=false;
        data.user=null;
        data.songs=[];
        data.collection.forEach(function(song,index){
            song.url= '/play?id='+song.id;
            data.songs.push(song);
        });
        console.log(data.songs);
        data.tracks=data.collection;

        res.send(data);
    },function(err){
      console.log(err);
    });
  }else{
    url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:jazzblues&limit='+limitOffset+'&client_id='+client_id+'&offset=' + (page*limitOffset);
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
  }
};

exports.getTrap=function(req,res){
  var page = req.query.page ;
  var url = '';
  if(page >= 2){
    url = 'https://api.soundcloud.com/search/sounds?limit='+limitOffset+'&q=*&filter.tag=trap&client_id='+client_id+'&offset=' + ((page-1)*limitOffset);
    requestify
     .get(url)
     .then(function(response){
       console.log('get');
        var data=JSON.parse(response.body);
        data.favorited='';
        data.success=false;
        data.user=null;
        data.songs=[];
        data.collection.forEach(function(song,index){
            song.url= '/play?id='+song.id;
            data.songs.push(song);
        });
        console.log(data.songs);
        data.tracks=data.collection;

        res.send(data);
    },function(err){
      console.log(err);
    });
  }else{
    url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:trap&limit='+limitOffset+'&client_id='+client_id+'&offset=' +(page*limitOffset);
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
  }
};

exports.getCountry=function(req,res){
  var page = req.query.page ;
  var url = '';
  if(page >= 2){
    url = 'https://api.soundcloud.com/search/sounds?limit='+limitOffset+'&q=*&filter.tag=country&client_id='+client_id+'&offset=' + ((page-1)*limitOffset);
    requestify
     .get(url)
     .then(function(response){
       console.log('get');
        var data=JSON.parse(response.body);
        data.favorited='';
        data.success=false;
        data.user=null;
        data.songs=[];
        data.collection.forEach(function(song,index){
            song.url= '/play?id='+song.id;
            data.songs.push(song);
        });
        console.log(data.songs);
        data.tracks=data.collection;

        res.send(data);
    },function(err){
      console.log(err);
    });
  }else{
    url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:country&limit='+limitOffset+'&client_id='+client_id+'&offset='+(page*limitOffset);
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
  }
};

exports.getDancehall=function(req,res){
  var page = req.query.page ;
  var url = '';
  if(page >= 2){
    url = 'https://api.soundcloud.com/search/sounds?limit='+limitOffset+'&q=*&filter.tag=dancehall&client_id='+client_id+'&offset=' + ((page-1)*limitOffset);
    requestify
     .get(url)
     .then(function(response){
       console.log('get');
        var data=JSON.parse(response.body);
        data.favorited='';
        data.success=false;
        data.user=null;
        data.songs=[];
        data.collection.forEach(function(song,index){
            song.url= '/play?id='+song.id;
            data.songs.push(song);
        });
        console.log(data.songs);
        data.tracks=data.collection;

        res.send(data);
    },function(err){
      console.log(err);
    });
  }else{
    url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:dancehall&limit='+limitOffset+'&client_id='+client_id+'&offset='+(page*limitOffset);
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
  }
};

exports.getDubstep=function(req,res){
  var page = req.query.page ;
  var url = '';
  if(page >= 2){
    url = 'https://api.soundcloud.com/search/sounds?limit='+limitOffset+'&q=*&filter.tag=dubstep&client_id='+client_id+'&offset=' + ((page-1)*limitOffset);
    requestify
     .get(url)
     .then(function(response){
       console.log('get');
        var data=JSON.parse(response.body);
        data.favorited='';
        data.success=false;
        data.user=null;
        data.songs=[];
        data.collection.forEach(function(song,index){
            song.url= '/play?id='+song.id;
            data.songs.push(song);
        });
        console.log(data.songs);
        data.tracks=data.collection;

        res.send(data);
    },function(err){
      console.log(err);
    });
  }else{
    url = 'https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud:genres:dubstep&limit='+limitOffset+'&client_id='+client_id+'&offset='+(page*limitOffset);
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
  }
};

exports.getTrackInfo = function(req,res){
  var id = req.params.id;
  console.log('id',id);
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

exports.getRelatedTracks = function(req,res){
  var id = req.params.id;
  console.log('id',id);
  var url = 'http://api.soundcloud.com/tracks/'+id+'/related'+'?client_id='+client_id+'&limit=10';
  requestify
   .get(url)
   .then(function(response){
     console.log('response',response);
     res.send(response.body);
   },function(err){
     console.log(err);
   });
};

exports.getRawLink=function(req,res){
  console.log(req.query);
  var id = req.query.id;
  requestify
   .head('http://api.soundcloud.com/tracks/'+id+'/stream?client_id='+client_id)
   .then(function(response){
      // var data=JSON.parse(response.headers);
      // res.send({'link':data.location});
  },function(response){

    //var data=JSON.parse(response.headers);

    // res.status(303).send(response.headers.location);
    console.log('response.headers',response.headers);
    if(response.headers.location.indexOf('ec-media.sndcdn.com/')!=-1){
      requestify
      .get('https://api.soundcloud.com/i1/tracks/'+id+'/streams?client_id='+client_id)
      .then(function(data){
        var preview = JSON.parse(data.body);
        requestify.get(preview.preview_mp3_128_url).then(function(response){
          //console.log('response song',response);
          console.log('xix');
          console.log(response.headers.date);
          //console.log('response song' , parsedJson.date);

          res.send(response.body);
        },function(response){
          console.log('error',response);
        });
        //res.redirect(preview.preview_mp3_128_url);
      });
    }else{
      res.redirect(response.headers.location);
    }
  });
};
