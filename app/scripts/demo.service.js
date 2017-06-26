(function () {
    
    'use strict';

    angular.module('app').service('demoService', Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        this.gridConfiguration = function () {
            var template = '<button type="button" class="btn btn-primary" ng-click="appScope.testClick(row)">' +
                                '<i class="glyphicon glyphicon-minus"></i>' +
                            '</button>';

            var filterTemplate = '<select class="form-control" ng-model="cols.filterModel">'+
                                    '<option value=""> Select </option>'+
                                    '<option value="male"> Male </option>'+
                                    '<option value="female"> Female </option>'+
                                '</select>';    

            var columnsConfig = [
                { heading: 'Name', name: 'name', cellWidth: '32', headerClass: '', cellClass: 'red', enableFiltering: false },
                { heading: 'Gender', name: 'gender', cellWidth: '32', headerClass: 'red', cellClass: '', enableSorting: false, enableFiltering: false, filterTemplate: filterTemplate, filter: 'customFilter' },
                { heading: 'Company', name: 'company', cellWidth: '32', headerClass: '', cellClass: '', enableFiltering: false },
                { heading: 'Action', name: 'action', cellWidth: '4', cellTemplate: template, headerCellTemplate: '', enableSorting: false }
            ];

            return {
                columnsConfig: columnsConfig,
                pagination: {
                    available: true
                }    
            };
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