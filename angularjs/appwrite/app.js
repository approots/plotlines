var app = angular.module('appwrite',['ui.bootstrap']);

app.config(function ($routeProvider, $httpProvider) {
    //$httpProvider.defaults.headers.post  = {'Content-Type': 'application/x-www-form-urlencoded'};

    $routeProvider
        .when('/', {
            templateUrl : 'angularjs/appwrite/views/stories.html',
            controller : 'StoriesCtrl',
            resolve : StoriesCtrl.resolve
        })
        .when('/stories', {
            templateUrl : 'angularjs/appwrite/views/stories.html',
            controller : 'StoriesCtrl',
            resolve : StoriesCtrl.resolve
        })
        .when('/stories/:storyId' , {
            templateUrl : 'angularjs/appwrite/views/story.html',
            controller : 'StoryCtrl',
            resolve : StoryCtrl.resolve
        })
        .when('/passages/:passageId' , {
            templateUrl : 'angularjs/appwrite/views/passage.html',
            controller : 'PassageCtrl',
            resolve : PassageCtrl.resolve
        })
        .when('/404' , {
            templateUrl : 'angularjs/appwrite/views/404.html'
        })
        .otherwise({
            templateUrl : 'angularjs/appwrite/views/404.html'
        });
});

angular.module('ng').filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || '...');
    };
});










