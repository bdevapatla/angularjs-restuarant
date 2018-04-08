(function () {
    'use strict'

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home',{
                url:'/',
                templateUrl: 'src/restuarantmenu/templates/home.template.html'
            })
            .state('categories',{
                url: '/category-list',
                templateUrl: 'src/restuarantmenu/templates/categories.template.html',
                controller: 'CategoriesController as categories',
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories().then(
                            function (response) {
                                return response.data;
                            }
                        );
                    }]
                }
            })
            .state('items',{
                url: '/category-list/{categoryShortName}',
                templateUrl: 'src/restuarantmenu/templates/items.template.html',
                controller: 'ItemsController as menuitems',
                resolve: {
                    data: ['$stateParams','MenuDataService', function ($stateParams,MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
                            .then(
                                function (response) {
                                    return response.data;
                                }
                            );
                    }]
                }
            });

    }

})();