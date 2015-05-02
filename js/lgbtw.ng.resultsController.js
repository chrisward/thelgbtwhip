app.controller('resultsController', [
    '$scope', 'candidatesDataService', 'postcodeDataService', function($scope, candidatesDataService, postcodeDataService) {

        $scope.postcode = lgbtw.urlParams.postcode;
        $scope.candids = [
            lgbtw.urlParams.cand1,
            lgbtw.urlParams.cand2,
            lgbtw.urlParams.cand3
                         ];

        $scope.cands = [];

        $scope.formattedPostcode = lgbtw.urlParams.postcode.replace(/ /g, '').toUpperCase();

        for (var i = 0; i < $scope.candids.length; i++) {
            candidatesDataService.getCandidateById($scope.candids[i])
            .success(function (data) {
                data.photo = 'img/question_mark.png';
                $scope.cands.push(data);
                console.log(data);
            })
            .error(function (data, status) {
                location.href = "index.html";
            });
        }
    }
]);