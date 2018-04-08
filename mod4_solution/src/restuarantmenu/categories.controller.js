(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('CategoriesController', CategoriesController);


    CategoriesController.$inject = ['items'];
    function CategoriesController(items) {
        var mainlist = this;
        mainlist.items = items;
    }

})();
