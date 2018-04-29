(function () {
    'use strict';

    angular.module('MenuApp')
        .component('items', {
            templateUrl: 'src/restuarantmenu/templates/items.component.template.html',
            bindings: {
                items: '<',
                title:'@'
            }
        });
})();
