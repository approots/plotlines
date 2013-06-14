function LoginCtrl ($rootScope, $scope, $http, notification) {

    //$scope.alert = {type: "error", message: "You can't do that!"};
    $scope.addAlert = function() {
        //$scope.alert = {type: "success", message: "You can do that!"};
        notification.setAlert({ message: "You can do that!"});
    }
    $scope.username = '';
    $scope.password = '';
    $scope.login = function() {
        $http({
            method: 'POST',
            url: 'http://api.plotlines/login',
            data: {
                username: $scope.username,
                password: $scope.password
            }
        })
        .success(function(data, status) {
                console.log(data);
                console.log(status);
            notification.addAlert({type:'success',message:'Logged in.'});
                $rootScope.$broadcast('event:loginSuccess');
                // bootstrap ui login dialog - see login module
                //dialog.close();
        })
        .error(function(data, status){
            notification.addAlert({type:'error',message:'Error authenticating: ' + data});
        });
    }

    $scope.secure = function() {
        $http({
            method: 'GET',
            url: 'http://api.plotlines/secure'
        })
        .success(function(data, status) {
            console.log(data);
            console.log(status);
            notification.addAlert({type:'success',message:'Logged in.'});
        })
        .error(function(data, status){
            notification.addAlert({type:'error',message:'Error authenticating: ' + data});
        });
    }
}

