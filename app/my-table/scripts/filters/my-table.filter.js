(function () {

    'use strict';

    angular.module('myTableApp').filter('myTableFilter', function ($filter) {
        return function (tableData, myTableColumns) {
            if (!!tableData) {
                angular.forEach(myTableColumns, function (elem) {
                    if (elem.enableFiltering && elem.filterModel) {
                        tableData = $filter(elem.filter)(tableData, elem.name, elem.filterModel);
                    }
                });
                return tableData;
            } else {
                return tableData;
            }
        }
    });
})();