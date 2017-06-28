(function () {

    'use strict';

    angular.module('myTableApp').controller('myTablePaginationCtrl', Ctrl);

    Ctrl.$inject = [];

    function Ctrl () {
    	var vm = this;

    	vm.$onChanges = function (changes) {
    		if(changes.paginationConfig.currentValue) {
    			vm.paginationBar = [];
    			var numberOfPages = changes.paginationConfig.currentValue.totalPages;
    			for(var i=1;i<=numberOfPages;i++) {
    				vm.paginationBar.push(i);
    			}
    		}
    	};

    	vm.fetchNewPageData = function (pageID) {
    		vm.paginationConfig.currentPage = pageID;
    		vm.fetchNewPage({
    			id: pageID
    		});
    	};
    };
})();