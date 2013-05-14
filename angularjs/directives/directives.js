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