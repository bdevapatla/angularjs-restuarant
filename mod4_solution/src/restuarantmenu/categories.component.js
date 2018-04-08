(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            templateUrl: 'src/restuarantmenu/templates/categories.component.template.html',
            bindings: {
                items: '<'
            }
        });
})();
