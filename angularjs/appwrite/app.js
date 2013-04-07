var app = angular.module('appwrite',[]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'angularjs/appwrite/views/stories.html',
            controller : 'StoriesCtrl'
        })
        .when('/stories', {
            templateUrl : 'angularjs/appwrite/views/stories.html',
            controller : 'StoriesCtrl'
        })
        .when('/stories/:storyId' , {
            templateUrl : 'angularjs/appwrite/views/story.html',
            controller : 'StoryCtrl'
        })
        .when('/stories/:storyId/passages' , {
            templateUrl : 'angularjs/appwrite/views/passage.html',
            controller : 'PassageCtrl'
        })
        .when('/stories/:storyId/passages/:passageId' , {
            templateUrl : 'angularjs/appwrite/views/passage.html',
            controller : 'PassageCtrl'
        })
        .when('/404' , {
            templateUrl : 'angularjs/appwrite/views/404.html'
        })
        .otherwise({
            templateUrl : 'angularjs/appwrite/views/404.html'
        });
});
// TODO remove this test comment

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







