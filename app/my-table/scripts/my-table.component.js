(function () {

    'use strict';
    
    var myTable = {
        templateUrl: 'my-table/templates/my-table.html',
        controller: 'myTableCtrl',
        bindings: {
            tableData: '<',
            columnsConfig: '<',
            appScope: '<'
        }
    }

    angular.module('myTableApp').component('myTable', myTable);
})();