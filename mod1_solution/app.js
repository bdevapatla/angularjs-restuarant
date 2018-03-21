(function () {
    'use strict'

    angular.module('LunchCheck',[])
        .controller('LunchCheckController',LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope){
        $scope.message = "";
        $scope.itemsList = "";
        $scope.checkItemsLength = function () {
            if(!$scope.itemsList){
                $scope.message = "Please enter data first";
                return;
            }
            //filter empty items
            var items = $scope.itemsList.split(",").filter(x => x);
            var itemsLength = items.length;
            if(itemsLength <=3 ){
                $scope.message = "Enjoy!"
            }
            else {
                $scope.message = "Too much!"
            }
        };
    }
})();

