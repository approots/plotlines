function TestCtrl ($scope, $rootScope, $location, $http, $timeout, utils, notification, httpResponse) {

    // Begin Story...
    $scope.story = httpResponse.data.story;
    $scope.originalStory = angular.copy($scope.story); //angular.copy(storyResponse.data.story);
    //$scope.isEditStory = false;
    // show/hide story options
    $scope.storyOptions = false;
    // Remove this story slug from existing slugs since we don't want that to be a validation error.
    $scope.otherSlugs = httpResponse.data.otherSlugs;
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
    // ...End Story


    // Begin Passages...
    nodes = httpResponse.data.passages;
    links = httpResponse.data.links;
    nodes.forEach(function(node) {
        node.color = 'white';
    });
    links.forEach(function(link) {
        link.type = 'unconditional';
    });

    $scope.graphData = {action:'add',nodes:nodes,links:links};
    $scope.passages = nodes;
    $scope.currentPassage = nodes[0];

    //console.log($scope.graphData);
    $scope.node = {};

    $scope.setCurrentPassage = function(id) {
        // todo set to correct passage
        $scope.currentPassage = nodes[1];
    };

    $scope.addNode = function() {
        var id = utils.UUID();
        //data = {action:'add',nodes:nodes};
        data = {action:'add',nodes:[{id:id,title:$scope.node.title,color: "red",highlight:"highlight"}]};
        //dataModuleInstance = dataModule().init(data);
        //$scope.graphData = dataModuleInstance;
        $scope.graphData = data;
        $scope.node = {};
    };

    $scope.removeNode = function() {

        data = {action:'remove',nodes:[{id:$scope.node.id}]};
        //dataModuleInstance = dataModule().init(data);
        $scope.graphData = data;
        $scope.node = {};
    };

    $scope.updateNode = function() {
        var id = utils.UUID();
        data = {action:'update',nodes:[{id:1}]};
        //dataModuleInstance = dataModule().init(data);
        $scope.graphData = data;
        $scope.node = {};
    };
    // ...End Passages


    /*
     var links = [
     {source: "1", target: "2", type: "conditional"},
     {source: "1", target: "3", type: "unconditional"},
     {source: "4", target: "5", type: "conditional"},
     {source: "6", target: "5", type: "unconditional"},
     {source: "7", target: "5", type: "unconditional"},
     {source: "3", target: "5", type: "unconditional"},
     {source: "8", target: "5", type: "unconditional"},
     {source: "1", target: "9", type: "conditional"},
     {source: "1", target: "10", type: "unconditional"},
     {source: "12", target: "11", type: "unconditional"},
     {source: "5", target: "3", type: "unconditional"},
     {source: "1", target: "20", type: "unconditional"},
     {source: "4", target: "8", type: "unconditional"},
     {source: "13", target: "8", type: "unconditional"},
     {source: "17", target: "8", type: "unconditional"},
     {source: "18", target: "13", type: "unconditional"},
     {source: "8", target: "13", type: "unconditional"},
     {source: "5", target: "7", type: "unconditional"},
     {source: "15", target: "7", type: "unconditional"},
     {source: "5", target: "6", type: "unconditional"},
     {source: "1", target: "6", type: "unconditional"},
     {source: "6", target: "1", type: "unconditional"},
     {source: "16", target: "14", type: "unconditional"},
     {source: "19", target: "14", type: "unconditional"},
     {source: "8", target: "4", type: "unconditional"},
     {source: "5", target: "4", type: "unconditional"},
     {source: "8", target: "17", type: "unconditional"},
     {source: "7", target: "15", type: "unconditional"}
     ];

     var nodes = [
     {id:'1',title : 'Microsoft', color: "green"},
     {id:'2',title : 'Amazon', color: "red"},
     {id:'3',title : 'HTC', color: "white"},
     {id:'4',title : 'Samsung', color: "white"},
     {id:'5',title : 'Apple', color: "white"},
     {id:'6',title : 'Motorola', color: "white"},
     {id:'7',title : 'Nokia', color: "white"},
     {id:'8',title : 'Kodak', color: "white"},
     {id:'9',title : 'Barnes & Noble', color: "red"},
     {id:'10',title : 'Foxconn', color: "red"},
     {id:'11',title : 'Google', color: "orange"},
     {id:'12',title : 'Oracle', color: "orange"},
     {id:'13',title : 'LG', color: "white"},
     {id:'14',title : 'ZTE', color: "orange"},
     {id:'15',title : 'Qualcomm', color: "red"},
     {id:'16',title : 'Huawei', color: "orange"},
     {id:'17',title : 'RIM', color: "red"},
     {id:'18',title : 'Sony', color: "red"},
     {id:'19',title : 'Ericsson', color: "orange"},
     {id:'20',title : 'Inventec', color: "red"},
     {id:'dummy',title : 'Dummy', color: "red"}
     ];
     */
}

TestCtrl.resolve = {


    httpResponse : function($http, $route, notification) {

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

