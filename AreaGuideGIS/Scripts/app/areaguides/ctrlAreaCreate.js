angular
    .module('areaGuides.ctrl.AreaCreate', [])
    .controller('ctrlAreaCreate', ['$scope', '$routeParams', '$location', '$http', 'svcAreaMapping', function ($scope, $routeParams, $location, $http, svcAreaMapping) {
        //debugger;

        // The bellow adjustment to the base url is needed to prevent a double // when request is to a localhost website
        var baseUrl = $("base").first().attr("href");
        baseUrl += (baseUrl == "/" ? "" : "/");
        console.log("base url for relative links = " + baseUrl);

        $scope.name = "Area Mapping";
        $scope.areaMapping = svcAreaMapping;
        $scope.areaGuide = {
            id: 0,
            areaID: $routeParams.param,
            type: $scope.areaMapping.areaType,
            rating: 0,
            avgPrice: 0,
            notes: ""
        };

        $scope.createAreaGuide = function () {
            $http({
                method: 'POST',
                url: baseUrl + 'api/AreaGuidesAPI/' + $routeParams.param,
                data: $scope.areaGuide
            });
        };

    }]);