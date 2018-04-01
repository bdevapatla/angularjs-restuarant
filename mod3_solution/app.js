(function () {
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsListDirective)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

    function FoundItemsListDirective() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'founditems.html',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: FoundItemsListDirectiveController,
            controllerAs: 'list',
            bindToController: true,
            link: FoundItemsDirectiveLink
        };
        return ddo;
    }
    
    function FoundItemsListDirectiveController() {
        var list = this;

        list.getStateofSearch = function () {
            if(typeof(list.foundItems) === "undefined" || !list.foundItems)
                return "NOT_SEARCHED_YET";
            else if(list.foundItems.length == 0)
                return "EMPTY_SEARCH_OR_RESULTS";
            else
             return "NON_EMPTY_SEARCH_RESULTS";
        };
    }

    function FoundItemsDirectiveLink(scope, element, attrs, controller) {

        var emptyElement = element.find("div.error");
        var gridElement = element.find("div.container");

        scope.$watch('list.getStateofSearch()', function (newValue, oldValue) {
            if (newValue === "NOT_SEARCHED_YET") {
                hideAll();
            }
            else if (newValue === "EMPTY_SEARCH_OR_RESULTS") {
                displayEmptyMessage();
            }
            else {
                displayGrid();
            }
        });

        function displayEmptyMessage() {
            emptyElement.css('display', 'block');
            gridElement.css('display', 'none');
        }

        function hideAll() {
            emptyElement.css('display', 'none');
            gridElement.css('display', 'none');
        }


        function displayGrid() {
            emptyElement.css('display', 'none');
            gridElement.css('display', 'block');
        }
    }


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.getItems = function () {
            if (ctrl.search) {
                MenuSearchService.getMatchedMenuItems(ctrl.search).then(function (response) {
                    ctrl.found = response;
                });
            }
            else {
                ctrl.found = [];
            }
        };
        ctrl.removeItem = function (index) {
            ctrl.found.splice(index, 1);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        service.getMatchedMenuItems = function (search) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            })
            .then(function (result) {
                var foundItems = result.data.menu_items.filter(x => x.description.indexOf(search.toLowerCase()) !== -1);
                return foundItems;
            });
        };
    }

})();