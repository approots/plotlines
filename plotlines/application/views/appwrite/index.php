<!DOCTYPE html>
<html ng-app="appwrite">
<head>
    <title>Leaplit</title>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/angularjs/1.1.3/angular.min.js"></script>
    <script type="text/javascript" src="js/vendor/bootstrap.min.js"></script>

    <!-- TODO merge these with some sort of build process -->
    <script type="text/javascript" src="angularjs/appwrite/app.js"></script>
    <script type="text/javascript" src="angularjs/services/services.js"></script>
    <script type="text/javascript" src="angularjs/directives/directives.js"></script>
    <script type="text/javascript" src="angularjs/appwrite/controllers/stories.js"></script>
    <script type="text/javascript" src="angularjs/appwrite/controllers/story.js"></script>
    <script type="text/javascript" src="angularjs/appwrite/controllers/passage.js"></script>

    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" media="screen" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/bootstrap-responsive.min.css" type="text/css" rel="stylesheet">

    <style type="text/css">
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


</head>
<body>

    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span12">
                <h1 class="text-center">Leaplit</h1>
            </div>
        </div>

        <div class="row-fluid">
            <div class="span1"><a href="">Link</a></div>
            <div class="span11">
                <ng-view></ng-view>
            </div>
        </div>
    </div>

</body>
</html>