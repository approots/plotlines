//based loosely on http://www.espeo.pl/2012/02/26/authentication-in-angularjs-application

var login = angular.module('login', ['ui.bootstrap']);

login.config(function ($httpProvider) {
    var loginInterceptor = function($rootScope, $q) {

        return function (promise)
        {
            return promise.then(success, error);
        }

        function success(response)
        {
            return response;
        }

        function error(response)
        {
            if (response.status == 401)
            {
                var deferred = $q.defer();
                // If request is not a login request, then save it so it will run after login.
                // No. What if login was explicitly clicked by the user!
                // Login page shouldn't return a 401?
                $rootScope.failedRequest = {
                    config: response.config,
                    deferred: deferred
                };

                $rootScope.$broadcast('event:loginRequired');
                return deferred.promise;
            }
            else
            {
                return $q.reject(response);
            }
        }
    };

    $httpProvider.responseInterceptors.push(loginInterceptor);
});

login.run(function ($rootScope, $dialog, $http) {
    $rootScope.failedRequest = {};

    // Configure dialog (and make available for injection into the specified controller if desired)
    var dialog = $dialog.dialog({
        backdrop: true,
        dialogFade: true,
        templateUrl: 'angularjs/appwrite/views/login_modal.html',
        controller: 'LoginController',
        backdropClick: false,
        keyboard: false
    });


    $rootScope.$on('event:loginRequired', function () {
        dialog.open();
    });

    $rootScope.$on('event:loginSuccess', function () {
        if ($rootScope.failedRequest) {
            var request = $rootScope.failedRequest;

            $http(request.config)
                .then(function (response)
                {
                    request.deferred.resolve(response);
                });
        }

        $rootScope.failedRequest = {};
        dialog.close();
    });
});


function LoginController ($rootScope, $scope, $http, dialog) {
    $scope.errorMessage = '';
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
            //notification.addAlert({type:'success',message:'Logged in.'});
            $rootScope.$broadcast('event:loginSuccess');
            // bootstrap ui login dialog - see login module
            //dialog.close();
        })
        .error(function(data, status){
            //notification.addAlert({type:'error',message:'Error authenticating: ' + data});
                $scope.errorMessage = "Invalid username or password."
        });
    }
}


/*
function LoginController($scope, dialog, $http, $rootScope)
{
    $scope.errorMessage = '';

    $scope.login = function ()
    {
        $http
            .post('/resources/login', {email: $scope.email, password: $scope.password})
            .success(function (data, status, error, config)
            {
                if (data.success === true)
                {
                    $rootScope.$broadcast('event:loginSuccess');
                    dialog.close();
                }
                else
                {
                    $scope.errorMessage = 'Invalid username or password.';
                }
            })
            .error(function (data, status, error, config)
            {
                $scope.errorMessage = 'Error logging in.';
            });
    };
}
*/
