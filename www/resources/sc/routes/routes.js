angular.module('app').config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    //
    $httpProvider.defaults.withCredentials = true;

    //$locationProvider.html5Mode(false);
    if($rootScope.user){
      $urlRouterProvider.otherwise("/charts/recomend");
    }else{
      $urlRouterProvider.otherwise("/charts/trending");
    }
    //
    // Now set up the states
    $stateProvider
        .state('index', {
            url: "/charts",
            abstract:true,
            views:{
              'header':{
                templateUrl:'/resources/sc/html/header.html',
                controller: 'rootCtrl'
              },
              'footer':{
                templateUrl:'/resources/sc/html/footer.html',
                controller: 'rootCtrl'
              },
              'progress':{
                templateUrl:'/resources/sc/html/progress.html',
                controller: 'rootCtrl'
              },
              'main':{
                templateUrl:'/resources/sc/html/main_static.html',
                controler: 'rootCtrl'
              }
            },
        })
        .state('index.recommend',{
            url: "/recommend",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Recommend'
        })
        .state('index.trending', {
            url: "/trending",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.new', {
            url: "/new",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.pop', {
            url: "/pop",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.indie', {
            url: "/indie",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.rock', {
            url: "/rock",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.hiphop', {
            url: "/hiphop",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.electronic', {
            url: "/electronic",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.deephouse', {
            url: "/deephouse",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.country', {
            url: "/country",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.dancehall', {
            url: "/dancehall",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.dubstep', {
            url: "/dubstep",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.jazzblues', {
            url: "/jazzblues",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.rbsoul', {
            url: "/rbsoul",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.house', {
            url: "/house",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.trap', {
            url: "/trap",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.remix', {
            url: "/remix",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.favorites', {
            url: "/favorites",
            templateUrl: '/resources/sc/html/tiles.html',
            controller: 'Project'
        })
        .state('index.detail',{
          url: "/detail/:id",
          templateUrl: '/resources/sc/html/detail.html',
          controller: 'DetailCtrl'
        })
        .state('index.profile',{
          url: '/profile/:id',
          templateUrl: '/resources/sc/html/profile.html',
          controller: 'ProfileCtrl'
        })
        .state('lastfm', {
            url: "/lastfm",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('login', {
            url: "/login?_escaped_fragment_",
            templateUrl: '/resources/sc/html/login_static.html',
            controller: 'LoginController'
        })
        .state('forgotpw', {
            url: "/forgotpw?_escaped_fragment_",
            templateUrl: '/resources/sc/html/forgotpw_static.html',
            controller: 'ForgotPasswordController'
        })
        .state('logout', {
            url: "/logout?_escaped_fragment_",
            templateUrl: '/resources/sc/html/login_static.html',
            controller: 'LogoutController'
        })
        .state('join', {
            url: "/join?_escaped_fragment_",
            templateUrl: '/resources/sc/html/join_static.html',
            controller: 'JoinController'
        })
        .state('search', {
            url: "/search?query={search}",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('track', {
            url: "/track/{trackname}?_escaped_fragment_",
            templateUrl: '/resources/sc/html/track_static.html',
            controller: 'Project'
        });
}]);
