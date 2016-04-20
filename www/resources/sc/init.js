angular.module('app', ['app.core', 'ui.router', 'infinite-scroll', 'chart.js', 'ngCookies','angularSoundManager'])
    .directive('onFinishRender',['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }}])
        .directive('afterRender', ['$timeout', function ($timeout) {
    return  {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $timeout(function () {
                scope.$emit('ngRepeatFinished');
            });
        }
    };
}]);
// end app.js

angular.module('app').run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
    $rootScope
        .$on('$stateChangeSuccess',
        function(event){
            if (!$window.ga)
                return;

            $window.ga('send', 'pageview', { page: $location.path() });
        });
}]);

angular.module('app').run(['$rootScope', '$window', function ($rootScope, $window) {
    // delete all the google related variables before you change the url
    $rootScope.$on('$locationChangeStart', function () {

    });
}]);
