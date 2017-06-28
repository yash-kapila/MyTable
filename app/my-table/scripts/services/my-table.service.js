(function () {

    'use strict';
    
    angular.module('myTableApp').service('myTableService', Service);

    Service.$inject = ['$filter'];
    
    function Service($filter) {

        this.paginationInitializations = function (pagination, paginationConfig, allRecords) {
            var config = {};

            config.available = pagination.available ? pagination.available : paginationConfig.available;
            config.size = pagination.size ? pagination.size : paginationConfig.defaultSize;
            config.totalPages = (allRecords.length%config.size) === 0 ? allRecords.length/config.size : Math.floor(allRecords.length/config.size) + 1;
            config.currentPage = 1;

            return config;
        };

        this.filteringInitializations = function (myTableColumns, defaultFilterName) {
            angular.forEach(myTableColumns, function (el, id) {
                el.enableFiltering = (el.enableFiltering === true) ? true : false;
                if (el.enableFiltering) {
                    el.filter = el.filter ? el.filter : defaultFilterName;
                }
            });
            return myTableColumns;
        };

        this.sortingInitializations = function (myTableColumns, sortOrderConstant) {
            var sortOrder = {}, currentSortOrder = {};

            /* Set default sorting behavior of columns to TRUE unless specified FALSE explicitly */
            angular.forEach(myTableColumns, function (el, id) {
                if (el.enableSorting === undefined || el.enableSorting === true || el.enableSorting === null || el.enableSorting === '') {
                    el.enableSorting = true;
                    sortOrder[el.name] = sortOrderConstant;
                    currentSortOrder[el.name] = sortOrder[el.name][0];
                } else {
                    el.enableSorting = false;
                }
            });

            return {
                sortOrder: sortOrder,
                currentSortOrder: currentSortOrder
            };
        };

        this.sortColumn = function (originalOrderList, sortOrder, currentSortOrder, fieldName) {
            var tableData = {};
            /*  If current sort order is NONE, do ASCENDING sort;
                If current sort order is ASCENDING, do DESCENDING sort;
                If current sort order is DESCENDING, bring table to ORIGINAL state
            */
            if (currentSortOrder[fieldName] === sortOrder[fieldName][0]) {
                currentSortOrder[fieldName] = sortOrder[fieldName][1];
                tableData = $filter('orderBy')(originalOrderList, fieldName, false);
            } else if (currentSortOrder[fieldName] === sortOrder[fieldName][1]) {
                currentSortOrder[fieldName] = sortOrder[fieldName][2];
                tableData = $filter('orderBy')(originalOrderList, fieldName, true);
            } else {
                currentSortOrder[fieldName] = sortOrder[fieldName][0];
                tableData = $filter('orderBy')(originalOrderList, null);
            }
            /* Reset Sort Order of other columns to NONE */
            for (var key in currentSortOrder) {
                if (key !== fieldName) {
                    currentSortOrder[key] = sortOrder[key][0];
                }
            };

            return {
                tableData: tableData,
                currentSortOrder: currentSortOrder,
                sortOrder: sortOrder
            };
        };

        this.resetFilterValues = function (myTableColumns) {
            angular.forEach(myTableColumns, function(elem, key){
                elem.filterModel = '';
            });
            return myTableColumns;
        };
    };
})();