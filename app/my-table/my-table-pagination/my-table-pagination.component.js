(function () {

    'use strict';

    var myTablePagination = {
        templateUrl: 'my-table/my-table-pagination/my-table-pagination.html',
        controller: 'myTablePaginationCtrl',
        bindings: {
            paginationConfig: '<',
            fetchNewPage: '&'
        }
    }

    angular.module('myTableApp').component('myTablePagination', myTablePagination);
})();