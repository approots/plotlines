function PassageCtrl ($scope, $location, $http, utils, notification, passageResponse) {

    $scope.story = passageResponse.data.story;
    $scope.passage = passageResponse.data.passage;
    $scope.originalPassage = angular.copy($scope.passage);
    $scope.links = passageResponse.data.links;
    $scope.isEditPassage = false;

    $scope.resetPassage = function() {
        $scope.passage.title = $scope.originalPassage.title;
        $scope.passage.passage = $scope.originalPassage.passage;
    };

    // Is the add passage form empty?
    $scope.isPristinePassage = function() {
        return ($scope.passage.title || $scope.passage.passage) ? false : true;
    };

    $scope.isUnchangedPassage = function() {
        return (($scope.passage.title === $scope.originalPassage.title)
            && ($scope.passage.passage === $scope.originalPassage.passage))
    };

    $scope.savePassage = function() {
        $http({
            method: 'PUT',
            url: 'http://api.plotlines/passages',
            data: {
                id: $scope.passage.id,
                title: $scope.passage.title,
                passage: $scope.passage.passage
            }
        })
        .success(function(data, status) {
            $scope.originalPassage = angular.copy($scope.passage);
            $scope.passage = data;
            $scope.isEditPassage = false;
            notification.addAlert({type:'success',message:'Saved.'});
        })
        .error(function(data, status){
            notification.addAlert({type:'error',message:'Error updating the passage. ' + data});
        });
    };

    $scope.deletePassage = function() {
        $http({
            method: 'DELETE',
            url: 'http://api.plotlines/passages',
            data: {id:$scope.passage.id}
        })
        .success(function(data, status) {
            notification.addFlash({type:'success',message:'"' + $scope.passage.title + '" has been deleted.'});
            $location.path('/stories/' + $scope.story.id);
        })
        .error(function(data, status){
            notification.addAlert({type:'error',message:'Error deleting the passage. ' + data});
        });
    };

}

PassageCtrl.resolve = {

    passageResponse : function($http, $route, notification) {

        var id = $route.current.params.passageId;

        return $http({
            method: 'GET',
            url: 'http://api.plotlines/passagepage/' + id
        })
        .success(function(data, status) {
            //
        })
        .error(function(data, status){
            notification.addAlert({type:"error", message:data})
        });
    }
}
