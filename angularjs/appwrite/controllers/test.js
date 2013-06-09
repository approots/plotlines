function TestCtrl ($scope, $rootScope, $location, $http, $timeout, utils, notification, httpResponse, graph) {
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
        {id:'18',title : 'Sony', color: "red", highlight: ""},
        {id:'19',title : 'Ericsson', color: "orange", highlight: ""},
        {id:'20',title : 'Inventec', color: "red", highlight: ""},
        {id:'dummy',title : 'Dummy', color: "red", highlight: ""}
    ];

    var dataModule = function() {
        // options are add, remove
        var action = 'add';
        var nodes = [];
        var links = [];

        var getAction = function() {
            return action;
        }
        var init = function(data) {
            action = data.action;
            nodes = (data.nodes) ? data.nodes : [];
            links = (data.links) ? data.links : [];
            return this;
        }
        var getData = function() {
            return {action:action, nodes:nodes,links:links};
        }
        return {
            init : init,
            getAction : getAction,
            getData : getData
        }
    };

    var data = {action:'add',nodes:nodes,links:links};
    var dataModuleInstance = dataModule().init(data);
    //dataModuleInstance.setData(data);

    notification.addAlert({type:'success',message:'You done good.'});
    notification.addAlert({type:'info',message:'You done good.'});
    notification.addAlert({type:'error',message:'You done good.'});

    $scope.story = httpResponse.data.story;
    $scope.graphData = {action:'add',nodes:nodes,links:links};//dataModuleInstance;
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
        dataModuleInstance = dataModule().init(data);
        $scope.graphData = dataModuleInstance;
        $scope.node = {};
    };

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

