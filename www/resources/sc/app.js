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

    function setValue(e, v) {
        var instance = $("#circle-md").data('circle-progress');
        $(instance.canvas).stop(true, true);
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
            $('.progress-bar-container').css('background-color','#fff');
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
                window.App.init();
            }
            window.App.closeNav();
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
                window.App.init();
            }
            window.App.closeNav();
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
            window.App.init();
        }
        window.App.closeNav();
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
          console.log('response',response);
          $localStorage.user = response.user;
          $rootScope.user = $localStorage.user;
        }).error(function(err){
          console.log('error',err);
        });
      };
    }]);


    angular.module('app').controller('Project', ['AuthenticationService', '$rootScope','$scope', 'dataFactory', '$location', '$stateParams', '$state','$http','stBlurredDialog', '$q',function (AuthenticationService, $rootScope, $scope, dataFactory, $location, $stateParams, $state,$http,stBlurredDialog,$q) {
        //alert(1);
        getAllData();
        var lastProduct = -1;
        var productsLength = 0;
        $scope.toggleLog = function(){
          $('form').animate({height: 'toggle', opacity: 'toggle'}, 'slow');
        };
        $scope.openModal = function(){
           stBlurredDialog.open('/resources/sc/html/dialogTemplate.html', {msg: 'Hello from the controller!'});
         };
        $scope.search = function(){
            console.log(this.searchTerm);
            var searchTerm=this.searchTerm;
            $http.get('/search?q='+searchTerm).success(function(data){
              $scope.tracks=[];
              for(var i = 0; i < data.length; i++){
                  var temp=data[i];
                  data[i]={};
                  data[i].track=temp;
                  $scope.tracks.push(data[i]);
              }
              console.log('data',data);
            });
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

        $scope.disconnectLastFM = function(){
            if(AuthenticationService.isLoggedIn){
                dataFactory.disconnectLastFM()
                    .success(function (data) {
                        if (data.success) {
                            AuthenticationService.SetCredentials(data);
                        } else {
                            AuthenticationService.isLoggedIn=0;
                        }
                        $rootScope.isLoggedIn = AuthenticationService.isLoggedIn;
                    });
            }
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
            var path=$location.path();
            console.log('path',path);
            dataFactory
              .getAllData($location.path(),$stateParams)
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
                        console.log('response promise arr',response);
                        var data = {};
                        data.favorited='';
                        data.success=false;
                        data.user=null;
                        data.songs=[];
                        response.forEach(function(song,index){
                             song.url= '/play?id='+song.id;
                             data.songs.push(song);
                        });
                        // data.tracks=data.collection;
                        //data.songs = response;
                        bindData(data);
                      });
                    }else{
                      bindData(data);
                    }

                })
                .error(function (error) {
                    $scope.status = 'Unable to load data: ' + error.message;
                });
        }
        function bindData (data){
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
          $scope.songs = data.songs;
          console.log('$scope.songs',$scope.songs);
          if(typeof $rootScope.header === 'undefined'){
              $rootScope.header = "Rising.fm | New Music Discovery";
          }


          $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
              $rootScope.rootShow = true;
              //player.play(currentId,volume,progressClicked);

              if(run == 0){
                  $('body').append("<script src='/resources/sc/main.js'></script>");
                  run=1;
                  window.App.init();
              }
              window.App.openNav();
          });
        }
        $scope.reload = function () {
            if($state.current.name === 'index') {
                $state.go('index', {}, { reload: true });
            }
        };

    }]);

    //end controller.js
})();
