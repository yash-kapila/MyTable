(function () {

    'use strict';
    
    angular.module('myTableApp').controller('myTableCtrl', Ctrl);

    Ctrl.$inject = ['myTableConstant', 'myTableService'];

    function Ctrl(myTableConstant, myTableService) {
        var vm = this;

        vm.$onInit = function () {
            vm.myTableColumns = angular.copy(vm.columnsConfig);
            vm.filteringInitializations();
            vm.sortingInitializations();
        };

        vm.$onChanges = function (changes) {
            if (!!changes.tableData.currentValue) {
                vm.paginationInitializations();
            }
        };

        vm.paginationInitializations = function () {
            if (vm.pagination.available) {
                vm.paginationConfig = myTableService.paginationInitializations(vm.pagination, myTableConstant.paginationConfig, vm.tableData);
                vm.displayRecords = vm.tableData.slice(0, vm.paginationConfig.size);
            } else {
                vm.displayRecords = vm.tableData.slice(0);
            }
        };

        vm.filteringInitializations = function () {
            vm.myTableColumns = myTableService.filteringInitializations(vm.myTableColumns, myTableConstant.defaultFilterName);
        };

        vm.sortingInitializations = function () {
            var sortingInitializations = myTableService.sortingInitializations(vm.myTableColumns, myTableConstant.sortOrder);
            vm.sortOrder = sortingInitializations.sortOrder;
            vm.currentSortOrder = sortingInitializations.currentSortOrder;
        };

        vm.sortColumn = function (fieldName, fieldSortingEnabled) {
            vm.originalOrderList = vm.originalOrderList || vm.tableData;
            if (fieldSortingEnabled) {
                var sortedColumns = myTableService.sortColumn(vm.originalOrderList, vm.sortOrder, vm.currentSortOrder, fieldName)
                vm.tableData = sortedColumns.tableData;
                if (vm.pagination.available) {
                    vm.paginationConfig.currentPage = 1;
                    vm.displayRecords = vm.tableData.slice(0, vm.paginationConfig.size);
                } else {
                    vm.displayRecords = vm.tableData.slice(0);
                }
                vm.sortOrder = sortedColumns.sortOrder;
                vm.currentSortOrder = sortedColumns.currentSortOrder;
            } else {
                return;
            }
        };

        vm.fetchNewPage = function (id) {
            var start = (id - 1) * vm.paginationConfig.size;
            var end = id * vm.paginationConfig.size;
            vm.displayRecords = vm.tableData.slice(start, end);
        };
    };
})();