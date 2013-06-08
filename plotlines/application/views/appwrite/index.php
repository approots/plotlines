<!DOCTYPE html>
<html ng-app="appwrite">
<head>
    <title>Plotlines</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/appwrite.css" type="text/css" rel="stylesheet">




    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/angularjs/1.1.4/angular.min.js"></script>
    <script type="text/javascript" src="js/vendor/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/vendor/ui-bootstrap-tpls-0.3.0.min.js"></script>

    <!--
    <script src="http://tinymce.cachefly.net/4.0/tinymce.min.js"></script>
    <script>
        tinymce.init({selector:'textarea'});
    </script>
    -->
    <!-- D3js -->
    <script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>
    <script type="text/javascript" src="js/vendor/d3.tooltip.js"></script>
    <link rel="stylesheet" type="text/css" href="css/graph.css" media="screen" />

    <!-- app - todo merge these with some sort of build process -->
    <script type="text/javascript" src="angularjs/appwrite/app.js"></script>
    <script type="text/javascript" src="angularjs/services/services.js"></script>
    <script type="text/javascript" src="angularjs/directives/directives.js"></script>
    <script type="text/javascript" src="angularjs/appwrite/controllers/app.js"></script>
    <script type="text/javascript" src="angularjs/appwrite/controllers/stories.js"></script>
    <script type="text/javascript" src="angularjs/appwrite/controllers/story.js"></script>
    <script type="text/javascript" src="angularjs/appwrite/controllers/passage.js"></script>
    <script type="text/javascript" src="angularjs/appwrite/controllers/test.js"></script>

    <!-- redactor wysiwyg -->
    <link href="css/redactor.css" type="text/css" rel="stylesheet">
    <script type="text/javascript" src="js/vendor/redactor.js"></script>

    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="css/base.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="css/appwrite.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="css/bootstrap-responsive.min.css" media="screen" />


</head>
<body ng-controller="AppCtrl">

    <div class="navbar navbar-fixed-top navbar-inverse">
        <div class="navbar-inner">
            <div class="container">
                <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>
                <a class="brand" href="#">Plotlines</a>
                <div class="nav-collapse">
                    <ul class="nav">
                        <li class="active"><a href="#">Link</a></li>
                        <li><a href="#">Link</a></li>
                        <li><a href="#">Link</a></li>
                    </ul>


                    <form class="navbar-search pull-right" action="">
                        <input type="text" class="search-query span2" placeholder="Search">
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div id="alerts" class="jumbotron">
        <div class="container">
            <!-- Application wide alerts -->
            <alert ng-repeat="alert in notification.getAlerts()" type="alert.type" close="notification.closeAlert($index)">{{alert.message}}</alert>

            <!-- Page loading alert -->
            <div class="alert alert-info" ng-show="notification.getLoading()"><button type="button" class="close" data-dismiss="alert">&times;</button>Loading...</div>
        </div>
    </div>


    <ng-view></ng-view>
<!--
    <div id="subnav" class="jumbotron">
        <div class="container">
            <p class="h3">Story TitleStory TitleStory TitleStory TitleStory TitleStory TitleStory Title</p>
            <a href="" class="btn btn-inverse"><i class="icon-chevron-down icon-white"></i> <strong>Story Options</strong></a>
        </div>
    </div>

    <div class="container">




    </div>
-->
    <footer class="footer">
        <div class="container">
            <p>Designed and built with all the love in the world by <a href="http://twitter.com/mdo" target="_blank">@mdo</a> and <a href="http://twitter.com/fat" target="_blank">@fat</a>.</p>
            <p>Code licensed under <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License v2.0</a>, documentation under <a href="http://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.</p>
            <p><a href="http://glyphicons.com">Glyphicons Free</a> licensed under <a href="http://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.</p>
            <ul class="footer-links">
                <li><a href="#">Blog</a></li>
                <li class="muted">&middot;</li>
                <li><a href="#">Issues</a></li>
            </ul>
        </div>
    </footer>

</body>
</html>