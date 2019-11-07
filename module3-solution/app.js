(function(){
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItems);

	NarrowItDownController.$inject = ['MenuSearchService', '$timeout'];
	function NarrowItDownController(MenuSearchService, $timeout) {
		var ctrl = this;
		var narrowCalled = false;

		ctrl.narrow = function(){
			// if()
			var search = ctrl.search;
			var found = [];
			narrowCalled = true;
			if(search) {
				found = MenuSearchService.getMatchedMenuItems(search);
			}
			// else {
			//
			// }
			$timeout(function(){
				// console.log("Founded" + found.length);
				// console.log(ctrl.found);
				ctrl.found = found;
				ctrl.narrowCalled = narrowCalled;
			}, 666);
		}

		ctrl.remove = function(index){
			ctrl.found.splice(index, 1);
		}
		// console.log(narrowCalled);
	}

	MenuSearchService.$inject = ['$http'];
	function MenuSearchService($http) {
		var service = this;
		service.getMatchedMenuItems = function(searchStr){
			var foundedItems = [];
			var response = $http({
				method: 'GET',
				url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
			});

			response.then(function(result){
				var allItems = result.data.menu_items;
				for (var i = 0; i < allItems.length; i++) {
					//console.log(allItems[i]);
					var itemDesc = allItems[i].description.toLowerCase();
					if(itemDesc.indexOf(searchStr.toLowerCase()) != -1){
						foundedItems.push(allItems[i]);
					}
				}
			});
			return foundedItems;
		};
	}

	function FoundItems(){
		var ddo = {
			templateUrl: 'template.html',
			scope: {
				remove: '&onRemove',
				founded: '<foundThem',
				narrowCalled: '<narrowCalled'
			}

		};

		return ddo;
	}


})();
