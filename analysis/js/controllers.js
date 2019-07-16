var thunderstormAnalysisControllers = angular.module('thunderstormAnalysisControllers', []);

thunderstormAnalysisControllers.controller('User', function ($scope) {
    $scope.username = "kylekyle12";
});

thunderstormAnalysisControllers.controller('MyCtrl', function ($scope, $location) {
    $scope.isActive = function (route) {
        return route === $location.path();
    }
});

thunderstormAnalysisControllers.controller('collectHomeController', function ($scope, $rootScope) {
	$rootScope.startSaving = false;
	
	$rootScope.newRobotId = null;
   
});

thunderstormAnalysisControllers.controller('compareController', function ($scope, $rootScope) {
	
	
   
});