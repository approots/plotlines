function StoryCtrl ($scope, $location, $http, utils, notification, storyResponse) {

    $scope.story = storyResponse.data.story;
    $scope.originalStory = angular.copy($scope.story); //angular.copy(storyResponse.data.story);
    $scope.isEditStory = false;
    // Remove this story slug from existing slugs since we don't want that to be a validation error.
    $scope.otherSlugs = storyResponse.data.otherSlugs;
    // TODO
    $scope.passages = storyResponse.data.passages;

    $scope.deleteStory = function() {
        $http({
            method: 'DELETE',
            url: 'http://api.plotlines/stories',
            data: {id:$scope.story.id}
        })
        .success(function(data, status) {
            notification.addFlash({type:'success',message:'"' + $scope.story.title + '" has been deleted.'});
            $location.path('/stories');
        })
        .error(function(data, status){
            notification.addAlert({type:'error',message:'Error deleting the story! ' + data});
        });
    };

    $scope.saveStory = function() {
        $http({
            method: 'PUT',
            url: 'http://api.plotlines/stories',
            data: {
                id: $scope.story.id,
                title: $scope.story.title,
                description: $scope.story.description
            }
        })
        .success(function(data, status) {
            $scope.originalStory = angular.copy($scope.story);
            $scope.story = data;
            $scope.isEditStory = false;
            notification.addAlert({type:'success',message:'Saved.'});
        })
        .error(function(data, status){
            notification.addAlert({type:'error',message:'Error updating the story. ' + data});
        });
    };

    $scope.resetStory = function() {
        $scope.story.title = $scope.originalStory.title;
        $scope.story.description = $scope.originalStory.description;
        $scope.story.slug = $scope.originalStory.slug;
    };

    $scope.isUnchangedStory = function() {
        return (($scope.story.title === $scope.originalStory.title)
            && ($scope.story.description === $scope.originalStory.description))
    };
}

StoryCtrl.resolve = {

    storyResponse : function($http, $route, notification) {

        var id = $route.current.params.storyId;

        return $http({
            method: 'GET',
            url: 'http://api.plotlines/storypage/' + id
        })
        .success(function(data, status) {
            //
        })
        .error(function(data, status){
            notification.addAlert({type:"error", message:data})
        });
    }
}

