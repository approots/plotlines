function PassageCtrl ($scope, $location, $http, utils, notification, passageResponse) {

    $scope.story = passageResponse.data.story;
    $scope.passage = passageResponse.data.passage;
    $scope.originalPassage = angular.copy($scope.passage);
    $scope.passages = passageResponse.data.passages; // all possible passages as destinations for options
    $scope.link = {choice: '', destination: ''};
    $scope.links = passageResponse.data.links;
    $scope.isEditPassage = false;

    $scope.destinations = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    //$scope.destination;

    $scope.resetPassage = function() {
        $scope.passage.title = $scope.originalPassage.title;
        $scope.passage.body = $scope.originalPassage.body;
    };

    // Is the add passage form empty?
    $scope.isPristinePassage = function() {
        return ($scope.passage.title || $scope.passage.body) ? false : true;
    };

    $scope.isUnchangedPassage = function() {
        return (($scope.passage.title === $scope.originalPassage.title)
            && ($scope.passage.body === $scope.originalPassage.body))
    };

    $scope.savePassage = function() {
        $http({
            method: 'PUT',
            url: 'http://api.plotlines/passages',
            data: {
                id: $scope.passage.id,
                title: $scope.passage.title,
                body: $scope.passage.body
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

    $scope.resetLink = function() {
        $scope.link.choice = '';
        $scope.link.destination = '';
    };

    // Is the add passage form empty?
    $scope.isPristineLink = function() {
        //return (! $scope.link.choice)
        return ($scope.link.choice || $scope.link.destination) ? false : true;
    };

    $scope.createLink = function() {
        // Persist the current link when form submitted

        $http({
            method: 'POST',
            url: 'http://api.plotlines/links',
            data:
            {
                passageId: $scope.passage.id,
                choice: $scope.link.choice,
                destinationId: $scope.link.destination.id
            }
        })
        .success(function(data, status) {
            // get id
            //var url = '/passages/' + data.id;
            //$location.path(url);
            notification.addAlert({type:'success',message:'Saved.'});
            // Add new link to the list.
            $scope.links.push(data);
        })
        .error(function(data, status){
            notification.addAlert({type:'error',message:'Error creating the option. ' + data});
        });
    };

    $scope.deleteLink = function(id) {
        $http({
            method: 'DELETE',
            url: 'http://api.plotlines/links',
            data: {id:id}
        })
        .success(function(data, status) {
            //$scope.links = data;
            notification.addAlert({type:'success',message:'Deleted.'});
            // update the links to remove this one
            var pos = $scope.links.map(function(obj) { return obj.id; }).indexOf(id);
            $scope.links.splice(pos, 1);
                /*
            angular.forEach(stories, function(value, key){
                temp.push(value);
            });
            */
        })
        .error(function(data, status){
            notification.addAlert({type:'error',message:'Error deleting the option. ' + data});
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
