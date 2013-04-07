function StoriesCtrl($scope, $location, Persist, Flash) {
    $scope.story = {};
    $scope.flash = Flash;
    $scope.existingIds = Persist.existingIds();
    $scope.stories = Persist.stories(false);
    $scope.predicate = 'title';
    $scope.storyCreated = false;

    // Save a story and reset the form
    $scope.save = function() {
        // Persist the current story when form submitted
        var story = Persist.saveStory($scope.story.title, $scope.story.description);
        var url = '/stories/' + story.id;
        $location.path(url);
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
