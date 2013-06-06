app.directive('uniqueSlug', function(utils) {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                var existingValues = scope[attrs.uniqueSlug];
                //console.log(existingValues);
                var slug = utils.slugify(viewValue);
                if (existingValues.indexOf(slug) === -1) {
                    ctrl.$setValidity('unique', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('unique', false);
                    return viewValue;
                }
            });
        }
    };
});

app.directive('uniqueTitle', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                var existingValues = scope[attrs.uniqueTitle];
                if (existingValues.indexOf(viewValue.toLowerCase()) === -1) {
                    ctrl.$setValidity('unique', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('unique', false);
                    return viewValue;
                }
            });
        }
    };
});

/*
app.directive("redactor", function() {
    return {
        require: '?ngModel',
        link: function($scope, elem, attrs, controller) {

             controller.$render = function() {

             elem.redactor({

             buttons: ['html','|','formatting', '|', 'bold', 'italic', 'deleted', '|',
             'unorderedlist', 'orderedlist','|',
             'table', '|',
             'fontcolor', '|', 'horizontalrule'],
             formattingTags: ["blockquote","h1", "h2", "h3", "h4"],
             allowedTags: ["a", "br", "p", "b", "i", "del", "strike", "u",
             "blockquote","span",
             "mark", "cite", "small", "ul", "ol", "li", "hr", "dl", "dt", "dd", "sup", "sub",
             "big", "pre", "code", "strong", "em", "table", "tr", "td",
             "th", "tbody", "thead", "tfoot", "h1", "h2", "h3", "h4", "h5", "h6"],
             convertDivs: true,
             minHeight: 100,
             keyupCallback: function() {
             $scope.$apply(controller.$setViewValue(elem.getCode()));
             },
             execCommandCallback: function() {
             $scope.$apply(controller.$setViewValue(elem.getCode()));
             }
             });

             elem.setCode(controller.$viewValue);
             };

        }
    };
});
*/


app.directive("redactor", function() {
    return {
        require: '?ngModel',
        link: function(scope, elm, attrs, ngModelCtrl) {

            var apply, expression, getVal, options, redactor;

            redactor = null;

            getVal = function() {
                return redactor != null ? redactor.getCode() : void 0;
            };

            apply = function() {
                ngModelCtrl.$pristine = false;
                return scope.$apply();
            };

            options = {
                /*
                buttons: ['html','|','formatting', '|', 'bold', 'italic', 'deleted', '|',
                    'unorderedlist', 'orderedlist','|',
                    'table', '|',
                    'fontcolor', '|', 'horizontalrule'], */
                formattingTags: ["blockquote","h1", "h2", "h3", "h4"],
                allowedTags: ["a", "br", "p", "b", "i", "del", "strike", "u",
                    "blockquote","span",
                    "mark", "cite", "small", "ul", "ol", "li", "hr", "dl", "dt", "dd", "sup", "sub",
                    "big", "pre", "code", "strong", "em", "table", "tr", "td",
                    "th", "tbody", "thead", "tfoot", "h1", "h2", "h3", "h4", "h5", "h6"],
                execCommandCallback: apply,
                keydownCallback: apply,
                keyupCallback: apply
            };

            scope.$watch(getVal, function(newVal) {
                if (!ngModelCtrl.$pristine) {
                    return ngModelCtrl.$setViewValue(newVal);
                }
            });

            ngModelCtrl.$render = function() {
                return redactor != null ? redactor.setCode(ngModelCtrl.$viewValue || '') : void 0;
            };

            expression = attrs.uiRedactor ? scope.$eval(attrs.uiRedactor) : {};

            angular.extend(options, expression);

            setTimeout(function() {
                return redactor = elm.redactor(options);
            });
        }
    };
});

// TODO determine width/height by the directive's element dimensions
// TODO update colors of nodes on add and remove. Maybe call from update()?
/*
app.directive('graph', function(graph){

    return {
        restrict : 'A',
        scope : {
            data : '='
        },
        link : function (scope) {



            // graph module exposes public methods addData() and removeData()
           // var graph = (function() {
                var width = 500;
                var height = 500;

                var svg = d3.select("#graph").append("svg")
                    .attr({"width": "100%", "height": "100%"})
                    .attr("pointer-events", "all")
                    .attr("viewBox", "0 0 " + width + " " + height )
                    .attr("preserveAspectRatio", "xMidYMid meet")
                    .call(d3.behavior.zoom().on("zoom", scale))
                    .append('svg:g');
                svg.append('svg:rect')
                    .attr('width', width)
                    .attr('height', height)
                    .attr('fill', 'rgba(1,1,1,0)');
                svg.append("svg:defs").selectAll("marker")
                    .data(["conditional","unconditional"])
                    .enter().append("svg:marker")
                    .attr("id", String)
                    .attr("viewBox", "0 -5 10 10")
                    .attr("refX", 16)
                    .attr("markerWidth", 6)
                    .attr("markerHeight", 6)
                    .attr("orient", "auto")
                    .append("svg:path")
                    .attr("d", "M0,-5L10,0L0,5");

                var force = d3.layout.force()
                    .gravity(.2)
                    .charge(-400)
                    .linkDistance(70)
                    .size([width, height]);

                var nodes = force.nodes();
                var links = force.links();

                var scale = function() {
                    svg.attr("transform","translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
                }
                var click = function() {
                    // TODO refactor - use css classes
                    var selected = d3.select(this).select("circle").attr("class");
                    if (selected === "selected") {
                        d3.select(this).select(".toptext").style("fill", "#000");

                        d3.select(this).select("circle")
                            .style("fill", "#ccc")
                            .attr("class",""); // use remove class here
                    } else {
                        // revert existing selection to default
                        d3.selectAll(".toptext").style("fill", "#000");
                        d3.selectAll("circle").style("fill", "#ccc");

                        // highlight current selection
                        //var textNodes = d3.select(this).selectAll("text");
                        d3.select(this).select(".toptext").style("fill", "steelblue");

                        d3.select(this).select("circle")
                            .style("fill", "steelblue")
                            .attr("class","selected");
                    }
                }

                var update = function() {
                    var link, node, nodeContainer;

                    link = svg.selectAll("line.link")
                        .data(links, function(d) { return d.source.id + "-" + d.target.id; });
                    link.enter().insert("line")
                        .attr("class", function(d) { return "link " + d.type; })
                        .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });;
                    link.exit().remove();

                    node = svg.selectAll("g.node")
                        .data(nodes, function(d) { return d.id;});
                    nodeContainer = node.enter().append("g")
                        .attr("class", "node")
                        .call(force.drag)
                        .on("click", click)
                        .call(d3.helper.tooltip()
                            // todo figure out how to add an attribute class instead.
                            .style({display:'block',background:'rgba(0, 0, 0, 0.5)',color:'white',padding:'10px'})
                            .text(function(d, i){ return d.title; })
                        );
                    nodeContainer.append("circle")
                        //.style("fill", function(d) { return d.color; })
                        .attr("class", function(d) { return "circle " + d.color; })
                        .attr("r", 6);
                    nodeContainer.append("text")
                        .attr("x", 10)
                        .attr("y", ".31em")
                        .attr("class", "shadow")
                        .text(function(d) { return d.title; });
                    nodeContainer.append("text")
                        .attr("x", 10)
                        .attr("y", ".31em")
                        .attr("class", "toptext")
                        .text(function(d) { return d.title; });
                    node.exit().remove();

                    force.on("tick", function() {
                        link.attr("x1", function(d) { return d.source.x; })
                            .attr("y1", function(d) { return d.source.y; })
                            .attr("x2", function(d) { return d.target.x; })
                            .attr("y2", function(d) { return d.target.y; });

                        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                    });
                    force.start();
                }


                var removeNode = function (id) {
                    var i = 0;
                    var n = findNode(id);
                    // first - remove any links to/from this node
                    while (i < links.length) {
                        if ((links[i]['source'] == n)||(links[i]['target'] == n)) links.splice(i,1);
                        else i++;
                    }
                    // now - remove the node
                    // todo shouldn't we know the node index when we call findNode().
                    nodes.splice(findNodeIndex(id),1);
                    update();
                }

                var addLink = function (source, target) {
                    links.push({"source":findNode(source),"target":findNode(target)});
                    update();
                }

                var findNode = function(id) {
                    for (var i in nodes) {if (nodes[i]["id"] === id) return nodes[i]};
                }

                var findNodeIndex = function(id) {
                    for (var i in nodes) {if (nodes[i]["id"] === id) return i};
                }

                // public methods begin...
                var addData = function(data) {
                    var nodeMap = {};

                    data.nodes.forEach(function(node) {
                        nodeMap[node.id] = node;
                        nodes.push(node);
                    });
                    // For each link, add a reference to the source and the target node.
                    // todo: if adding links without node data, how to get the node to add to source and target?
                    // todo: will relevant nodes always be passed in too?
                    // todo: use findNode? Create a nodeMap from force.nodes first?
                    data.links.forEach(function(link) {
                        link.source = nodeMap[link.source];
                        link.target = nodeMap[link.target];
                        links.push(link);
                    });

                    update();
                }
                // todo: Never removing links here explicitly? Always automatically through removeNode()?
                var removeData = function(data) {
                    data.nodes.forEach(function(node) {
                        removeNode(node.id);
                    });
                }

            scope.$watch('data', function(data) {
                if (data) {
                    switch (data.getAction() ) {
                        case 'add' : addData(data.getData()); break;
                        case 'remove' : removeData(data.getData()); break;
                    }
                }
            });

              //  return {
              //      addData : addData,
              //      removeData : removeData
              //  }
           // }());


        } // end link
    }
});
*/
app.directive('graph', function(graph){

    return {
        restrict : 'A',
        scope : {
            data : '=',
            onSelectNode : "&"
        },
        link : function (scope,element) {


            var graph = (function() {

                var width = Math.floor(element.width());
                var height = Math.floor(element.height());

                var svg = d3.select("#passage-graph").append("svg")
                    .attr({"width": "100%", "height": "100%"})
                    .attr("pointer-events", "all")
                    .attr("viewBox", "0 0 " + width + " " + height )
                    .attr("preserveAspectRatio", "xMidYMid meet")
                    .call(d3.behavior.zoom().scaleExtent([0.4, 3]).on("zoom", scale))
                    .append('svg:g');
                svg.append('svg:rect')
                    .attr('width', width)
                    .attr('height', height)
                    .attr('fill', 'rgba(1,1,1,0)');
                svg.append("svg:defs").selectAll("marker")
                    .data(["conditional","unconditional"])
                    .enter().append("svg:marker")
                    .attr("id", String)
                    .attr("viewBox", "0 -5 10 10")
                    .attr("refX", 16)
                    .attr("markerWidth", 6)
                    .attr("markerHeight", 6)
                    .attr("orient", "auto")
                    .append("svg:path")
                    .attr("d", "M0,-5L10,0L0,5");

                var force = d3.layout.force()
                    .gravity(.2)
                    .charge(-400)
                    .linkDistance(70)
                    .size([width, height]);

                var nodes = force.nodes();
                var links = force.links();

                function scale() {
                    svg.attr("transform","translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
                }


                function click() {
                    // TODO refactor - use css classes



                    var node = d3.select(this);
                   // console.log(node.select("text").property("id"));
/*
                    scope.$apply(function () {
                        scope.currentPassage = node.select("text").property("id");
                    });
*/
                    // unselect and unhighlight previously selected node
                    var previousSelectedNode = d3.select("g.node.selected");
                    previousSelectedNode.classed("selected", false);
                    unhighlight(previousSelectedNode, 0);

                    // select this class
                    node.classed("selected", true);
                    // already highlighted by mouseover event, so the user knows it's selected.

                    // todo let our controller code know

                    scope.$apply(function () {
                        scope.onSelectNode({id : node.select("text").property("id")});
                    });


                }

                function mouseover() {

                    var node = d3.select(this);
                    // if already selected, no need to highlight
                    if (node.attr("class").indexOf("selected") === -1) {
                        highlight(node);
                    }

                }

                function mouseout() {

                    var node = d3.select(this);
                    // if selected, then don't unhighlight
                    if (node.attr("class").indexOf("selected") === -1) {
                        unhighlight(node);
                    }
                }

                function update() {
                    var link, node, newNodes;

                    link = svg.selectAll("line.link")
                        .data(links, function(d) { return d.source.id + "-" + d.target.id; });
                    link.enter().insert("line")
                        .attr("class", function(d) { return "link " + d.type; })
                        .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });
                    link.exit().remove();

                    node = svg.selectAll("g.node")
                        // Important: .data() adds all nodes, but the existing nodes are not overwritten, but kept for
                        // reference. In append(), new nodes that were not existing nodes are added. In exit(),
                        // existing nodes that were not in the new nodes passed into .data() are deleted.
                        .data(nodes, function(d) { return d.id; });


                    newNodes = node.enter().append("g")
                        .attr("class", "node")
                        .attr("id", function(d) { return "node-" + d.id})
                        .call(force.drag)

                        .on("mouseover", mouseover)
                        .on("mouseout", mouseout)
                        .on("click", click)
                        .call(d3.helper.tooltip()
                            // todo figure out how to add an attribute class instead.
                            .style({display:'block',background:'rgba(0, 0, 0, 0.5)',color:'white',padding:'10px'})
                            .text(function(d, i){ return d.title; })
                        );
                    newNodes.append("circle")
                        //.style("fill", function(d) { return d.color; })
                        // todo add logic for color and highlight instead of blindly adding classes that don't exist
                        .attr("class", function(d) { return "circle " + d.color})
                        .attr("r", 6);
                    newNodes.append("text")
                        .attr("id", function(d) { return d.id; })
                        .attr("x", 10)
                        .attr("y", ".31em")
                        .attr("class", "shadow")
                        .text(function(d) { return d.title; });
                    newNodes.append("text")
                        .attr("x", 10)
                        .attr("y", ".31em")
                        .attr("class", "toptext")
                        .text(function(d) { return d.title; });
                    node.exit().remove();

                    force.on("tick", function() {
                        link.attr("x1", function(d) { return d.source.x; })
                            .attr("y1", function(d) { return d.source.y; })
                            .attr("x2", function(d) { return d.target.x; })
                            .attr("y2", function(d) { return d.target.y; });

                        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                    });
                    force.start();
                }

                function getNodeMap() {
                    var nodeMap = {};
                    nodes.forEach(function(node) {
                        nodeMap[node.id] = node;
                    });

                    return nodeMap;
                }

                function addData(data) {

                    var nodeMap;

                    if (data.nodes) {
                        data.nodes.forEach(function(node) {
                            //nodeMap[node.id] = node;
                            nodes.push(node);
                        });
                    }

                    if (data.links) {
                        nodeMap = getNodeMap();

                        // For each link, add a reference to the source and the target node.
                        // TODO this won't work if the node linked to doesn't exist in the new data!
                        data.links.forEach(function(link) {
                            link.source = nodeMap[link.source];
                            link.target = nodeMap[link.target];
                            links.push(link);
                        });
                    }

                    update();
                }

                function removeData(data) {
                    data.nodes.forEach(function(node) {
                        nodeMap[node.id] = node;
                        nodes.push(node);
                    });
                }

                function updateData(data) {
                    data.nodes.forEach(function (node) {
                        if (node.id) {
                            highlight(d3.select("#node-" + node.id));
                                //.attr("class", "circle highlight");
                        }
                    });
                }

                function highlight(node, duration) {
                    duration = (duration || 300);
                    var circle = node.select("circle");
                    var text = node.select(".toptext");
                    var shadow = node.select("text");

                    circle
                        //.classed("highlight", true)
                        .transition()
                        .duration(duration)
                        .style("stroke-width", "7px")
                        /*
                        .style("stroke", function() {
                            var stroke = d3.select(this).style("stroke");
                            return (stroke === "#aaaaaa") ? stroke : d3.rgb(stroke).brighter(1);
                        })
                        */
                        .attr("r", 9);
                    text
                        .transition()
                        .duration(duration)
                        .style("font-size", "11px")
                        .style("fill", "#2d6987");
                    shadow
                        .transition()
                        .duration(duration)
                        .style("font-size", "11px");
                }

                function unhighlight(node, duration) {

                    duration = (duration || 300);
                    var circle = node.select("circle");
                    var text = node.select(".toptext");
                    var shadow = node.select("text");

                    circle
                        //.classed("highlight", false)
                        .transition()
                        .duration(duration)
                        .style("stroke-width", "4px")
                        /*
                        .style("stroke", function() {
                            var stroke = d3.select(this).style("stroke");
                            return (stroke === "#aaaaaa") ? stroke : d3.rgb(stroke).darker(1);
                        })
                        */
                        .attr("r", 6);
                    text
                        .transition()
                        .duration(duration)
                        .style("font-size", "8px")
                        .style("fill", "#000");
                    shadow
                        .transition()
                        .duration(duration)
                        .style("font-size", "8px");
                }
                return {
                    addData : addData,
                    removeData : removeData,
                    updateData : updateData
                }
            }());

            scope.$watch('data', function(data) {
                if (data) {
                    /*
                    switch (data.getAction() ) {
                        case 'add' : graph.addData(data.getData()); break;
                        case 'remove' : graph.removeData(data.getData()); break;
                        case 'update' : graph.updateData(data.getData()); break;
                    }
                    */
                    switch (data.action) {
                        case 'add' : graph.addData(data); break;
                        case 'remove' : graph.removeData(data); break;
                        case 'update' : graph.updateData(data); break;
                    }
                }
            });
        } // end link
    }
});
/*
app.directive('graph', function(graph){

    return {
        restrict : 'A',
        scope : {
            data : '='
        },
        link : function (scope) {
            var width = 500;
            var height = 500;

            var svg = d3.select("#graph").append("svg")
                .attr({"width": "100%", "height": "100%"})
                .attr("pointer-events", "all")
                .attr("viewBox", "0 0 " + width + " " + height )
                .attr("preserveAspectRatio", "xMidYMid meet")
                .call(d3.behavior.zoom().on("zoom", scale))
                .append('svg:g');
            svg.append('svg:rect')
                .attr('width', width)
                .attr('height', height)
                .attr('fill', 'rgba(1,1,1,0)');
            svg.append("svg:defs").selectAll("marker")
                .data(["conditional","unconditional"])
                .enter().append("svg:marker")
                .attr("id", String)
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 16)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto")
                .append("svg:path")
                .attr("d", "M0,-5L10,0L0,5");

            var force = d3.layout.force()
                .gravity(.2)
                .charge(-400)
                .linkDistance(70)
                .size([width, height]);

            var nodes = force.nodes();
            var links = force.links();

            function scale() {
                svg.attr("transform","translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
            }
            function click() {
                // TODO refactor - use css classes
                var selected = d3.select(this).select("circle").attr("class");
                if (selected === "selected") {
                    d3.select(this).select(".toptext").style("fill", "#000");

                    d3.select(this).select("circle")
                        .style("fill", "#ccc")
                        .attr("class",""); // use remove class here
                } else {
                    // revert existing selection to default
                    d3.selectAll(".toptext").style("fill", "#000");
                    d3.selectAll("circle").style("fill", "#ccc");

                    // highlight current selection
                    //var textNodes = d3.select(this).selectAll("text");
                    d3.select(this).select(".toptext").style("fill", "steelblue");

                    d3.select(this).select("circle")
                        .style("fill", "steelblue")
                        .attr("class","selected");
                }
            }

            function update() {
                var link, node, nodeContainer;

                link = svg.selectAll("line.link")
                    .data(links, function(d) { return d.source.id + "-" + d.target.id; });
                link.enter().insert("line")
                    .attr("class", function(d) { return "link " + d.type; })
                    .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });;
                link.exit().remove();

                node = svg.selectAll("g.node")
                    .data(nodes, function(d) { return d.id;});
                nodeContainer = node.enter().append("g")
                    .attr("class", "node")
                    .call(force.drag)
                    .on("click", click)
                    .call(d3.helper.tooltip()
                        // todo figure out how to add an attribute class instead.
                        .style({display:'block',background:'rgba(0, 0, 0, 0.5)',color:'white',padding:'10px'})
                        .text(function(d, i){ return d.title; })
                    );
                nodeContainer.append("circle")
                    //.style("fill", function(d) { return d.color; })
                    .attr("class", function(d) { return "circle " + d.color; })
                    .attr("r", 6);
                nodeContainer.append("text")
                    .attr("x", 10)
                    .attr("y", ".31em")
                    .attr("class", "shadow")
                    .text(function(d) { return d.title; });
                nodeContainer.append("text")
                    .attr("x", 10)
                    .attr("y", ".31em")
                    .attr("class", "toptext")
                    .text(function(d) { return d.title; });
                node.exit().remove();

                force.on("tick", function() {
                    link.attr("x1", function(d) { return d.source.x; })
                        .attr("y1", function(d) { return d.source.y; })
                        .attr("x2", function(d) { return d.target.x; })
                        .attr("y2", function(d) { return d.target.y; });

                    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                });
                force.start();
            }

            function addData(data) {
                var nodeMap = {};

                data.nodes.forEach(function(node) {
                    nodeMap[node.id] = node;
                    nodes.push(node);
                });
                // For each link, add a reference to the source and the target node.
                data.links.forEach(function(link) {
                    link.source = nodeMap[link.source];
                    link.target = nodeMap[link.target];
                    links.push(link);
                });

                update();
            }

            function removeData(data) {
                data.nodes.forEach(function(node) {
                    nodeMap[node.id] = node;
                    nodes.push(node);
                });
            }

            scope.$watch('data', function(data) {
                if (data) {
                    switch (data.getAction() ) {
                        case 'add' : addData(data.getData()); break;
                        case 'remove' : removeData(data.getData()); break;
                    }
                }
            });
        } // end link
    }
});
*/
/*
app.directive('redactor', function () {
    return {
        require: '?ngModel',
        link: function (scope, el, attrs, ngModel) {
            el.redactor({
                keyupCallback: function(obj, e) {
                    scope.$apply(ngModel.$setViewValue(obj.getCode()));
                }
            });
            el.setCode(scope.content || {});
        }
    };
});
*/

app.directive('wysiwyg', function () {
    return {
        require: 'ngModel',
        /*
        link : function (scope, el, attr, ngModel) {
            scope.redactor = el.redactor({
                focus: false,
                callback: function (o) {
                    o.setCode(scope.content);
                    el.keydown(function () {
                        console.log(o.getCode());
                        scope.$apply(ngModel.$setViewValue(o.getCode()));
                    })
                }
            })
        }
        */

        link: function (scope, el, attrs, ngModel) {
            el.redactor({
                keyupCallback: function(obj, e) {
                    scope.$apply(ngModel.$setViewValue(obj.getCode()));
                }
            });
            el.setCode(scope.content);
        }

    }
});