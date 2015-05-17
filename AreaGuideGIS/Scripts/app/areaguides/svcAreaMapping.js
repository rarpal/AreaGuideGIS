angular
    .module('areaGuides.svc.AreaMapping', [])
    .factory('svcAreaMapping', function () {
        var areaMapping = {};
        areaMapping.areaID = "";
        areaMapping.areaType = "";

        return areaMapping;
    });
