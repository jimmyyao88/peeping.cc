angular.module('app.core', []).factory('dataFactory', ['$http','$rootScope', function ($http,$rootScope) {
    // var urlBase = 'http://rising.fm/soundcloud/';
    var urlBase = '/';
    var dataFactory = {};
    var startTime;

    FastClick.attach(document.body);


    dataFactory.disconnectLastFM = function() {
        $http.defaults.withCredentials = true;
        return $http.post('/soundcloud/disconnectLastFM');
    };

    dataFactory.getAllData = function (path) {

        console.log('tracks');
        console.log(path);
        if($rootScope.user){
          return $http.get( path ,{
            headers:{
              'access_token':$rootScope.user.token
            }
          });
        }else{
          return $http.get( path );
        }

    };

    dataFactory.toggleFavorite = function (id) {
        return $http.post('/soundcloud/toggleFavorite', {'id':id});
    }

    dataFactory.getFunny = function () {
        $http.defaults.withCredentials = false;
        return $http.get('https://www.reddit.com/r/funny/hot.json');
    }

    dataFactory.getGifs = function () {
        $http.defaults.withCredentials = false;
        return $http.get('https://www.reddit.com/r/gifs/hot.json');
    }

    dataFactory.nowplaying = function (artist, track, key) {
        $http.defaults.withCredentials = false;
        var sig='api_key3da6a9e960e8fd8a6fd1b78d12db9df4artist'+artist+'methodtrack.updateNowPlayingsk'+key+'track'+track+'39c0d4290118a2a7d152de65543afaa7';
        var apiSig = CryptoJS.MD5(sig).toString();
        startTime = new Date().getTime()/1000;
        return $http.post('http://ws.audioscrobbler.com/2.0/?api_key=3da6a9e960e8fd8a6fd1b78d12db9df4&artist='+encodeURIComponent(artist)+'&method=track.updateNowPlaying&sk='+key+'&track='+encodeURIComponent(track)+"&api_sig="+apiSig);
    };

    dataFactory.scrobble = function (artist, track, key) {
        $http.defaults.withCredentials = false;
        var sig='api_key3da6a9e960e8fd8a6fd1b78d12db9df4artist'+artist+'methodtrack.scrobblesk'+key+'timestamp'+startTime+'track'+track+'39c0d4290118a2a7d152de65543afaa7';
        var apiSig = CryptoJS.MD5(sig).toString();
        return $http.post('http://ws.audioscrobbler.com/2.0/?api_key=3da6a9e960e8fd8a6fd1b78d12db9df4&artist='+encodeURIComponent(artist)+'&method=track.scrobble&sk='+key+'&timestamp='+startTime+'&track='+encodeURIComponent(track)+"&api_sig="+apiSig);
    };

    return dataFactory;
}]);
