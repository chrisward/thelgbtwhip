var app = angular.module("lgbtWhip", []);

app.service('postcodeDataService', ['$http', function ($http) {
    this.getConstituencyByPostcode = function (postcode) {
        return $http.get(lgbtw.settings.apiBaseUrl + '/constituency/search?postcode=' + postcode);
    };
}]);

app.service('candidatesDataService', ['$http', function ($http) {
    this.getCandidateById = function (id) {
        return $http.get(lgbtw.settings.apiBaseUrl + '/candidate?id=' + id);
    };

}]);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});