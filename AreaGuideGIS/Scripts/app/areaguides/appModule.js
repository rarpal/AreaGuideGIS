
angular
    .module('areaGuides', [
        'areaGuides.ctrl.home',
        'areaGuides.ctrl.contact',
        'areaGuides.ctrl.about',
        'areaGuides.ctrl.AreaMapping',
        'areaGuides.ctrl.AreaEdit',
        'areaGuides.ctrl.AreaCreate',
        'areaGuides.svc.AreaMapping'
    ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        // The bellow adjustment to the base url is needed to prevent a double // when request is to a localhost website
        var baseUrl = $("base").first().attr("href");
        baseUrl += (baseUrl == "/" ? "" : "/");
        console.log("base url for relative links = " + baseUrl);
        //$routeProvider.when('/Home', {
        //    templateUrl: '/AreaMapping/Index',
        //    controller: 'ctrlAreaMapping',
        //});
        $routeProvider.when('/About', {
            templateUrl: baseUrl + 'AreaGuideGIS/Home/About',
            controller: 'ctrlAbout',
        });
        $routeProvider.when('/Contact', {
            templateUrl: baseUrl + 'AreaGuideGIS/Home/Contact',
            controller: 'ctrlContact',
        });
        $routeProvider.when('/AreaMapping', {
            templateUrl: baseUrl + 'AreaMapping/Index',
            controller: 'ctrlAreaMapping'
        });
        $routeProvider.when('/AreaMapping/Edit/:param', {
            templateUrl: function (params) { return baseUrl + 'AreaMapping/Edit/' + params.param; },
            controller: 'ctrlAreaEdit'
        });
        $routeProvider.when('/AreaMapping/Create/:param', {
            templateUrl: function (params) { return baseUrl + 'AreaMapping/Create/' + params.param; },
            controller: 'ctrlAreaCreate'
        });
        $routeProvider.when('/AreaMapping/Delete/:param', {
            templateUrl: function (params) { return baseUrl + 'AreaMapping/Delete/' + params.param; },
            controller: 'ctrlAreaEdit'
        });

        // Specify HTML5 mode (using the History APIs) or HashBang syntax.
        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);
