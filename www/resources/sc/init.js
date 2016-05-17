angular.module('app', [ 'ui.router', 'infinite-scroll', 'chart.js', 'ngCookies','angularSoundManager','stBlurredDialog','ngStorage','infinite-scroll'])
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
        };}])
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

angular.module('app').run(['$rootScope', '$location', '$window','$localStorage', function($rootScope, $location, $window,$localStorage){
  if($localStorage.user){
    $rootScope.user=$localStorage.user;
  }
}]);

// angular.module('app',[]).controller('myCtrl',function(){
//
// });
