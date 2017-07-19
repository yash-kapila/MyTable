class MyTableDefaultFilter {
    constructor () {
        return (tableData, fieldName, filterValue) => {
            if (!!tableData) {
                if (filterValue) {
                    let filter = tableData.filter((val, key) => {
                        if (typeof val[fieldName] === 'string')
                            return val[fieldName].toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
                        else
                            return val[fieldName].indexOf(filterValue) !== -1;
                    });
                    return filter;
                } else {
                    return tableData;
                }
            } else {
                return tableData;
            };
        };
    };

    static filter () {
        return new MyTableDefaultFilter();
    };
};

angular.module('myTableApp').filter('myTableDefaultFilter', MyTableDefaultFilter.filter);