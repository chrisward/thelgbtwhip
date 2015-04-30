app.controller('postcodeController', [
    '$scope', 'postcodeDataService', function ($scope, postcodeDataService) {

    $scope.postcode = "";

    $scope.validationClass = "postcodeFine";
    $scope.showError = false;

    $scope.processFailedResponse = function(data, status) {
        $scope.validationClass = "postcodeError";
        $scope.showError = true;
    };

    $scope.submitPostcode = function () {
        postcodeDataService.getConstituencyByPostcode($scope.postcode)
        .success(function (data) {
                $scope.validationClass = "postcodeFine";
                location.href = lgbtw.settings.lgbtwPickCandsUrl + $scope.postcode;
            })
        .error(function (data, status) {
            $scope.processFailedResponse(data, status);
        });
    }
}]);