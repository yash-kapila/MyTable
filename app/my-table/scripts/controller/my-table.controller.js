(function () {

    'use strict';
    
    angular.module('myTableApp').controller('myTableCtrl', Ctrl);

    Ctrl.$inject = ['myTableConstant', 'myTableService'];

    function Ctrl(myTableConstant, myTableService) {
        var vm = this;

        var originalData = [];

        vm.$onInit = function () {
            vm.sortingInitializations();
        };

        vm.$onChanges = function (change) {
            if (change.tableData.currentValue) {
                originalData = angular.copy(vm.tableData);
            }
        };

        vm.sortingInitializations = function () {
            vm.sortOrder = {};
            vm.currentSortOrder = {};
            /* Set default sorting behavior of columns to TRUE unless specified FALSE explicitly */
            angular.forEach(vm.columnsConfig, function (el, id) {
                if (el.enableSorting === undefined || el.enableSorting === true || el.enableSorting === null || el.enableSorting === '') {
                    el.enableSorting = true;
                    vm.sortOrder[el.name] = myTableConstant.sortOrder;
                    vm.currentSortOrder[el.name] = vm.sortOrder[el.name][0];
                } else {
                    el.enableSorting = false;
                }
            });
        };

        vm.sortColumn = function (fieldName, fieldSortingEnabled) {
            if (fieldSortingEnabled) {
                /*  If current sort order is NONE, do ASCENDING sort;
                    If current sort order is ASCENDING, do DESCENDING sort;
                    If current sort order is DESCENDING, bring table to ORIGINAL state
                */
                if (vm.currentSortOrder[fieldName] === vm.sortOrder[fieldName][0]) {
                    vm.currentSortOrder[fieldName] = vm.sortOrder[fieldName][1];
                    myTableService.sortASC(vm.tableData, fieldName);
                } else if (vm.currentSortOrder[fieldName] === vm.sortOrder[fieldName][1]) {
                    vm.currentSortOrder[fieldName] = vm.sortOrder[fieldName][2];
                    myTableService.sortDESC(vm.tableData, fieldName);
                } else {
                    vm.currentSortOrder[fieldName] = vm.sortOrder[fieldName][0];
                    vm.tableData = angular.copy(originalData);
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