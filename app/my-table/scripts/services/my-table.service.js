(function () {

    'use strict';
    
    angular.module('myTableApp').service('myTableService', Service);

    Service.$inject = [];
    
    function Service() {
        this.sortASC = function (tableData, fieldName) {
            tableData.sort(function (el1, el2) {
                if (el1[fieldName] < el2[fieldName]) {
                    return -1;
                } else if (el1[fieldName] > el2[fieldName]) {
                    return 1;
                } else {
                    return 0;
                }
            });
        };

        this.sortDESC = function (tableData, fieldName) {
            tableData.sort(function (el1, el2) {
                if (el1[fieldName] < el2[fieldName]) {
                    return 1;
                } else if (el1[fieldName] > el2[fieldName]) {
                    return -1;
                } else {
                    return 0;
                }
            });
        };
    };
})();