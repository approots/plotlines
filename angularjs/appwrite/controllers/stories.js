
function StoriesCtrl($scope, $location, $http, utils, notification, storiesResponse) {
    $scope.story = {};
    // StoriesResponse is actually an $http result which contains data, status, headers and config objects
    $scope.stories = storiesResponse.data.stories;
    //console.log(storiesResponse.data.existingSlugs);
    $scope.existingSlugs = storiesResponse.data.existingSlugs;
    $scope.predicate = 'title';
    //$scope.storyCreated = false;

    $scope.notification = notification;



    // Save a story and reset the form
    $scope.create = function() {
        // Persist the current story when form submitted
        //var story = Persist.saveStory($scope.story.title, $scope.story.description);

        $http({
            method: 'POST',
            url: 'http://api.plotlines/stories',
            data:
            {
                title: $scope.story.title, // slug made on server-side from title
                description: $scope.story.description
            }
        })
        .success(function(data, status) {
            // get id
            var url = '/stories/' + data.id;
            $location.path(url);
        })
        .error(function(data, status){
                notification.addAlert({type:'error',message:'Error creating the story. ' + data});
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

    storiesResponse : function($http, notification) {

        return $http({
            method: 'GET',
            url: 'http://api.plotlines/storiespage'
        })
        .success(function(data, status) {
            //return {status:status,stories:data};
        })
        .error(function(data, status){
            notification.addAlert({type:"error", message:data})
        });

/*
        return $http({
            method: 'GET',
            url: 'http://api.plotlines/stories'
        })
        .success(function(data, status) {

            angular.forEach(data, function(story) {
                existingSlugs.push(story.slug);
            });

                return 'bob';
            //return {status:status,stories:data,existingSlugs:existingSlugs};
                //return {status:status,data:data,existingSlugs:existingSlugs};
        })
        .error(function(data, status){
            // promise will be rejected automatically by $http. In order
            // to nofify the user, add error data to the notification service
            notification.addAlert({type:"error", message:data});
        });
        */
    }
};

