let myTablePagination = {
    templateUrl: 'my-table-pagination/my-table-pagination.html',
    controller: 'myTablePaginationCtrl',
    bindings: {
        paginationConfig: '<',
        fetchNewPage: '&'
    }
};

angular.module('myTableApp').component('myTablePagination', myTablePagination);