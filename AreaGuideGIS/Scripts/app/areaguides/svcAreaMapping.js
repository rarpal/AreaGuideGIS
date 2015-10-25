angular
    .module('areaGuides.svc.AreaMapping', [])
    .factory('svcAreaMapping', function () {
        var areaMapping = {};
        areaMapping.areaID = "";
        areaMapping.areaType = "";

        // The bellow adjustment to the base url is needed to prevent a double // when request is to a localhost website
        var baseUrl = $("base").first().attr("href");
        baseUrl += (baseUrl == "/" ? "" : "/");

        return areaMapping;
    });
