class MyTableFilter {
    constructor ($filter) {
        this.$filter = $filter;

        return (tableData, myTableColumns) => {
            if (!!tableData) {
                angular.forEach(myTableColumns, (elem) => {
                    if (elem.enableFiltering && elem.filterModel) {
                        tableData = this.$filter(elem.filter)(tableData, elem.name, elem.filterModel);
                    }
                });
                return tableData;
            } else {
                return tableData;
            }
        };
    };

    static filter ($filter) {
        return new MyTableFilter($filter);
    };
};

angular.module('myTableApp').filter('myTableFilter', MyTableFilter.filter);