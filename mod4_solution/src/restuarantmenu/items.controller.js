(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);


    ItemsController.$inject = ['data'];
    function ItemsController(data) {
        var menuitems = this;
        menuitems.title = data.category.name;
        menuitems.items = data.menu_items;
    }

})();
