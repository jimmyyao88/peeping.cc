(function() {
    'use strict';
    var id;
    var currentId = 0;
    var currentTrack;
    var position;
    var shuffle = false;
    var shuffleOrder = [];
    var shuffleIndex;
    var volume = 80;
    var run = 0;
    var scrobbled;
    var progressClicked = false;
    var openNav = false;
    //end myjs.js

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    // end dataservice.js

    angular.module('app.core').factory('FlashService', FlashService);

    FlashService.$inject = ['$rootScope'];
    function FlashService($rootScope) {
        var service = {};

        service.Success = Success;
        service.Error = Error;

        initService();

        return service;

        function initService() {
            $rootScope.$on('$locationChangeStart', function () {
                clearFlashMessage();
            });

            function clearFlashMessage() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
            }
        }

        function Success(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'success',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function Error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }
    }

    angular.module('app.core').factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService) {
      $rootScope.playBtn='<div class="progress-bar-play-button"></div>';
      $rootScope.pauseBtn = '<div class="progress-bar-pause-button"></div>';
        var service = {isLoggedIn: 0};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.ForgotPassword = ForgotPassword;

        return service;

        function Login(user, callback) {

            $http.post('/soundcloud/login', user)
                .success(function (response) {
                    callback(response);
                });
        }

        function ForgotPassword(user, callback) {
            $http.post('/soundcloud/forgotpw', user)
                .success(function (response) {
                    callback(response);
                });
        }

        function SetCredentials(response) {
            service.isLoggedIn = 1;
            $rootScope.globals = {
                currentUser: {
                    user: response.user
                }
            };

            for(var i = 0; i < response.user.cookies.length; i++){
                var expires = new Date();
                expires.setTime(response.user.cookies[i].expires);
                $cookies.put(response.user.cookies[i].name, response.user.cookies[i].value, {'expires': expires, 'path': response.user.cookies[i].path, 'domain': response.user.cookies[i].domain, 'secure': response.user.cookies[i].secure});
            }

        }

        function ClearCredentials() {
            $rootScope.globals = {};
            service.isLoggedIn = 0;
            var cookies = $cookies.getAll();
            angular.forEach(cookies, function (v, k) {
                $cookies.remove(k, {domain: 'rising.fm'});
            });
        }
    }

    angular.module('app.core').factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.Create = Create;

        return service;

        function Create(user) {
            return $http.post('/soundcloud/createUser', user).then(handleSuccess, handleError('Error creating user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
    angular.module('app.core').directive('cancelRedProgress',function(){
      return {
        scope: false,
        link: function(scope, elem){
          elem.on('click',function(){
            console.log('clicked');
            $('.progress-bar-container').css('background-color',"rgb(16, 16, 16)");
          });
        }
      };
    });


    angular.module('app.core').controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope','$scope', '$location', 'AuthenticationService', 'FlashService', 'dataFactory'];

    function LoginController($rootScope, $scope, $location, AuthenticationService, FlashService, dataFactory) {
        var vm = this;
        $scope.user = null;
        $rootScope.isLoggedIn = AuthenticationService.isLoggedIn;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
            $rootScope.isLoggedIn = AuthenticationService.isLoggedIn;
            if(run === 0){
                $('body').append("<script src='/resources/sc/main.js'></script>");
                run=1;
                //window.App.init();
            }
            //window.App.closeNav();
            $rootScope.rootShow = true;
            $scope.show = true;
        })();

        $scope.login = function() {
            vm.dataLoading = true;
            AuthenticationService.Login(this.vm.user, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(response);
                    $location.path('/');
                } else {
                    AuthenticationService.isLoggedIn=0;
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
                $rootScope.isLoggedIn = AuthenticationService.isLoggedIn;
            });
        };
        $scope.isActive = function (path) {
            if(path == '/trending' && $location.path() === '/'){
                return true;
            }
            else if ($location.path().substr(0, path.length) === path) {
                return true;
            } else {
                return false;
            }
        };
    }

    angular.module('app.core').controller('ForgotPasswordController', ForgotPasswordController);

    ForgotPasswordController.$inject = ['$rootScope','$scope', '$location', 'AuthenticationService', 'FlashService', 'dataFactory'];

    function ForgotPasswordController($rootScope, $scope, $location, AuthenticationService, FlashService, dataFactory) {
        var vm = this;
        $scope.user = null;
        $rootScope.isLoggedIn = AuthenticationService.isLoggedIn;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
            if(run === 0){
                $('body').append("<script src='/resources/sc/main.js'></script>");
                run=1;
                //window.App.init();
            }
            //window.App.closeNav();
            $rootScope.isLoggedIn = AuthenticationService.isLoggedIn;
            $rootScope.rootShow = true;
            $scope.show = true;
        })();

        $scope.forgotpw = function() {
            vm.dataLoading = true;
            AuthenticationService.ForgotPassword(this.vm.user, function (response) {
                if (response.success) {
                    FlashService.Success(response.message);
                } else {
                    FlashService.Error(response.message);
                }
            });
        };


        $scope.isActive = function (path) {
            if(path == '/trending' && $location.path() === '/'){
                return true;
            }
            else if ($location.path().substr(0, path.length) === path) {
                return true;
            } else {
                return false;
            }
        };
    }

    angular.module('app.core').controller('LogoutController', LogoutController);
    LogoutController.$inject = ['$scope', '$location', 'AuthenticationService'];

    function LogoutController($scope, $location, AuthenticationService) {
        AuthenticationService.ClearCredentials();
        $location.path('/');

        $scope.isActive = function (path) {
            if(path == '/trending' && $location.path() === '/'){
                return true;
            }
            else if ($location.path().substr(0, path.length) === path) {
                return true;
            } else {
                return false;
            }
        };

    }

    angular.module('app.core').controller('JoinController', JoinController);
    JoinController.$inject = ['$scope','UserService', '$location', '$rootScope', 'AuthenticationService', 'FlashService'];
    function JoinController($scope, UserService, $location, $rootScope, AuthenticationService, FlashService) {
        var vm = this;
        $scope.user = null;
        $rootScope.isLoggedIn = AuthenticationService.isLoggedIn;
        if(run === 0){
            $('body').append("<script src='/resources/sc/main.js'></script>");
            run=1;
            //window.App.init();
        }
        $rootScope.rootShow = true;
        $scope.join = function() {
            vm.dataLoading = true;
            UserService.Create(this.vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        AuthenticationService.SetCredentials(response);
                        $location.path('/');
                    } else {
                        AuthenticationService.isLoggedIn=0;
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                    $rootScope.isLoggedIn = AuthenticationService.isLoggedIn;
                });
        };

        $scope.isActive = function (path) {
            if(path == '/trending' && $location.path() === '/'){
                return true;
            }
            else if ($location.path().substr(0, path.length) === path) {
                return true;
            } else {
                return false;
            }
        };
    }

    angular.module('app').controller('DialogCtrl', ['$scope', 'stBlurredDialog','$http','$localStorage','$rootScope', function($scope, stBlurredDialog,$http,$localStorage,$rootScope){
      $scope.dialogData = stBlurredDialog.getDialogData();
      $scope.register = function(){
        var user = {
          nickname:$scope.registerName,
          email:$scope.registerEmail,
          password:$scope.registerPassword
        };
        $http.post('/signup', {user:user}).success(function(response) {
          $localStorage.user = response.user;
          $rootScope.user = $localStorage.user;
        }).error(function(err){
          console.log('error',err);
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
        }).error(function(err){
          console.log('error',err);
        });
      };
    }]);
    angular.module('app').directive('peepingHeader',function(){
      return {
        restrict:'AE',
        templateUrl: '/resources/sc/html/header.html',
      };
    });
    angular.module('app').directive('peepingFooter',function(){
      return {
        restrict:'AE',
        templateUrl: '/resources/sc/html/footer.html',
      };
    });

    angular.module('app').controller('rootCtrl',['$rootScope','$scope','$location','$localStorage','stBlurredDialog',function($rootScope,$scope,$location,$localStorage,stBlurredDialog){
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
      $scope.openModal = function(){
         stBlurredDialog.open('/resources/sc/html/dialogTemplate.html', {msg: 'Hello from the controller!'});
       };
      $scope.logout = function(){
         $localStorage.$reset();
         $rootScope.user = false;
      };
    }]);
    angular.module('app').controller('DetailCtrl',['$scope','$state','$http',function($scope,$state,$http){
      $http.get('/track/'+$state.params.id).success(function(data){
        console.log('data',data);
        if(data.artwork_url){
          data.artwork_url=data.artwork_url.replace(/large.jpg/,'t500x500.jpg');
        }
        $scope.song = data;
        $scope.show=true;
      }).then(function(){
        return  $http.get('/tracks/related/'+$state.params.id);
      }).then(function(data){
        console.log('data',data);
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

    angular.module('app').controller('ProfileCtrl',['$scope','$state','$http',function($scope,$state,$http){
      $http
      .get('/profile/'+$state.params.id)
      .then(function(response){
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
          }
        });
        $scope.songs = response.data;
        console.log('response ddd',response);

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
          $scope.alert = '你需要收藏更多的歌曲';
        }
      }else{
        $state.go('index.trending');
      }
    }]);
    angular.module('app').controller('Project', ['AuthenticationService', '$rootScope','$scope', 'dataFactory', '$location', '$stateParams', '$state','$http','stBlurredDialog', '$q','$localStorage',function (AuthenticationService, $rootScope, $scope, dataFactory, $location, $stateParams, $state,$http,stBlurredDialog,$q,$localStorage) {
        $scope.songs = [];
        $scope.page = 0;
        $rootScope.show = true;
        $scope.haveMore = true;
        $scope.load = function(){
          //$scope.busy = true;
          getAllData();
        };
        var lastProduct = -1;
        var productsLength = 0;
        $scope.toggleLog = function(){
          $('form').animate({height: 'toggle', opacity: 'toggle'}, 'slow');
        };

        $scope.search = function(){
            $location.path('/search').search({query: this.searchTerm});
        };

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
            if(path == '/trending' && $location.path() === '/'){
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
            var path=$location.path();
            dataFactory
              .getAllData($location.path()+"?page="+$scope.page)
              .success(function (data) {
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
                    //$scope.busy = true ;
                })
                .error(function (error) {
                  $scope.loading = false ;
                    $scope.status = 'Unable to load data: ' + error.message;
                });
        }
        $scope.bindData =function (data){
          if(data.success){
              AuthenticationService.SetCredentials(data);
          }
          else{
              AuthenticationService.isLoggedIn=0;
          }
          if($location.path().indexOf('/track/') > -1){
              $scope.hideButtons = true;
          }
          $rootScope.isLoggedIn = AuthenticationService.isLoggedIn;
          $scope.show = true;
          $scope.searchTerm = "";
          angular.forEach(data.songs,function(value,index){
            if(data.songs[index].artwork_url){
              data.songs[index].artwork_url=data.songs[index].artwork_url.replace(/large.jpg/,'t500x500.jpg');
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
              //$scope.busy = false;
              if(run === 0){
                  $('body').append("<script src='/resources/sc/main.js'></script>");
                  run=1;
                  //window.App.init();
              }
              //window.App.openNav();
          });
        };
        $scope.reload = function () {
            if($state.current.name === 'index') {
                $state.go('index', {}, { reload: true });
            }
        };
    }]);
    //end controller.js
})();
