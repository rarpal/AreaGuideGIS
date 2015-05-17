
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

        //$routeProvider.when('/Home', {
        //    templateUrl: '/AreaMapping/Index',
        //    controller: 'ctrlAreaMapping',
        //});
        $routeProvider.when('/About', {
            templateUrl: '/Home/About',
            controller: 'ctrlAbout',
        });
        $routeProvider.when('/Contact', {
            templateUrl: '/Home/Contact',
            controller: 'ctrlContact',
        });
        $routeProvider.when('/AreaMapping', {
            templateUrl: '/AreaMapping/Index',
            controller: 'ctrlAreaMapping'
        });
        $routeProvider.when('/AreaMapping/Edit/:param', {
            templateUrl: '/AreaMapping/Edit',
            controller: 'ctrlAreaEdit'
        });
        $routeProvider.when('/AreaMapping/Create/:param', {
            templateUrl: '/AreaMapping/Create',
            controller: 'ctrlAreaCreate'
        });
        $routeProvider.when('/AreaMapping/Delete/:param', {
            templateUrl: '/AreaMapping/Delete',
            controller: 'ctrlAreaEdit'
        });

        // Specify HTML5 mode (using the History APIs) or HashBang syntax.
        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);

