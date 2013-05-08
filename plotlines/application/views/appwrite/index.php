<!DOCTYPE html>
<html ng-app="appwrite">
<head>
    <title>Leaplit</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/appwrite.css" type="text/css" rel="stylesheet">
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/angularjs/1.1.4/angular.min.js"></script>
    <!-- <script type="text/javascript" src="js/vendor/bootstrap.min.js"></script> -->
    <!--  -->
    <script type="text/javascript" src="js/vendor/ui-bootstrap-tpls-0.3.0.min.js"></script>



    <!-- TODO merge these with some sort of build process -->
    <script type="text/javascript" src="angularjs/appwrite/app.js"></script>
    <script type="text/javascript" src="angularjs/services/services.js"></script>
    <script type="text/javascript" src="angularjs/directives/directives.js"></script>
    <script type="text/javascript" src="angularjs/appwrite/controllers/app.js"></script>
    <script type="text/javascript" src="angularjs/appwrite/controllers/stories.js"></script>
    <script type="text/javascript" src="angularjs/appwrite/controllers/story.js"></script>
    <script type="text/javascript" src="angularjs/appwrite/controllers/passage.js"></script>

    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" media="screen" />



    <style type="text/css">

        /* top padding for bootstrap fixed navbar on various screen sizes */
        body { padding-top: 60px; }
        @media screen and (max-width: 768px) {
            body { padding-top: 0px; }
        }

        /* Override bootstrap style that shows input error on focus for required fields. */
        input:focus:invalid:focus,
        textarea:focus:invalid:focus,
        select:focus:invalid:focus {
            border-color: rgba(82, 168, 236, 0.8);
            outline: 0;
            outline: thin dotted \9;
            /* IE6-9 */
            -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
            -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
        }
        .story-form input.ng-invalid.ng-dirty {
            border-color: #953b39;
            -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #d59392;
            -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #d59392;
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #d59392;
        }
        .story-form textarea.ng-invalid.ng-dirty {
            border-color: #953b39;
            -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #d59392;
            -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #d59392;
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #d59392;
        }

        .floatLeftMedia.h2 {
            float:left;
            padding: 12px 5px 0 0;
        }
        .floatLeftMedia.p {
            float:left;
            padding: 0 5px 5px 0;
        }

            /*
            .story-form input.ng-valid.ng-dirty {
                outline:none;
                border-color: #0eb91c;
                box-shadow:0 0 4px #0eb91c;
            }
            */

    </style>

    <link href="css/bootstrap-responsive.min.css" type="text/css" rel="stylesheet">


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
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form class="navbar-search pull-right" action="">
                        <input type="text" class="search-query span2" placeholder="Search">
                    </form>
                </div><!-- /.nav-collapse -->
            </div><!-- /.container -->
        </div><!-- /.navbar-inner -->
    </div><!-- /.navbar -->

    <!-- <div class="container-fluid">
    <!--  <div class="row-fluid">-->
    <div class="container">

        <!-- Application wide alerts -->
        <alert ng-repeat="alert in notification.getAlerts()" type="alert.type" close="notification.closeAlert($index)">{{alert.message}}</alert>

        <!-- Page loading alert -->
        <div class="alert alert-info" ng-show="notification.getLoading()"><button type="button" class="close" data-dismiss="alert">&times;</button>Loading...</div>

<!--
        <div class="row">
            <div class="span1"><a href="">Link</a></div>
            <div class="span11"> -->
                <ng-view></ng-view>

      <!--      </div>
        </div> -->

    </div>

</body>
</html>