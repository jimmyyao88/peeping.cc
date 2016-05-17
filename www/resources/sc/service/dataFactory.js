angular.module('app').factory('dataFactory', ['$http','$rootScope','$state', function ($http,$rootScope,$state) {
    // var urlBase = 'http://rising.fm/soundcloud/';
    var urlBase = '/';
    var dataFactory = {};

    FastClick.attach(document.body);

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

    return dataFactory;
}]);
