
function StoriesCtrl($scope, $location, $http, utils, StoriesResponse) {
    $scope.story = {};
    //$scope.flash = Flash;
    //$scope.existingSlugs = Persist.existingIds();
    // StoriesResponse is actually an $http result which contains data, status, headers and config objects
    $scope.stories = StoriesResponse.data;
    $scope.existingSlugs = StoriesResponse.existingSlugs;
    //$scope.stories = Persist.stories(false);
    $scope.predicate = 'title';
    $scope.storyCreated = false;

    $scope.error = null;
    $scope.message = "message";

    $scope.show = function () {
        $scope.error = "big error";
    };
    $scope.hide = function () {
        $scope.error = null;
    };

/*
    $http({method: 'GET', url: 'http://api.plotlines/hello/bob'}).
        success(function(data, status) {
            $scope.stories = data;
            console.log(data);
            console.log("status: " + status);
        }).
        error(function(data, status) {
            $scope.stories = data || "Request failed";
            console.log("status: " + status);
        });
   */

    //http://api.plotlines/hello/bob
    // Save a story and reset the form
    $scope.create = function() {
        // Persist the current story when form submitted
        //var story = Persist.saveStory($scope.story.title, $scope.story.description);
        var params = {
            slug: utils.slugify($scope.story.title),
            title:$scope.story.title,
            description:$scope.story.description
        };

        //params = $.param(params);
        $http({method: 'POST', url: 'http://api.plotlines/stories', data: params, headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .success(function(data, status) {
                // get id
                var url = '/stories/' + data.id;
                $location.path(url);
            })
            .error(function(data, status){
                alert("error");
            });


    }
    // Reset the form
    $scope.reset = function() {
        $scope.storyForm.$setPristine();
        $scope.story = {};
    }
    // Is the form empty?
    $scope.isPristine = function() {
        return ($scope.story.title || $scope.story.description) ? false : true;
    }
}

StoriesCtrl.resolve = {
    /*
    StoriesResponse : function($http) {

        return $http({
            method: 'GET',
            url: 'http://api.plotlines/hello/bob'
        });

        //return {data: ''}
    }
     */
    StoriesResponse : function($q, $http, notification) {
        var deferred = $q.defer();
        var existingSlugs = [];
        // NOTE: $http will not resolve an error and the controller won't execute. Therefore, wrap $http with $q
        // so that if $http fails, resolve the promise with an error so that the controller will execute.
        $http({method: 'GET', url: 'http://api.plotlines/stories'})
            .success(function(data, status) {
                angular.forEach(data, function(story) {
                    existingSlugs.push(story.slug);
                });
                deferred.resolve({error:false,status:status,data:data,existingSlugs:existingSlugs});
            })
            .error(function(data, status){
                //actually you'd want deferred.reject(data) here
                //but to show what would happen on success..
                deferred.resolve({error:true,status:status,data:data});
            });

        return deferred.promise;
    }
    /*
     StoriesResponse: function($http) {
        return $http({method: 'GET', url: 'http://api.plotlines/hello/bob'}).
            success(function(data, status) {
                return data;
            })
            //.error(function(data, status) {
            //    return {data: ''};
            //});
    }
    */

}

