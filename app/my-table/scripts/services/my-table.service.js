class MyTableService {
    constructor ($filter) {
        this.$filter = $filter;
    };

    paginationInitializations (pagination, paginationConfig, allRecords) {
        let config = {
            available: pagination.available ? pagination.available : paginationConfig.available,
            size: pagination.size ? pagination.size : paginationConfig.defaultSize,
            currentPage: 1
        };

        config.totalPages = (allRecords.length%config.size) === 0 ? allRecords.length/config.size : Math.floor(allRecords.length/config.size) + 1

        return config;
    };

    filteringInitializations (myTableColumns, defaultFilterName) {
        angular.forEach(myTableColumns, function (el, id) {
            el.enableFiltering = (el.enableFiltering === true) ? true : false;
            if (el.enableFiltering) {
                el.filter = el.filter ? el.filter : defaultFilterName;
            }
        });
        return myTableColumns;
    };

    sortingInitializations (myTableColumns, sortOrderConstant) {
        let sortOrder = {}, currentSortOrder = {};

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

    sortColumn (originalOrderList, sortOrder, currentSortOrder, fieldName) {
        let tableData = {};
        /*  If current sort order is NONE, do ASCENDING sort;
            If current sort order is ASCENDING, do DESCENDING sort;
            If current sort order is DESCENDING, bring table to ORIGINAL state
        */
        if (currentSortOrder[fieldName] === sortOrder[fieldName][0]) {
            currentSortOrder[fieldName] = sortOrder[fieldName][1];
            tableData = this.$filter('orderBy')(originalOrderList, fieldName, false);
        } else if (currentSortOrder[fieldName] === sortOrder[fieldName][1]) {
            currentSortOrder[fieldName] = sortOrder[fieldName][2];
            tableData = this.$filter('orderBy')(originalOrderList, fieldName, true);
        } else {
            currentSortOrder[fieldName] = sortOrder[fieldName][0];
            tableData = this.$filter('orderBy')(originalOrderList, null);
        }
        /* Reset Sort Order of other columns to NONE */
        for (let key in currentSortOrder) {
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

    resetFilterValues (myTableColumns) {
        angular.forEach(myTableColumns, function(elem, key){
            elem.filterModel = '';
        });
        return myTableColumns;
    };
};

angular.module('myTableApp').service('myTableService', MyTableService);