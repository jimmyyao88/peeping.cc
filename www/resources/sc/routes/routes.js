angular.module('app').config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    //
    $httpProvider.defaults.withCredentials = true;

    //$locationProvider.html5Mode(false);
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/trending");
    //
    // Now set up the states
    $stateProvider
        .state('index', {
            url: "/?_escaped_fragment_&token",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('trending', {
            url: "/trending?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('new', {
            url: "/new?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('pop', {
            url: "/pop?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('indie', {
            url: "/indie?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('rock', {
            url: "/rock?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('hiphop', {
            url: "/hiphop?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('electronic', {
            url: "/electronic?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('deephouse', {
            url: "/deephouse?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('country', {
            url: "/country?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('dancehall', {
            url: "/dancehall?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('dubstep', {
            url: "/dubstep?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('jazzblues', {
            url: "/jazzblues?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('rbsoul', {
            url: "/rbsoul?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('house', {
            url: "/house?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('trap', {
            url: "/trap?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('remix', {
            url: "/remix?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
        })
        .state('favorites', {
            url: "/favorites?_escaped_fragment_",
            templateUrl: '/resources/sc/html/main_static.html',
            controller: 'Project'
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
