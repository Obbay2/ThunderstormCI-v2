var thunderstormCollectionControllers = angular.module('thunderstormCollectionControllers', []);

thunderstormCollectionControllers.controller('User', function ($scope) {
    $scope.username = "kylekyle12";
});

thunderstormCollectionControllers.controller('MyCtrl', function ($scope, $location) {
    $scope.isActive = function (route) {
        return route === $location.path();
    }
});

thunderstormCollectionApp.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

thunderstormCollectionControllers.controller('collectHomeController', function ($scope, $rootScope) {
	$rootScope.startSaving = false;
	
	$rootScope.newRobotId = null;
   
});

thunderstormCollectionControllers.controller('collectTeamController', function ($scope, $http, $rootScope) {
	$rootScope.newRobotId = null;
    $rootScope.startSaving = false;
    $scope.submitTeam = function() {
		$http({method: 'POST', url: '../../rest/team/', params: Math.random().toString(36).substring(2), data: {teamNumber: $scope.teamNumberEnter, teamName: $scope.teamName, schoolName: $scope.schoolName, city: $scope.city, state: $scope.state, leaderFullName: $scope.leaderFullName, yearFounded: $scope.yearFounded, notes: $scope.notes, }, cache: false}).
			  success(function(data, status) {
				if(data) {
					alertm("Team Added Successfully", 5, "success");
					$scope.teamNumberEnter = null;
					$scope.teamName = null;
					$scope.schoolName = null;
					$scope.city = null;
					$scope.state = null;
					$scope.leaderFullName = null;
					$scope.yearFounded = null;
					$scope.notes = null;
					
				} else {
					alertm("Server error. Please retry", 6, "error");
				}
			  }).
			  error(function(data, status) {
				if(status==409) {
					alertm('That team already exists! <br /> Edit it on the <a href="#/teamSearch">search page</a>', 10, "error");
				}else {
					alertm("Error saving data. Please retry", 6, "error");
				}
			  });
	}
   
});

thunderstormCollectionControllers.controller('searchTeamController', function ($scope, $rootScope) {
	$rootScope.newRobotId = null;
	
	$scope.teamOrder = '-teamNumber';
});

thunderstormCollectionControllers.controller('TeamRowCtrl', function ($scope, $http, $rootScope) {
    // Function to get Round data on page load
	$http({method: 'GET', url: '../../rest/team/', params: Math.random().toString(36).substring(2), cache: false}).
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
        alertm("Team Edited", 5, "info");
		if(data['teamId'] == undefined || data['teamId'] == "") {
        	return $http.post('../../rest/team/', data);
		} else {
			return $http.put('../../rest/team/', data);
		}
    };

    // remove data - NOT USED RIGHT NOW ON THIS PAGE
    $scope.removeTeam = function (index, opposite) {
        if ($scope.teamOrder == 'teamNumber') {
            $scope.teams.splice(opposite, 1);
        } else {
            $scope.teams.splice(index, 1);
        }
        alertm("Data Removed", 5, "success");
    };

    // add data - NOT USED RIGHT NOW ON THIS PAGE
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

thunderstormCollectionControllers.controller('collectRobotController', function ($scope, $http, $rootScope) {
	$rootScope.startSaving = false;
	
	$scope.submitRobot = function() {
		$http({method: 'POST', url: '../../rest/robot/teamNumber/'+$scope.teamNumberRobotEnter, params: Math.random().toString(36).substring(2), data: {teamNumber: $scope.teamNumberRobotEnter, driveTrain: $scope.driveTrain, numDriveTrainMotors: $scope.numDriveTrainMotors, typeDriveTrainMotors: $scope.typeDriveTrainMotors, numOtherMotors: $scope.numOtherMotors, typeOtherMotors: $scope.typeOtherMotors, weight: $scope.weight, programmingLanguage: $scope.programmingLanguage, autonomous: $scope.robotEnterAutonomous, notes: $scope.robotEnterNotes}, cache: false}).
			  success(function(data, status) {
				if(data) {
					alertm("Robot Added Successfully", 5, "success");
					$scope.teamNumberRobotEnter = null;
					$scope.driveTrain = null;
					$scope.numDriveTrainMotors = null;
					$scope.typeDriveTrainMotors = null;
					$scope.numOtherMotors = null;
					$scope.typeOtherMotors = null;
					$scope.weight = null;
					$scope.programmingLanguage = null;
					$scope.robotEnterAutonomous = null;
					$scope.robotEnterNotes = null;
					
					$rootScope.newRobotId = data;
					
					window.location = "#/robotDetails";
					
					alertm("Now enter Robot Details", 10, "info");
					
				} else {
					alertm("Server error. Please retry", 6, "error");
				}
			  }).
			  error(function(data, status) {
				alertm("Error saving data. Please retry", 6, "error");
			  });
	}
	
	$scope.updateRobot = function() {
		$http({method: 'PUT', url: '../../rest/robot/teamNumber/'+$scope.teamNumberRobotEnter, params: Math.random().toString(36).substring(2), data: {teamNumber: $scope.teamNumberRobotEnter, driveTrain: $scope.driveTrain, numDriveTrainMotors: $scope.numDriveTrainMotors, typeDriveTrainMotors: $scope.typeDriveTrainMotors, numOtherMotors: $scope.numOtherMotors, typeOtherMotors: $scope.typeOtherMotors, weight: $scope.weight, programmingLanguage: $scope.programmingLanguage, autonomous: $scope.robotEnterAutonomous, notes: $scope.robotEnterNotes}, cache: false}).
			  success(function(data, status) {
				if(data) {
					alertm("Robot Updated Successfully", 5, "success");
					$scope.teamNumberRobotEnter = null;
					$scope.driveTrain = null;
					$scope.numDriveTrainMotors = null;
					$scope.typeDriveTrainMotors = null;
					$scope.numOtherMotors = null;
					$scope.typeOtherMotors = null;
					$scope.weight = null;
					$scope.programmingLanguage = null;
					$scope.robotEnterAutonomous = null;
					$scope.robotEnterNotes = null;
					
					$rootScope.newRobotId = data;
					
					//window.location = "#/robotDetails";
					
					//alertm("Now enter Robot Details", 10, "info");
					
				} else {
					alertm("Server error. Please retry", 6, "error");
				}
			  }).
			  error(function(data, status) {
				alertm("Error saving data. Please retry", 6, "error");
			  });
	}
	
	$scope.getRobot = function() {
		$http({method: 'GET', url: '../../rest/robot/teamNumber/'+$scope.teamNumberRobotEnter, params: Math.random().toString(36).substring(2), cache: false}).
			  success(function(data, status) {
				if(data) {
					$scope.driveTrain = null;
					$scope.numDriveTrainMotors = null;
					$scope.typeDriveTrainMotors = null;
					$scope.numOtherMotors = null;
					$scope.typeOtherMotors = null;
					$scope.weight = null;
					$scope.programmingLanguage = null;
					$scope.robotEnterAutonomous = null;
					$scope.robotEnterNotes = null;
					
					$scope.teamNumberRobotEnter = data[0]["teamNumber"];
					$scope.driveTrain = data[0]["driveTrain"];
					$scope.numDriveTrainMotors = data[0]["numDriveTrainMotors"];
					$scope.typeDriveTrainMotors = data[0]["typeDriveTrainMotors"];
					$scope.numOtherMotors = data[0]["numOtherMotors"];
					$scope.typeOtherMotors = data[0]["typeOtherMotors"];
					$scope.weight = data[0]["weight"];
					$scope.programmingLanguage = data[0]["programmingLanguage"];
					$scope.robotEnterAutonomous = data[0]["autonomous"];
					$scope.robotEnterNotes = data[0]["notes"];
					
					
					alertm("Robot Loaded Successfully", 5, "success");
				} else {
					alertm("Server error. Please retry", 6, "error");
				}
			  }).
			  error(function(data, status) {
				alertm("Error getting data. Please retry", 6, "error");
			  });
	}
	
});

thunderstormCollectionControllers.controller('collectRobotDetailsController', function ($scope, $http, $rootScope) {
	$rootScope.startSaving = false;
	
	$scope.submitRobotDetails = function() {
		$http({method: 'POST', url: '../../rest/robotDetails/', params: Math.random().toString(36).substring(2), data: {robotId: $rootScope.newRobotId, ballCatch: $scope.ballCatch, ballThrow: $scope.ballThrow, highGoal: $scope.highGoal, lowGoal: $scope.lowGoal, ability: $scope.ability, style: $scope.style, pass: $scope.pass, recieve: $scope.recieve, hotTarget: $scope.hotTarget, pickUp: $scope.pickUp, notes: $scope.robotDetailsNotes}, cache: false}).
			  success(function(data, status) {
				if(data) {
					alertm("Robot Details Added Successfully", 5, "success");
					$scope.ballCatch = null;
					$scope.ballThrow = null;
					$scope.highGoal = null;
					$scope.lowGoal = null;
					$scope.ability = null;
					$scope.style = null;
					$scope.pass = null;
					$scope.recieve = null;
					$scope.hotTarget = null;
					$scope.pickUp = null;
					$scope.robotDetailsNotes = null;
					
					window.location = "#/teamSearch";
					
					$scope.newRobotId = null;
					
				} else {
					alertm("Server error. Please retry", 6, "error");
				}
			  }).
			  error(function(data, status) {
				alertm("Error saving data. Please retry", 6, "error");
			  });
	}
});

thunderstormCollectionControllers.controller('scoreChooseTeamModal', function ($scope, $http, $rootScope) {
	$scope.firstDigitSelect = 0;
	$scope.secondDigitSelect = 0;
	$scope.thirdDigitSelect = 0;
	
	$scope.teamSelectedStart = null;
	$scope.currentSelectedTeamIdStart = null;
	$scope.currentSelectedTeamNumberStart = null;
	
	$rootScope.teamId = null;
	$rootScope.teamNumber = null;
	$rootScope.roundId = null;
	$rootScope.roundNumber = null;
	
	$rootScope.startSaving = false;
	
	$scope.changeRoundNumStart = function(digit,number) {
		switch(digit) {
		  case 1:
		    $scope.firstDigitSelect = number;
			$scope.updateRoundStart();
		    break;
		  case 2:
		    $scope.secondDigitSelect = number;
			$scope.updateRoundStart();
		    break;
		  case 3:
		    $scope.thirdDigitSelect = number;
			$scope.updateRoundStart();
		    break
		  default:
		    alertm("Error: Invalid digit");
		}
	}
	
	$scope.changeTeamStart = function(team) {
		$scope.teamSelectedStart = team;
		switch(team) {
		  case 'red1':
		    $scope.currentSelectedTeamIdStart = $scope.red1Id;
			$scope.currentSelectedTeamNumberStart = $scope.red1Number;
		    break;
		  case 'red2':
		    $scope.currentSelectedTeamIdStart = $scope.red2Id;
			$scope.currentSelectedTeamNumberStart = $scope.red2Number;
		    break;
		  case 'red3':
		    $scope.currentSelectedTeamIdStart = $scope.red3Id;
			$scope.currentSelectedTeamNumberStart = $scope.red3Number;
		    break
		  case 'blue1':
		    $scope.currentSelectedTeamIdStart = $scope.blue1Id;
			$scope.currentSelectedTeamNumberStart = $scope.blue1Number;
		    break;
		  case 'blue2':
		    $scope.currentSelectedTeamIdStart = $scope.blue2Id;
			$scope.currentSelectedTeamNumberStart = $scope.blue2Number;
		    break;
		  case 'blue3':
		    $scope.currentSelectedTeamIdStart = $scope.blue3Id;
			$scope.currentSelectedTeamNumberStart = $scope.blue3Number;
		    break
		  default:
		    alertm("Error: Invalid team");
		}
	}
	
	$scope.errorGettingData = function(dataType) {
		alertm("Error getting "+dataType+" data. Please retry");
		$("#waitForTeams").hide();
	}
	
	$scope.gotTeamsStart = function(data) {
		$scope.selectedRoundIdStart = data[0]['roundId'];
		$scope.selectedRoundNumberStart = data[0]['number'];
		
		$scope.red1Id = data[0]['red1Id'];
		$scope.red1Number = data[0]['red1Number'];
		$scope.red2Id = data[0]['red2Id'];
		$scope.red2Number = data[0]['red2Number'];
		$scope.red3Id = data[0]['red3Id'];
		$scope.red3Number = data[0]['red3Number'];
		
		$scope.blue1Id = data[0]['blue1Id'];
		$scope.blue1Number = data[0]['blue1Number'];
		$scope.blue2Id = data[0]['blue2Id'];
		$scope.blue2Number = data[0]['blue2Number'];
		$scope.blue3Id = data[0]['blue3Id'];
		$scope.blue3Number = data[0]['blue3Number'];
		
		$scope.teamSelectedStart = null;
		$scope.currentSelectedTeamIdStart = null;
		$scope.currentSelectedTeamNumberStart = null;
		
		$("#waitForTeams").hide();
		$("#roundNotEntered").hide();
		$("#startTeamsBar").show();
	}
	
	$scope.updateRoundStart = function() {
		$("#waitForTeams").show();
		if($scope.firstDigitSelect===0&&$scope.secondDigitSelect===0&&$scope.thirdDigitSelect===0) {
			alertm("Please choose a round greater than 0");
			$("#waitForTeams").hide();
			$("#roundNotEntered").show();
			$("#startTeamsBar").hide();
		} else {
			$scope.teamNumberToSubmit = ""+$scope.firstDigitSelect+$scope.secondDigitSelect+$scope.thirdDigitSelect;
			$scope.teamNumberToSubmit = $scope.teamNumberToSubmit.replace(/^0+/, '');
			$http({method: 'GET', url: '../../rest/round/roundNumber/'+$scope.teamNumberToSubmit, params: Math.random().toString(36).substring(2), cache: false}).
			  success(function(data, status) {
				if(Object.keys(data).length === 0) {
					alertm("No data for that round. Please retry.");
					$("#waitForTeams").hide();
					$("#roundNotEntered").show();
					$("#startTeamsBar").hide();
				} else {
					$scope.gotTeamsStart(data);
				}
			  }).
			  error(function(data, status) {
				$scope.errorGettingData("round");
			  });
		}
	}
	
	$scope.startCollecting = function() {
		$rootScope.teamId = $scope.currentSelectedTeamIdStart;
		$rootScope.teamNumber = $scope.currentSelectedTeamNumberStart;
		$rootScope.roundId = $scope.selectedRoundIdStart;
		$rootScope.roundNumber = $scope.selectedRoundNumberStart;
		
		if(!$rootScope.teamId||!$rootScope.teamNumber||!$rootScope.roundId||!$rootScope.roundNumber) {
			alertm("Please select a round and team");
		} else {
			$http({method: 'POST', url: '../../rest/score/', params: Math.random().toString(36).substring(2), data: {roundId: $rootScope.roundId, teamId: $rootScope.teamId}, cache: false}).
			  success(function(data, status) {
				if(data) {
					$(document).foundation('reveal', {animation: 'fadeAndPop'});
					$('#scoreChooseTeam').foundation('reveal', 'close');$('#darkenBack').hide();
					$rootScope.currentScoreSaveId = data;
					$rootScope.startSaving = true;
					alertm('Collecting for round '+$rootScope.roundNumber+", team "+$scope.currentSelectedTeamNumberStart, 6, 'success');
				} else {
					alertm("There was a server error. Please retry");
				}
			  }).
			  error(function(data, status) {
				alertm("There was an error starting. Please retry");
			  });
		}
		
	}
	
});

thunderstormCollectionControllers.controller('collectScoreController', function ($scope, $http, $rootScope) {
	$rootScope.newRobotId = null;
	
	$("#scoreChooseTeam").foundation('reveal', 'open');
	$(document).foundation('reveal', {animation: 'fadeAndPop'});
	$(document).foundation('reveal', {animation: 'none'});
	$("#waitForTeams").spin("tiny", "grey");
	
	$scope.showPre = true;
	$scope.showTele = false;
	$scope.showNotes = false;
	
	$scope.goToNextScene = function() {
	  if($scope.showPre==true) {
		$scope.showPre = false;
		$scope.showTele = true;
	  } else if($scope.showTele==true) {
		$scope.showTele = false;
		$scope.showNotes = true;
	  }
	}
	
	$scope.goBackScene = function() {
	  if($scope.showTele==true) {
		$scope.showPre = true;
		$scope.showTele = false;
	  } else if($scope.showNotes==true) {
		$scope.showTele = true;
		$scope.showNotes = false;
	  }
	}
	
	$scope.checkNegative = function(val) {
	  if(val>0) {
		return val - 1;
	  } else {
		return val;  
	  }
	}
	
	
    $scope.startPosition = 'not entered';
	$scope.preloaded = 0;
	
	$scope.autoTopFail = 0;
	$scope.autoTopHot = 0;
	$scope.autoTopSuccess = 0;
	
	$scope.autoLowerFail = 0;
	$scope.autoLowerSuccess = 0;
	
	$scope.moveForward = 0;
	
	$scope.teleTopSuccess = 0;
	$scope.teleTopFail = 0;
	$scope.teleLowerSuccess = 0;
	$scope.teleLowerFail = 0;
	
	$scope.telePassSuccess = 0;
	$scope.telePassFail = 0;
	$scope.teleReceiveSuccess = 0;
	$scope.teleReceiveFail = 0;
	$scope.teleThrowSuccess = 0;
	$scope.teleThrowFail = 0;
	$scope.teleCatchSuccess = 0;
	$scope.teleCatchFail = 0;
	
	$scope.ballsBlocked = 0;
	
	$scope.notes = '';
	
	$scope.finalScore = null;
	
	$("#statusError").hide();
	$("#statusSaved").hide();
	$("#statusLoading").hide();
	
	$scope.saveScore = function(done) {
	  if($rootScope.startSaving) {
		$("#statusError").hide();
		$("#statusSaved").hide();
		$("#statusLoading").show();
		
		switch($scope.startPosition) {
		  case 'white-low':
		    $scope.startPositionToSend = 1;
		    break;
		  case 'white-mid':
		    $scope.startPositionToSend = 2;
		    break;
		  case 'white-upper':
		    $scope.startPositionToSend = 3;
		    break
		  case 'goal-low':
		    $scope.startPositionToSend = 4;
		    break;
		  case 'goal-mid':
		    $scope.startPositionToSend = 5;
		    break;
		  case 'goal-upper':
		    $scope.startPositionToSend = 6;
		    break
		  default:
		    $scope.startPositionToSend = null;	
		}
		$http({method: 'PUT', url: '../../rest/score/', params: Math.random().toString(36).substring(2), data: {scoreId: $rootScope.currentScoreSaveId, roundId: $rootScope.roundId, teamId: $rootScope.teamId, ballLoaded: $scope.preloaded, autoHighShotSuccess: $scope.autoTopSuccess, autoHighShotMiss: $scope.autoTopFail, autoLowShotSuccess: $scope.autoLowerSuccess, autoLowShotMiss: $scope.autoLowerFail, autoHot: $scope.autoTopHot, autoMoveForward: $scope.moveForward, teleTopSuccess: $scope.teleTopSuccess, teleTopFail: $scope.teleTopFail, teleBottomSuccess: $scope.teleLowerSuccess, teleBottomFail: $scope.teleLowerFail, telePassSuccess: $scope.telePassSuccess, telePassFail: $scope.telePassFail, teleRecieveSuccess: $scope.teleReceiveSuccess, teleRecieveFail: $scope.teleReceiveFail, teleThrowSuccess: $scope.teleThrowSuccess, teleThrowFail: $scope.teleThrowFail, teleCatchSuccess: $scope.teleCatchSuccess, teleCatchFail: $scope.teleCatchFail, ballsBlocked: $scope.ballsBlocked, startPos: $scope.startPositionToSend, htmlView: $scope.notes}, cache: false}).
			  success(function(data, status) {
				if(!data) {
					if(done=="next") {
						location.reload(false);
						$rootScope.startSaving = false;
					} else if(done=="done") {
						window.location = "/";
						$rootScope.startSaving = false;
					}
					$("#statusLoading").hide();
					$("#statusError").hide();
					$("#statusSaved").show();
				} else {
					$("#statusError").show();
					$("#statusLoading").hide();
					$("#statusSaved").hide();
					alertm("There was an error saving. Will retry soon. If problem persists, restart or contact CI Admin.",10,"error");
				}
			  }).
			  error(function(data, status) {
							 alertm($rootScope.currentScoreSaveId+" "+$rootScope.roundId+" "+$rootScope.teamId);
				$("#statusError").show();
				$("#statusLoading").hide();
				$("#statusSaved").hide();
				alertm("There was an error connecting. Will retry soon. If problem persists, restart or contact CI Admin.",10,"error");
			  });
		
	  }
	  
	}
	
	setInterval(function(){
      $scope.saveScore();
    },10000);
	
	
});