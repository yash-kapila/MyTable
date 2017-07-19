class MyTableCtrl {
    constructor ($filter, myTableConstant, myTableService) {
        this.$filter = $filter;
        this.myTableConstant = myTableConstant;
        this.myTableService = myTableService;
    };

    $onInit () {
        this.myTableColumns = angular.copy(this.columnsConfig);
        this.filteringInitializations();
        this.sortingInitializations();
    };

    $onChanges (changes) {
        if (!!changes.tableData.currentValue) {
            this.paginationInitializations();
        }
    };

    paginationInitializations () {
        if (this.pagination.available) {
            this.paginationConfig = this.myTableService.paginationInitializations(this.pagination, this.myTableConstant.paginationConfig, this.tableData);
            this.displayRecords = this.tableData.slice(0, this.paginationConfig.size);
        } else {
            this.displayRecords = this.tableData.slice(0);
        }
    };

    filteringInitializations () {
        this.myTableColumns = this.myTableService.filteringInitializations(this.myTableColumns, this.myTableConstant.defaultFilterName);
    };

    sortingInitializations () {
        let sortingInitializations = this.myTableService.sortingInitializations(this.myTableColumns, this.myTableConstant.sortOrder);
        this.sortOrder = sortingInitializations.sortOrder;
        this.currentSortOrder = sortingInitializations.currentSortOrder;
    };

    sortColumn (fieldName, fieldSortingEnabled) {
        this.originalOrderList = this.originalOrderList || this.tableData;
        if (fieldSortingEnabled) {
            let sortedColumns = this.myTableService.sortColumn(this.originalOrderList, this.sortOrder, this.currentSortOrder, fieldName)
            this.tableData = sortedColumns.tableData;
            this.filteredRecords = sortedColumns.tableData;
            this.sortOrder = sortedColumns.sortOrder;
            this.currentSortOrder = sortedColumns.currentSortOrder;
            this.paginationInitializations();
            this.myTableColumns = this.myTableService.resetFilterValues(this.myTableColumns);
        } else {
            return;
        }
    };

    filterColumn () {
        this.filteredRecords = this.$filter('myTableFilter')(this.tableData, this.myTableColumns) || [];
        if (this.pagination.available) {
            this.paginationConfig = this.myTableService.paginationInitializations(this.pagination, this.myTableConstant.paginationConfig, this.filteredRecords);
            this.displayRecords = this.filteredRecords.slice(0, this.paginationConfig.size);
        } else {
            this.displayRecords = this.filteredRecords.slice(0);
        }
    };

    fetchNewPage (id) {
        let start = (id - 1) * this.paginationConfig.size;
        let end = id * this.paginationConfig.size;
        this.displayRecords = this.filteredRecords ? this.filteredRecords.slice(start, end) : this.tableData.slice(start, end);
    };
};

angular.module('myTableApp').controller('myTableCtrl', MyTableCtrl);
