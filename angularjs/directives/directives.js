app.directive('uniqueSlug', function(Utils) {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                var existingValues = scope[attrs.uniqueSlug];
                if (existingValues.indexOf(Utils.slugify(viewValue)) === -1) {
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

app.directive('uniqueTitle', function(Utils) {
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