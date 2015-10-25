
angular
    .module('areaGuides.ctrl.AreaMapping', [])
    .controller('ctrlAreaMapping', ['$scope', '$routeParams', '$location', '$http', 'svcAreaMapping', function ($scope, $routeParams, $location, $http, svcAreaMapping) {
        //debugger;

        // The bellow adjustment to the base url is needed to prevent a double // when request is to a localhost website
        var baseUrl = $("base").first().attr("href");
        baseUrl += (baseUrl == "/" ? "" : "/");
        console.log("base url for relative links = " + baseUrl);

        $scope.name = "Area Mapping";
        $scope.areaID = "";
        $scope.areaType = "OLG";
        $scope.areaMapping = svcAreaMapping;
        $scope.areaGuides = [];

        $scope.loadAllAreaGuide = function () {
            $http({
                method: 'GET',
                url: baseUrl + 'api/AreaGuidesAPI'
            }).success(function (data) {
                $scope.areaGuides = data;
            });
        };

        $scope.areaFromPostCode = function () {
            //debugger
            $.ajax({
                type: "GET",
                crossDomain: true,
                url: 'http://mapit.mysociety.org/postcode/' + $('#postcode').val(),
                //contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $.each(data["areas"], function (k, v) {
                        if (v.type == $("input:radio[name='areatype']:checked").val()) {
                            $scope.areaMapping.areaID = v.id;
                            $scope.areaMapping.areaType = $scope.areaType;
                            $scope.loadAreaGuide(v.id).done(function (data) {
                                if (data != null) {
                                    $scope.mapArea(v.id, data);
                                } else {
                                    $scope.mapArea(v.id, null);
                                }
                            });
                        }
                    })
                }
            });
        };

        $scope.loadAreaGuide = function (areaID) {
            return $.ajax({
                type: "GET",
                crossDomain: true,
                dataType: "json",
                url: baseUrl + 'api/AreaGuidesAPI/GetByAreaID/' + areaID
            }).always(function () {

            });
        };

        $scope.mapAreaGuide = function (areaGuide) {
            for (area in areaGuide) {
                $scope.mapArea(areaGuide[area]["AreaID"], areaGuide[area]).done(function (data) {
                    //data.bindPopup("I am here");
                });
            }
        };

        $scope.mapArea = function (areaID, areaGuide) {
            return $.ajax({
                type: "GET",
                crossDomain: true,
                url: 'http://mapit.mysociety.org/area/' + areaID + '.geojson',
                //contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    var fillcolor = "#ABABAB";
                    var popupInfo = "";
                    if (areaGuide != null) {
                        switch (areaGuide["Rating"]) {
                            case 1:
                                fillcolor = "#8B3626";
                                break;
                            case 2:
                                fillcolor = "#8B5A2B";
                                break;
                            case 3:
                                fillcolor = "#E3CF57";
                                break;
                            case 4:
                                fillcolor = "#00CDCD";
                                break;
                            case 5:
                                fillcolor = "#00C957";
                                break;
                        }
                        popupInfo =
                            "ID: " + areaGuide["ID"].toString() + ", Area ID: " + areaGuide["AreaID"].toString() + "<br>" +
                            "Area Type: " + areaGuide["Type"].toString() + "<br>" +
                            "Rating: " + areaGuide["Rating"].toString() + "<br>" +
                            "Avg Price: " + areaGuide["AvgPrice"].toString() + "<br>" +
                            "Notes: " + areaGuide["Notes"].toString() + "<br>" +
                            "<a href='#!/AreaMapping/Edit/" + areaGuide["ID"].toString() + "'>Edit</a>";
                    } else {
                        popupInfo =
                            "Area ID: " + areaID.toString() + "<br>" +
                            "<a href='#!/AreaMapping/Create/" + areaID.toString() + "'>Create</a>";
                    }

                    var polygon = L.geoJson(data, {
                        style: function (feature) {
                            return {
                                fillColor: fillcolor,
                                weight: 2,
                                opacity: 1,
                                color: 'white',
                                dashArray: '3',
                                fillOpacity: 0.7
                            };
                        }
                    });
                    polygon.bindPopup(popupInfo).addTo(map);
                }
            });
        };

        $scope.clearArea = function (areaID) {
            return $.ajax({
                type: "GET",
                crossDomain: true,
                url: 'http://mapit.mysociety.org/area/' + areaID + '.geojson',
                //contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    console.log('clear was success');
                    var polygon = L.geoJson(data,{
                        style: function (feature) {
                            return { fill: "#ffffff" };
                        }
                    });
                    console.log(polygon);
                    window.map.removeLayer(polygon);
                    polygon.addTo(map);

                }
            });
        };
    }]);
