app.controller('selectCandidatesController', [
    '$scope', 'candidatesDataService', 'postcodeDataService', function ($scope, candidatesDataService, postcodeDataService) {

    $scope.postcode = lgbtw.urlParams.postcode;
    $scope.formattedPostcode = lgbtw.urlParams.postcode.replace(/ /g, '').toUpperCase();
    $scope.postcodeValidated = false;
    $scope.constituencyData = null;
    $scope.candidateModel = null;

    $scope.selectedCandidates = [];

    $scope.resultsUrl = "";

    function compare(a, b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }

    postcodeDataService.getConstituencyByPostcode($scope.postcode)
        .success(function (data) {
            $scope.postcodeValidated = true;
            $scope.constituencyData = data;
            $scope.populateCandidateModel(data);
            console.log(data);
        })
        .error(function (data, status) {
        location.href = "index.html";
        });

    $scope.selectCandidate = function (candidateId) {
        // First check if the candidate is already in there. If so, remove.
        var currentIndex = $scope.selectedCandidates.indexOf(candidateId);
        if (currentIndex != -1) {
            $scope.selectedCandidates.splice(currentIndex, 1);
        }
        else if ($scope.selectedCandidates.length < 3) {
            $scope.selectedCandidates.push(candidateId);
        }

        if ($scope.selectedCandidates.length > 1) {
            $scope.resultsUrl = "/search-results-select-master.html?postcode=" + $scope.formattedPostcode;
            for (var i = 0; i < $scope.selectedCandidates.length; i++) {
                $scope.resultsUrl += "&c" + (i + 1) + "=" + $scope.selectedCandidates[i];
            }
        } else {
            $scope.resultsUrl = "";
        }

        console.log($scope.selectedCandidates);
    };

    $scope.populateCandidateModel = function(data) {
        if ($scope.constituencyData === null) {
            return;
        }

        var noOfRows = Math.floor(data.candidates.length / 3);
        if (data.candidates.length % 3 > 0) {
            noOfRows++;
        }

        $scope.candidateModel = Array(noOfRows);

        for (var i = 0; i < data.candidates.length; i++) {
            data.candidates[i].photo = "img/question_mark.png";
            var rowNo = Math.floor(i / 3);
            var colNo = i % 3;

            var newArrayCount = 3;
            if (data.candidates.length - i < 3) {
                newArrayCount = data.candidates.length - i;
            }
            if (colNo === 0) {
                $scope.candidateModel[rowNo] = Array(newArrayCount);
            }

            $scope.candidateModel[rowNo][colNo] = data.candidates[i];
        }

        console.log("Working candidate model....");
        console.log($scope.candidateModel);
    };

    $scope.getPartyLogoSrc = function (partyId) {
        switch(partyId) {
            case 52:
            {
                return "party-logos/cons_cropped.png";
            }
            case 53:
            case 119:
            {
                return "party-logos/labour_cropped.png";
            }
            case 63:
            case 130:
            {
                return "party-logos/greens_cropped.png";
            }
            case 85:
            {
                return "party-logos/ukip_cropped.png";
            }
            case 90:
            {
                return "party-logos/libdem_cropped.png";
            }
            default:
            {
                return "party-logos/logo-main.png";
            }
        }

    };

}]);