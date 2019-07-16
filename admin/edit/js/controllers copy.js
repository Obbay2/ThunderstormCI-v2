var adminDataEditControllers = angular.module('adminDataEditControllers', []);

adminDataEditControllers.controller('User', function ($scope) {
  $scope.username = "kylekyle12";
});

adminDataEditControllers.controller('MyCtrl', function($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    }
});

adminDataEditControllers.controller('ScoreController', function ($scope, $rootScope) {
	
});

adminDataEditControllers.controller('RoundController', function ($scope, $rootScope) {
	$scope.roundOrder = '-number';
	
	
	
});










adminDataEditControllers.controller('RoundRowCtrl', function($scope, $filter, $http) {
	
  $scope.rounds = [
    {id: 1, number: '1', red1: "1111", red2: "2222", red3: "3333", blue1: "4444", blue2: "5555", blue3: "6666", redScore: "65", blueScore: "95", notes: "Good Game"},
	{id: 2, number: '2', red1: "4565", red2: "7868", red3: "4562", blue1: "2811", blue2: "4505", blue3: "456", redScore: "20", blueScore: "135", notes: ""},
	{id: 3, number: '3', red1: "2811", red2: "7654", red3: "9786", blue1: "2345", blue2: "2333", blue3: "2267", redScore: "189", blueScore: "56", notes: "Best Game"}
  ];
  
  $scope.setupPopups = function() {
    $(".pop").each(function() {
    	var $pElem= $(this);
    	$("#"+$pElem.attr("id")).popover({
        	trigger: 'click'
        });
		$("#"+$pElem.attr("id")).on('shown.bs.popover', function () {
			$(document).click(function() {
				alert("outside",1,"info");
			});
		})
	});
	return "del";
  };

  $scope.checkName = function(data, id) {
    if (id === 2 && data !== 'awesome') {
      return "Username 2 should be `awesome`";
    }
  };

  $scope.saveRound = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {id: id});
	alert("Attempted Data Save",5,"info");
    return $http.post('http://ci.stormbots.com/practice/Practice/data/phones.json', data);
  };

  // remove user
  $scope.removeRound = function(index,opposite) {
	if ($scope.roundOrder == 'number'){
    	$scope.rounds.splice(opposite, 1);
	} else {
		$scope.rounds.splice(index, 1);
	}
	alert("Data Removed",5,"success");
  };

  // add user
  $scope.addRound = function() {
    $scope.inserted = {
      id: $scope.rounds.length+1,
      name: '',
      status: null,
      group: null 
    };
    $scope.rounds.push($scope.inserted);
	alert("Data Added",5,"success");
  };
  
});
