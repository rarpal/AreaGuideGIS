angular
    .module('areaGuides.ctrl.AreaCreate', [])
    .controller('ctrlAreaCreate', ['$scope', '$routeParams', '$location', '$http', 'svcAreaMapping', function ($scope, $routeParams, $location, $http, svcAreaMapping) {
        //debugger;
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
                url: 'api/AreaGuidesAPI/' + $routeParams.param,
                data: $scope.areaGuide
            });
        };

    }]);