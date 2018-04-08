(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);


    ItemsController.$inject = ['MenuDataService','data'];
    function ItemsController(MenuDataService,data) {
        var menuitems = this;
        menuitems.title = data.category.name;
        menuitems.items = data.menu_items;
    }

})();
