(function() {
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyArr = this;
    toBuyArr.items = ShoppingListCheckOffService.getToBuy();

    toBuyArr.buyItem = function(index) {
      ShoppingListCheckOffService.buyItem(index);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function AlreadyBoughtController(ShoppingListCheckOffService) {
      var alreadyBoughtArr = this;
      alreadyBoughtArr.items = ShoppingListCheckOffService.getAlreadyBought();
  }

  function ShoppingListCheckOffService() {
      var service = this;
      var toBuy = [
          { name: "cookies", quantity: 4 },
          { name: "cokes", quantity: 5 },
          { name: "beers", quantity: 3 },
          { name: "apples", quantity: 7 },
          { name: "bananas", quantity: 8 }
      ];
      var alreadyBought = [];

      service.buyItem = function(i) {
          var item = toBuy[i];
          alreadyBought.push(item);
          toBuy.splice(i, 1);
      };

      service.getToBuy = function() {
          return toBuy;
      };

      service.getAlreadyBought = function() {
          return alreadyBought;
      };
  }

})();
