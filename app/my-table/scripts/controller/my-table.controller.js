(function () {

    'use strict';
    
    angular.module('myTableApp').controller('myTableCtrl', Ctrl);

    Ctrl.$inject = ['myTableConstant', 'myTableService', '$filter'];

    function Ctrl(myTableConstant, myTableService, $filter) {
        var vm = this;

        vm.$onInit = function () {
            vm.myTableColumns = angular.copy(vm.columnsConfig);
            vm.filteringInitializations();
            vm.sortingInitializations();
        };

        vm.filteringInitializations = function () {
            angular.forEach(vm.myTableColumns, function (el, id) {
                el.enableFiltering = (el.enableFiltering === true) ? true : false;
                if (el.enableFiltering) {
                    el.filter = el.filter ? el.filter : myTableConstant.defaultFilterName;
                }
            });
        };

        vm.sortingInitializations = function () {
            vm.sortOrder = {};
            vm.currentSortOrder = {};
            /* Set default sorting behavior of columns to TRUE unless specified FALSE explicitly */
            angular.forEach(vm.myTableColumns, function (el, id) {
                if (el.enableSorting === undefined || el.enableSorting === true || el.enableSorting === null || el.enableSorting === '') {
                    el.enableSorting = true;
                    vm.sortOrder[el.name] = myTableConstant.sortOrder;
                    vm.currentSortOrder[el.name] = vm.sortOrder[el.name][0];
                } else {
                    el.enableSorting = false;
                }
            });
        };

        vm.filterTableData = function (fieldName, filterName, searchField) {
            vm.unfilteredList = vm.unfilteredList || vm.tableData;
            searchField = (!!searchField) ? searchField : '';
            vm.tableData = $filter(filterName)(vm.tableData, fieldName, searchField);
        };

        vm.sortColumn = function (fieldName, fieldSortingEnabled) {
            vm.originalOrderList = vm.originalOrderList || vm.tableData;
            if (fieldSortingEnabled) {
                /*  If current sort order is NONE, do ASCENDING sort;
                    If current sort order is ASCENDING, do DESCENDING sort;
                    If current sort order is DESCENDING, bring table to ORIGINAL state
                */
                if (vm.currentSortOrder[fieldName] === vm.sortOrder[fieldName][0]) {
                    vm.currentSortOrder[fieldName] = vm.sortOrder[fieldName][1];
                    vm.tableData = $filter('orderBy')(vm.originalOrderList, fieldName, false);
                } else if (vm.currentSortOrder[fieldName] === vm.sortOrder[fieldName][1]) {
                    vm.currentSortOrder[fieldName] = vm.sortOrder[fieldName][2];
                    vm.tableData = $filter('orderBy')(vm.originalOrderList, fieldName, true);
                } else {
                    vm.currentSortOrder[fieldName] = vm.sortOrder[fieldName][0];
                    vm.tableData = $filter('orderBy')(vm.originalOrderList, null);
                }
                /* Reset Sort Order of other columns to NONE */
                for (var key in vm.currentSortOrder) {
                    if (key !== fieldName) {
                        vm.currentSortOrder[key] = vm.sortOrder[key][0];
                    }
                };
            } else {
                return;
            }
        };
    };
})();