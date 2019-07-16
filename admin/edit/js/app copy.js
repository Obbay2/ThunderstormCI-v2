var adminDataEditApp = angular.module('adminDataEditApp', [
  'ngRoute',
  'adminDataEditControllers',
  'xeditable'
]);
 
adminDataEditApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/score', {
        templateUrl: 'partials/score.html',
        controller: 'ScoreController'
      }).
      when('/round', {
        templateUrl: 'partials/round.html',
        controller: 'RoundController'
      }).
	  when('/team', {
        templateUrl: 'partials/team.html',
        controller: 'TeamController'
      }).
	  when('/robot', {
        templateUrl: 'partials/robot.html',
        controller: 'RobotController'
      }).
	  when('/robot-details', {
        templateUrl: 'partials/robot-details.html',
        controller: 'RobotDetailsController'
      }).
      otherwise({
        redirectTo: '/round'
      });
  }]);

adminDataEditApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});