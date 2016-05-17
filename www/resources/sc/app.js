(function() {
    'use strict';
    var id;
    var currentId = 0;
    var currentTrack;
    var position;
    var shuffle = false;
    var shuffleOrder = [];
    var shuffleIndex;
    var init = true;
    // end myjs.js
    // end dataservice.js
    angular.module('app').controller('DialogCtrl', ['$scope', 'stBlurredDialog','$http','$localStorage','$rootScope', function($scope, stBlurredDialog,$http,$localStorage,$rootScope){
      $scope.dialogData = stBlurredDialog.getDialogData();
      $scope.toggleLog = function(){
        $('form').animate({height: 'toggle', opacity: 'toggle'}, 'slow');
      };
      $scope.register = function(){
        var user = {
          nickname:$scope.registerName,
          email:$scope.registerEmail,
          password:$scope.registerPassword
        };
        $http.post('/signup', {user:user}).success(function(response) {
          $localStorage.user = response.user;
          $rootScope.user = $localStorage.user;
          $scope.close();
        }).error(function(err){
          console.log('error',err);
          alert('invalid access');
        });
      };
      $scope.login = function(){
        var user = {
          email:$scope.signinEmail,
          password:$scope.signinPassword
        };
        $http.post('/signin', {user:user}).success(function(response) {
          $localStorage.user = response.user;
          $rootScope.user = $localStorage.user;
          $scope.close();
        }).error(function(err){
          console.log('error',err);
          alert('invalid access');
        });
      };
    }]);
    angular.module('app').directive('firstClick',['$rootScope',function($rootScope){
      return {
        restrict: 'EA',
        link: function(scope,elem,attr){
          elem.on('click',function(){
            $rootScope.firstClick = false;
            $rootScope.$digest();
          });
        }
      };
    }]);
    angular.module('app').controller('rootCtrl',['$rootScope','$scope','$location','$localStorage','stBlurredDialog','$state',function($rootScope,$scope,$location,$localStorage,stBlurredDialog,$state){
      $rootScope.firstClick = true;
      $rootScope.closeMenu = function(){
        $('#hamburger').prop('checked', false);
      };
      $scope.isActive = function (path) {
        if(path == '/trending' && $location.path() === '/'){
            return true;
        }
        else if ($location.path().substr( -path.length,path.length ) === path) {
            return true;
        } else {
            return false;
        }
      };
      $scope.search = function(){
        $location.path('/charts/search').search({query: this.searchTerm});
        $rootScope.closeMenu();
      };
      $scope.openModal = function(){
         stBlurredDialog.open('/resources/sc/html/dialogTemplate.html', {msg: 'Hello from the controller!'});
       };
      $scope.logout = function(){
         $localStorage.$reset();
         $rootScope.user = false;
      };
      $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
          $rootScope.previousState = from.name;
          $rootScope.currentState = to.name;
      });
      $rootScope.back = function(){
        $state.go($rootScope.previousState);
      };
    }]);
    angular.module('app').controller('DetailCtrl',['$scope','$state','$http','$rootScope',function($scope,$state,$http,$rootScope){
      $http.get('/track/'+$state.params.id).success(function(data){
        $rootScope.isLoaded = true;
        console.log('data',data);
        if(data.artwork_url){
          data.artwork_url=data.artwork_url.replace(/large.jpg/,'t500x500.jpg');
        }else{
         data.artwork_url = '/images/sc.jpg' ;
        }
        $scope.song = data;
        $scope.show=true;
      }).then(function(){
        return  $http.get('/tracks/related/'+$state.params.id);
      }).then(function(data){
        angular.forEach(data.data,function(song,index){
          if(!data.data[index].artwork_url){
           data.data[index].artwork_url = '/images/sc.jpg' ;
          }
        });
        $scope.relatedSongs = data.data;

      });

      $scope.showDesc = false;
      $scope.toggleStatus = "展开";

      $scope.toggleDesc = function(){
        if($scope.showDesc){
          $('.detail-description-container').css('height','40px');
          $scope.showDesc = false;
          $scope.toggleStatus = "展开";
        }else{
          $('.detail-description-container').css('height','auto');
          $scope.showDesc = true;
          $scope.toggleStatus = "折叠";
        }

      };
    }]);
    angular.module('app').controller('SearchCtrl',['$scope','$rootScope','$state','$http',function($scope,$rootScope,$state,$http){
          $scope.page = 0 ;
          $scope.haveMore = true ;
          $scope.songs = [];
          $scope.load = function(){
             $scope.loading = true;
             var params = $state.params;
             if(params.query.length>0){
               $http.get('/tracks/search?query='+params.query)
               .then(function(response){
                 $rootScope.isLoaded = true;
                   angular.forEach(response.data,function(song,index){
                     if(response.data[index].artwork_url){
                       response.data[index].artwork_url = response.data[index].artwork_url.replace(/large.jpg/,'t500x500.jpg');
                     }else{
                      response.data[index].artwork_url = '/images/sc.jpg' ;
                     }
                   });
                    angular.forEach(response.data,function(song,index){
                      $scope.songs.push(song);
                    });
                    $scope.page++;
                    $scope.loading = false;
                    if(response.data.length>=10){
                      $scope.haveMore = true;
                    }else {
                      $scope.haveMore = false;
                    }
               },function(response){
               });
             }else{
               $scope.loading = false;
               $scope.haveMore = false;
             }
            // var favorites=$localStorage.user.favorites.slice($scope.page*3,$scope.page*3+3);
            // console.log(favorites);
            // if (favorites.length>0){
            //
            //   $http.get('/tracks/recommend',{'favorites':favorites}).then(function(response){
            //     angular.forEach(response.data,function(song,index){
            //       if(response.data[index].artwork_url){
            //         response.data[index].artwork_url = response.data[index].artwork_url.replace(/large.jpg/,'t500x500.jpg');
            //       }
            //     });
            //     angular.forEach(response.data,function(song,index){
            //       $scope.songs.push(song);
            //     });
            //     $scope.page++;
            //     $scope.loading = false;
            //     if(response.data.length>=30){
            //       $scope.haveMore = true;
            //     }else {
            //       $scope.haveMore = false;
            //     }
            //   });
            // }else{
            //   $scope.loading = false;
            //   $scope.haveMore = false;
            // }
          };
    }]);
    angular.module('app').controller('ProfileCtrl',['$scope','$state','$http','$rootScope',function($scope,$state,$http,$rootScope){
      $http
      .get('/profile/'+$state.params.id)
      .then(function(response){
        $rootScope.isLoaded = true;
        $scope.show = true;
        if(response.data.avatar_url){
          response.data.avatar_url=response.data.avatar_url.replace(/large.jpg/,'t500x500.jpg');
        }
        $scope.profile = response.data;
        return $http.get('/profile/'+$state.params.id+'/tracks');
      }).then(function(response){
        angular.forEach(response.data,function(value,index){
          if(response.data[index].artwork_url){
            response.data[index].artwork_url = response.data[index].artwork_url.replace(/large.jpg/,'t500x500.jpg');
          }else{
           response.data[index].artwork_url = '/images/sc.jpg' ;
          }
        });
        $scope.songs = response.data;
      });
      $scope.showDesc = false;
      $scope.toggleStatus = "展开";
      $scope.toggleDesc = function(){
        if($scope.showDesc){
          $('.detail-description-container').css('height','40px');
          $scope.showDesc = false;
          $scope.toggleStatus = "展开";
        }else{
          $('.detail-description-container').css('height','auto');
          $scope.showDesc = true;
          $scope.toggleStatus = "折叠";
        }
      };
    }]);
    angular.module('app').controller('Recommend',['$scope','$http','$localStorage','$rootScope','$state',function($scope,$http,$localStorage,$rootScope,$state){
      $scope.haveMore = true;
      $rootScope.show = true;
      $scope.songs = [];
      $rootScope.rootShow = true;
      $scope.page = 0;
      if($rootScope.user){
        if($rootScope.user.favorites.length){
          $scope.page = 0 ;
          $scope.load = function(){
            $scope.loading = true;
            var favorites=$localStorage.user.favorites.slice($scope.page*3,$scope.page*3+3);
            console.log(favorites);
            if (favorites.length>0){
              $http.post('/tracks/recommend',{'favorites':favorites}).then(function(response){
                angular.forEach(response.data,function(song,index){
                  if(response.data[index].artwork_url){
                    response.data[index].artwork_url = response.data[index].artwork_url.replace(/large.jpg/,'t500x500.jpg');
                  }
                });
                angular.forEach(response.data,function(song,index){
                  $scope.songs.push(song);
                });
                $scope.page++;
                $scope.loading = false;
                if(response.data.length>=30){
                  $scope.haveMore = true;
                }else {
                  $scope.haveMore = false;
                }
              });
            }else{
              $scope.loading = false;
              $scope.haveMore = false;
            }
          };
        }else{
          $scope.showAlert = true;
          $scope.alert = '你需要收藏更多的歌曲,来获得peeping给你的推荐';
        }
      }else{
        $state.go('index.trending');
      }
    }]);
    angular.module('app').controller('Project', [ '$rootScope','$scope', 'dataFactory', '$location', '$stateParams', '$state','$http','stBlurredDialog', '$q','$localStorage',function ( $rootScope, $scope, dataFactory, $location, $stateParams, $state,$http,stBlurredDialog,$q,$localStorage) {
        $scope.songs = [];
        $scope.page = 0;
        $rootScope.show = true;
        $scope.haveMore = true;
        if(!init){
          $('.music-nav').find('li').removeClass('is-active');
          init = false;
        }else{
          init = false;
        }
        $scope.load = function(){
          //$scope.busy = true;
          getAllData();
        };
        var lastProduct = -1;
        var productsLength = 0;

        $scope.favorite = function(id, index){
            if($rootScope.user){
              console.log('id',id);
              $http.post(
                '/favorite/save',
                {id:id},
                {
                  headers:{
                    'access_token':$rootScope.user.token
                  }
                }).success(function(response) {
                console.log('response',response);
              }).error(function(err){
                console.log('error',err);
              });
            }
        };

        $scope.loadMore = function() {
            $stateParams.position = $scope.tracks.length;
            dataFactory.getAllData($location.path(),$stateParams)
                .success(function (data) {
                  console.log('loadmore',data);
                    for(var i = 0; i < data.tracks.length; i++){
                        $scope.tracks.push(data.tracks[i]);
                    }
                });
        };

        $scope.isActive = function (path) {
          console.log('path',path);
            if(path == '/charts/trending' && $location.path() === '/'){
                return true;
            }
            else if ($location.path().substr(0, path.length) === path) {
                return true;
            } else {
                return false;
            }
        };

        function getAllData() {
          $scope.loading = true;
          if($location.path().indexOf('favorites')>-1){
            if(!$rootScope.user){
              $state.go('index.trending');
              return;
            }else {
              if(!$rootScope.user.favorites.length){
                $state.go('index.trending');
                return;
              }
            }
          }
            var path=$location.path();
            dataFactory
              .getAllData($location.path()+"?page="+$scope.page)
              .success(function (data) {
                $rootScope.isLoaded = true;
                  console.log('data',data);
                    if($location.path().indexOf('favorites')>-1){
                      var promiseArr = [];
                      angular.forEach(data,function(value,index){
                        var promise = $http.get('/track?id='+value).then(function(response){
                          return response.data;
                        });
                        promiseArr.push(promise);
                      });
                      $q.all(promiseArr).then(function(response){
                        var data = {};
                        data.favorited='';
                        data.success=false;
                        data.user=null;
                        data.songs=[];
                        response.forEach(function(song,index){
                             song.url= '/play?id='+song.id;
                             data.songs.push(song);
                        });
                        $scope.bindData(data);
                      });
                    }else{
                      $scope.bindData(data);
                    }
                    $scope.loading = false ;
                })
                .error(function (error) {
                  $scope.loading = false ;
                    $scope.status = 'Unable to load data: ' + error.message;
                });
        }
        $scope.bindData =function (data){

          if($location.path().indexOf('/track/') > -1){
              $scope.hideButtons = true;
          }
          $scope.show = true;
          $scope.searchTerm = "";
          angular.forEach(data.songs,function(value,index){
            if(data.songs[index].artwork_url){
              data.songs[index].artwork_url=data.songs[index].artwork_url.replace(/large.jpg/,'t500x500.jpg');
            }else{
             data.songs[index].artwork_url = '/images/sc.jpg' ;
            }
          });
          angular.forEach(data.songs,function(song,index){
            $scope.songs.push(song);
          });
          if(typeof $rootScope.header === 'undefined'){
              $rootScope.header = "Rising.fm | New Music Discovery";
          }
          $scope.page++;
          $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
              $rootScope.rootShow = true;
          });
        };
    }]);
    // end controller.js
})();
