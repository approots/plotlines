function StoryCtrl ($scope, $routeParams, $location, Persist, Flash, Utils) {
    //localStorage.clear();

    this.id = $routeParams.storyId;

    if (! Persist.story(this.id)) {
        // Error - that story doesn't exist
        $location.path('/404');
    }

    //$scope.passage = {};
    $scope.passages = Persist.passages(this.id, false);
    $scope.story = Persist.story(this.id);
    $scope.originalStory = Persist.story(this.id);
    $scope.story.isEdit = false;
    // Remove this story id from existing ids since we don't want that to be a validation error.
    $scope.existingIds = Persist.existingIds(this.id);
   // $scope.existingPassageTitles = Persist.existingPassageTitles(this.id, true);

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

        // redirect to refresh the url slug in case title has changed.
        var message = {};
        message.type = 'success';
        message.body = 'Successful update.';
        Flash.set(message);
        url = '/stories/' + story.id + '/passages';

        //$scope.editStory = false;
        // NOTE: if we just change the description and not the title, the url slug won't changed
        // so we won't actually redirect. So we must do housekeeping like set $scope.story.isEdit = false;
        // Note that if we don't redirect, then originalStory will be stale. But that doesn't matter since
        // the title won't have changed and so won't affect the slug on next save.
        $scope.story.isEdit = false;
        $location.path(url);
        /*
        $scope.story = story;
        $scope.originalStory = story;
        $scope.existingIds = Persist.existingIds(story.id);
        */
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

    /*
    $scope.passage.isPristine = function() {
        return ((! $scope.passage.title) && (!$scope.passage.text));
    };

    // Note: I can't call this passage.reset. For some reason the form only resets once.
    $scope.resetPassage = function() {
        $scope.passageForm.$setPristine();
        $scope.passage = {};
    };

    $scope.passage.save = function() {
        $scope.passage.id = Persist.savePassage($scope.story.id, $scope.passage);
        var url = '/stories/' + $scope.story.id + '/passages/' + $scope.passage.id;
        $location.path(url);
    };
    */
}
