var thunderstormAnalysisnApp = angular.module('thunderstormAnalysisnApp', [
  'ngRoute',
  'ngAnimate',
  'thunderstormAnalysisControllers'
]);
 
thunderstormAnalysisnApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'collectHomeController'
      }).
	  when('/compare', {
        templateUrl: 'partials/compare.html',
        controller: 'compareController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

