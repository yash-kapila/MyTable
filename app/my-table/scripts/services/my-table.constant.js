(function () {

    'use strict';
    
    var constants = {
        sortOrder: {
            '0': 'NONE',
            '1': 'ASC',
            '2': 'DSC'
        }
    };

    angular.module('myTableApp').constant('myTableConstant', constants);
})();