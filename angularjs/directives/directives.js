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
                //.nodes(data.nodes)
                //.links(data.links)
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

            // Start could be done elsewhere...
            // Create a node map for node lookup - this could be done on the server.
            /*
            var nodeMap = {};

            data.nodes.forEach(function(node) { nodeMap[node.id] = node; });
            // For each link, add a reference to the source and the target node.
            data.links.forEach(function(link) {
                link.source = nodeMap[link.source];
                link.target = nodeMap[link.target];
            });
            // ...End could be done elsewhere
            */



            console.log('in graph directive');
            scope.$watch('data', function(scopeData) {
                if (scopeData) {

                    var nodeMap = {};
                    data = angular.copy(scopeData);

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

                    console.log(nodes);
                    console.log(links);
                    update();
                }
            });
        } // end link
    }
});
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