(function () {

    'use strict';

    angular.module('myTableApp').filter('myTableDefaultFilter', function () {
        return function (tableData, fieldName, filterValue) {
            if (!!tableData) {
                if (filterValue) {
                    var filter = tableData.filter(function (val, key) {
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
    });
})();