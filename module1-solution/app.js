(function() {
  angular.module('LunchCheck',[]) //[] for dependencies
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.items = "";
    $scope.message = "";
    $scope.checked = false;

    $scope.validate = function() {
      var items = $scope.items.split(",");
      var unEmptyItems = items.filter(function(item) {
        if(item.trim()!=="") {
          return item;
        }
      });
      var len = unEmptyItems.length;
      if(len==0) {
        $scope.message = "Please enter data first"; // this is if submit is pressed after one of the enjoy or too much
      }
      else if(len>=1 && len<=3) {
        $scope.message = "Enjoy!";
      }
      else {
        $scope.message="Too much";
      }
    }
  }
})();
