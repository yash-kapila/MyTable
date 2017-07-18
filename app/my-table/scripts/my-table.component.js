(function () {

    'use strict';
    
    var myTable = {
        templateUrl: 'templates/my-table.html',
        controller: 'myTableCtrl',
        bindings: {
            tableData: '<',
            columnsConfig: '<',
            pagination: '<',
            appScope: '<'
        }
    }

    angular.module('myTableApp').component('myTable', myTable);
})();