angular
    .module('areaGuides.ctrl.AreaEdit', [])
    .controller('ctrlAreaEdit', ['$scope', '$routeParams', '$location', '$http', function ($scope, $routeParams, $location, $http) {
        //debugger;

        // The bellow adjustment to the base url is needed to prevent a double // when request is to a localhost website
        var baseUrl = $("base").first().attr("href");
        baseUrl += (baseUrl == "/" ? "" : "/");
        console.log("base url for relative links = " + baseUrl);

        $scope.name = "Area Mapping";
        $scope.areaGuide = {
            id: 0,
            areaID: "",
            type: "",
            rating: 0,
            avgPrice: 0,
            notes: ""
        };

        $http({
            method: 'GET',
            url: baseUrl + 'api/AreaGuidesAPI/' + $routeParams.param
        }).success(function (data) {
            $scope.areaGuide.id = data["ID"];
            $scope.areaGuide.areaID = data["AreaID"];
            $scope.areaGuide.type = data["Type"];
            $scope.areaGuide.rating = data["Rating"];
            $scope.areaGuide.avgPrice = data["AvgPrice"];
            $scope.areaGuide.notes = data["Notes"];
        });

        $scope.saveAreaGuide = function () {
            $http({
                method: 'PUT',
                url: baseUrl + 'api/AreaGuidesAPI/' + $routeParams.param,
                data: $scope.areaGuide
            });
        };

        $scope.deleteAreaGuide = function () {
            $http({
                method: 'DELETE',
                url: baseUrl + 'api/AreaGuidesAPI/' + $routeParams.param,
                data: $scope.areaGuide
            });
        };

    }]);