const constants = {
    sortOrder: {
        '0': 'NONE',
        '1': 'ASC',
        '2': 'DSC'
    },
    defaultFilterTemplate: '<input type="text" class="form-control" ng-model="cols.filterModel">',
    defaultFilterName: 'myTableDefaultFilter',
    paginationConfig: {
        defaultSize: 10,
        available: false
    }
};

angular.module('myTableApp').constant('myTableConstant', constants);