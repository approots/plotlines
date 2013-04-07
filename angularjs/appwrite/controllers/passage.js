function PassageCtrl ($scope, $routeParams, $location, Persist, Flash, Utils) {
    //localStorage.clear();

    $scope.story = Persist.story($routeParams.storyId);
    if (! $scope.story) {
        // Error - that story doesn't exist
        $location.path('/404');
    }
    $scope.originalStory = angular.copy($scope.story); //Persist.story($routeParams.storyId);
    $scope.story.isEdit = false;
    // Remove this story id from existing ids since we don't want that to be a validation error.
    $scope.existingIds = Persist.existingIds($routeParams.storyId);

    $scope.passage = Persist.passage($routeParams.storyId, $routeParams.passageId);
    if (! $scope.passage) {
        $scope.passage = {};
        $scope.originalPassage = {};
    } else {
        $scope.originalPassage = angular.copy($scope.passage);
    }
    $scope.passage.isEdit = false;
    $scope.passage.isNew = function() {
        return ($scope.passage.id) ? false : true;
    };
    $scope.existingPassageTitles = Persist.existingPassageTitles($routeParams.storyId, true);

    $scope.story.delete = function() {
        var message = {};
        message.type = 'success';
        message.body = '"' + $scope.story.title + '" has been deleted.';
        Persist.deleteStory($scope.story.id);
        Flash.set(message);
        $location.path('/stories');
    };

    $scope.story.save = function() {
        var url = "";
        var story = Persist.saveStory($scope.story.title, $scope.story.description, $scope.originalStory);

        if (story.id !== $scope.story.id) {

            // redirect to update the url slug
            var message = {};
            message.type = 'success';
            message.body = 'Successful update.';
            Flash.set(message);

            url = '/stories/' + story.id + '/passages';
            if (! $scope.passage.isNew()) {
                url += '/' + $scope.passage.id;
            }

            $location.path(url);
        }

        // Otherwise, just update the story data.
        $scope.isEdit = false;
        $scope.originalStory = story;
        $scope.story = story;
        // existingids no change
        //$scope.existingIds = Persist.existingIds(story.id);
    };

    $scope.story.reset = function() {
        $scope.story.title = $scope.originalStory.title;
        $scope.story.description = $scope.originalStory.description;
        $scope.story.id = $scope.originalStory.id;
    };

    $scope.story.isUnchanged = function() {
        return (($scope.story.title === $scope.originalStory.title)
            && ($scope.story.description === $scope.originalStory.description))
    };

    $scope.passage.isPristine = function() {
        return ((! $scope.passage.title) && (!$scope.passage.text));
    }

    // Note: I can't call this passage.reset. For some reason the form only resets once.
    // TODO we can't reset the passage when editing???!!!
    $scope.resetPassage = function() {
        $scope.passageForm.$setPristine();
        if ($scope.passage.isNew()) {
            $scope.passage = {};
        } else {
            // set to original passage data
            $scope.passage = angular.copy($scope.originalPassage);
        }
    }

    $scope.passage.save = function() {
        $scope.passage.id = Persist.savePassage($scope.story.id, $scope.passage);
        $scope.passage.isEdit = false;
    }
}
