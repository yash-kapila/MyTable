(function () {
    
    'use strict';

    angular.module('app').service('demoService', Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        this.gridConfiguration = function () {
            var template = '<button type="button" class="btn btn-primary" ng-click="appScope.testClick(row)">' +
                                '<i class="glyphicon glyphicon-minus"></i>' +
                            '</button>';

            var config = [
                { heading: 'Name', name: 'name', cellWidth: '32', headerClass: '', cellClass: 'red' },
                { heading: 'Gender', name: 'gender', cellWidth: '32', headerClass: 'red', cellClass: '', enableSorting: false },
                { heading: 'Company', name: 'company', cellWidth: '32', headerClass: '', cellClass: '' },
                { heading: 'Action', name: 'action', cellWidth: '4', cellTemplate: template, headerCellTemplate: '', enableSorting: false }
            ];

            return config;
        };

        this.getDataForGrid = function () {
            return $http.get('data/data1.json')
                .then(Success)
                .catch(Failure)
        };

        function Success(response) {
            return response.data
        };

        function Failure(error) {
            return $q.reject(error.data);
        };
    };
})();