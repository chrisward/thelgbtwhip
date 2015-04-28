app.controller('postcodeController', [
    '$scope', 'postcodeDataService', function ($scope, postcodeDataService) {

    $scope.postcode = "";

    $scope.validationClass = "postcodeFine";

    $scope.processFailedResponse = function(data, status) {
        $scope.validationClass = "postcodeError";
    };

    $scope.submitPostcode = function () {
        postcodeDataService.getConstituencyByPostcode($scope.postcode)
        .success(function (data) {
                $scope.validationClass = "postcodeFine";
                console.log(data);
            })
        .error(function (data, status) {
            $scope.processFailedResponse(data, status);
        });
    }
}]);