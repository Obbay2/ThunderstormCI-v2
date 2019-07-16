var adminDataEditControllers = angular.module('adminDataEditControllers', []);

angular.module('FixModule', [], function($httpProvider)
{
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
 
  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data)
  {
    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */ 
    var param = function(obj)
    {
      var query = '';
      var name, value, fullSubName, subName, subValue, innerObj, i;
      
      for(name in obj)
      {
        value = obj[name];
        
        if(value instanceof Array)
        {
          for(i=0; i<value.length; ++i)
          {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value instanceof Object)
        {
          for(subName in value)
          {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value !== undefined && value !== null)
        {
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
      }
      
      return query.length ? query.substr(0, query.length - 1) : query;
    };
    
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
});

adminDataEditApp.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

adminDataEditControllers.controller('User', function ($scope) {
    $scope.username = "kylekyle12";
});

adminDataEditControllers.controller('MyCtrl', function ($scope, $location) {
    $scope.isActive = function (route) {
        return route === $location.path();
    }
});

adminDataEditControllers.controller('RoundController', function ($scope, $rootScope) {
    $scope.roundOrder = '-roundId';
});

adminDataEditControllers.controller('RoundRowCtrl', function ($scope, $filter, $http) {
	
	// Function to get Round data on page load
	$http({method: 'GET', url: '../../../rest/round/', params: Math.random().toString(36).substring(2), cache: false}).
	  success(function(data, status) {
		$scope.rounds = data;
	  }).
	  error(function(data, status) {
		alertm("Error loading data: "+status);
	  });

    $scope.strict = false;

    $scope.toggleStrict = function () {
        if ($scope.strict === false) {
            $scope.strict = true;
        } else {
            $scope.strict = false;
        }
    }

    // START PAGINATION

    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.rounds.length / $scope.pageSize);
    }

    $scope.changePage = function (direction) {
        if (direction == "next") {
            if ($scope.currentPage <= $scope.rounds.length / $scope.pageSize - 1) {
                $scope.currentPage = $scope.currentPage + 1;
            }
        } else if (direction == "prev") {
            if ($scope.currentPage !== 0) {
                $scope.currentPage = $scope.currentPage - 1;
            }
        }
    }

    $scope.$watch('roundSearch', function () {
        $scope.currentPage = 0;
    });
	
    $scope.$watch('roundSearch.number', function () {
        $scope.currentPage = 0;
        if ($scope.roundSearch.number !== "") {
            $scope.numberOfPages = function () {
                return 1;
            }
        } else {
            $scope.numberOfPages = function () {
                return Math.ceil($scope.rounds.length / $scope.pageSize);
            }
        }
    });
    $scope.$watch('strict', function () {
        if ($scope.strict === false) {
            $scope.roundSearch.number = "";
        }
    });

    // END PAGINATION

	// Check data before 
    $scope.checkName = function (data) {
        if (data.match(/^[0-9]+$/) == null) {
			alertm ("Number should be integer");
            return "Number should be integer";
        }
    };

	// upload/save data
    $scope.saveRound = function (data, id) {
        angular.extend(data, {
            id: id
        });
        //alertm("Attempted Data Save", 5, "info");
        //return $http.put('../../../rest/round/', data);
        
        if(data['roundId'] == undefined || data['roundId'] == "") {
			alertm("Inserted round",5,'success');
        	return $http.post('../../../rest/round/', data);
		} else {
			alertm("updated round",5,'success');
			return $http.put('../../../rest/round/', data);
		}
        
    };

    // remove data
    $scope.removeRound = function (index, opposite) {
        if ($scope.roundOrder == 'roundId') {
            $scope.rounds.splice(opposite, 1);
        } else {
            $scope.rounds.splice(index, 1);
        }
        alertm("Data Removed", 5, "success");
    };

    // add data
    $scope.addRound = function () {
		if ($scope.roundOrder == '-roundId') {
			$scope.inserted = {
				name: '',
			};
			$scope.rounds.push($scope.inserted);
			alertm("Data Added", 5, "success");
		} else {
			alertm("Sort from newest to add data.");	
		}
    };

});


  ///////////////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////// TEAM ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////


adminDataEditControllers.controller('TeamController', function ($scope, $rootScope) {
	$scope.teamOrder = '-teamNumber';
});

adminDataEditControllers.controller('TeamRowCtrl', function ($scope, $filter, $http) {
	
	// Function to get Round data on page load
	$http({method: 'GET', url: '../../../rest/team/', params: Math.random().toString(36).substring(2), cache: false}).
	  success(function(data, status) {
		$scope.teams = data;
	  }).
	  error(function(data, status) {
		alertm("Error loading data: "+status);
	  });

    $scope.strict = false;

    $scope.toggleStrict = function () {
        if ($scope.strict === false) {
            $scope.strict = true;
        } else {
            $scope.strict = false;
        }
    }

    // START PAGINATION

    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.teams.length / $scope.pageSize);
    }

    $scope.changePage = function (direction) {
        if (direction == "next") {
            if ($scope.currentPage <= $scope.teams.length / $scope.pageSize - 1) {
                $scope.currentPage = $scope.currentPage + 1;
            }
        } else if (direction == "prev") {
            if ($scope.currentPage !== 0) {
                $scope.currentPage = $scope.currentPage - 1;
            }
        }
    }

    $scope.$watch('teamSearch', function () {
        $scope.currentPage = 0;
    });
	
    $scope.$watch('teamSearch.teamNumber', function () {
        $scope.currentPage = 0;
        if ($scope.teamSearch.teamNumber !== "") {
            $scope.numberOfPages = function () {
                return 1;
            }
        } else {
            $scope.numberOfPages = function () {
                return Math.ceil($scope.teams.length / $scope.pageSize);
            }
        }
    });
    $scope.$watch('strict', function () {
        if ($scope.strict === false) {
            $scope.teamSearch.teamNumber = "";
        }
    });

    // END PAGINATION

	// Check data before 
    $scope.checkName = function (data) {
        if (data.match(/^[0-9]+$/) == null) {
			alertm ("Number should be integer");
            return "Number should be integer";
        }
    };

	// upload/save data
    $scope.saveTeam = function (data, id) {
        angular.extend(data, {
            id: id
        });
        alertm("Attempted Data Save", 5, "info");
		if(data['teamId'] == undefined || data['teamId'] == "") {
			alertm("POST");
        	return $http.post('../../rest/team/', data);
		} else {
			alertm("PUT");
			return $http.put('../../rest/team/', data);
		}
    };

    // remove data
    $scope.removeTeam = function (index, opposite) {
        if ($scope.teamOrder == 'teamNumber') {
            $scope.teams.splice(opposite, 1);
        } else {
            $scope.teams.splice(index, 1);
        }
        alertm("Data Removed", 5, "success");
    };

    // add data
    $scope.addTeam = function () {
		if ($scope.teamOrder == '-teamNumber') {
			$scope.inserted = {
				name: '',
			};
			$scope.teams.push($scope.inserted);
			alertm("Data Added", 5, "success");
		} else {
			alertm("Sort from newest to add data.");
		}
    };

});
	
	
	
	
	
  ///////////////////////////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////// Robot Details ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////


adminDataEditControllers.controller('RobotDetailsController', function ($scope, $rootScope) {
	$scope.robotDetailsOrder = '-robotDetailsId';
});

adminDataEditControllers.controller('robotDetailsRowCtrl', function ($scope, $filter, $http) {
	
	// Function to get Round data on page load
	$http({method: 'GET', url: '../../../rest/robotDetails/', params: Math.random().toString(36).substring(2), cache: false}).
	  success(function(data, status) {
		$scope.robotDetails = data;
	  }).
	  error(function(data, status) {
		alertm("Error loading data: "+status);
	  });
	  
	$http({method: 'GET', url: '../../../rest/robot/', params: Math.random().toString(36).substring(2), cache: false}).
	  success(function(data, status) {
		$scope.robots = data;
		for (var i = 0; i < $scope.robotDetails.length; i++){
		  for (var l = 0; l < $scope.robots.length; l++){
			  if ($scope.robotDetails[i].robotId == $scope.robots[l].robotId){
				 $scope.robotDetails[i].teamNumber = $scope.robots[l].teamNumber;
			  }
			}
			console.log("k");
		}
	  }).
	  error(function(data, status) {
		alertm("Error loading data: "+status);
	  });
	
	
	
	$scope.getTeamNumber = function(id) {
		for (var i = 0; i < $scope.robots.length; i++){
			
		  if ($scope.robots[i].robotId == id){
		     return $scope.robots[i].teamNumber
		  }
		}
	}

    // START PAGINATION

    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.robotDetails.length / $scope.pageSize);
    }

    $scope.changePage = function (direction) {
        if (direction == "next") {
            if ($scope.currentPage <= $scope.robotDetails.length / $scope.pageSize - 1) {
                $scope.currentPage = $scope.currentPage + 1;
            }
        } else if (direction == "prev") {
            if ($scope.currentPage !== 0) {
                $scope.currentPage = $scope.currentPage - 1;
            }
        }
    }

    $scope.$watch('robotDetailsSearch', function () {
        $scope.currentPage = 0;
    });

    // END PAGINATION

});
	