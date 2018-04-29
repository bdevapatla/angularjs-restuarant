(function () {
    'use strict'

    angular.module('ShoppingListCheckOff',[])
        .controller('ToBuyController',ToBuyController)
        .controller('AlreadyBoughtController',AlreadyBoughtController)
        .service('ShoppingListCheckOffService',ShoppingListCheckOffService);


    ToBuyController.$inject = ['ShoppingListCheckOffService',]

    function ToBuyController(ShoppingListCheckOffService) {
        var buy = this;

        buy.items = ShoppingListCheckOffService.getBuyItems();

        buy.removeBuyItem = function (itemIndex) {
            ShoppingListCheckOffService.removeBuyItem(itemIndex);
        }
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var bought = this;

        bought.items = ShoppingListCheckOffService.getBoughtItems();

    }


    function ShoppingListCheckOffService() {

        var service = this;

        var buyItems = [
            {
                name:"Blueberries",
                quantity:"2 pints"
            },
            {
                name:"Strawberries",
                quantity: "1 pint"
            },
            {
                name:"Milk",
                quantity: "3 half quarts"
            },
            {
                name:"Water",
                quantity:"1 gallon"
            },
            {
                name:"Eggs",
                quantity:"2 dozens"
            }
        ];

        var boughtItems = [];

        service.removeBuyItem = function (itemIdex) {
            var item = {
                name: buyItems[itemIdex].name,
                quantity: buyItems[itemIdex].quantity
            };
            boughtItems.push(item);
            buyItems.splice(itemIdex, 1);
        };

        service.getBuyItems = function () {
            return buyItems;
        };

        service.getBoughtItems = function () {
            return boughtItems;
        };

    }

})();