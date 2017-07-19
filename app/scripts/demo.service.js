class Service {
    constructor ($http, $q) {
        this.$http = $http;
        this.$q = $q;
    };

    gridConfiguration () {
        let template = `<button type="button" class="btn btn-primary" ng-click="appScope.testClick(row)">
                            <i class="glyphicon glyphicon-minus"></i>
                        </button>`;

        let filterTemplate = `<select class="form-control" ng-model="cols.filterModel">
                                <option value=""> Select </option>
                                <option value="male"> Male </option>
                                <option value="female"> Female </option>
                            </select>`;    

        let columnsConfig = [
            { heading: 'Name', name: 'name', cellWidth: '32', headerClass: '', cellClass: 'red', enableFiltering: true },
            { heading: 'Gender', name: 'gender', cellWidth: '32', headerClass: 'red', cellClass: '', enableSorting: false, enableFiltering: true, filterTemplate: filterTemplate, filter: 'customFilter' },
            { heading: 'Company', name: 'company', cellWidth: '32', headerClass: '', cellClass: '', enableFiltering: false },
            { heading: 'Action', name: 'action', cellWidth: '4', cellTemplate: template, headerCellTemplate: '', enableSorting: false }
        ];

        return {
            columnsConfig: columnsConfig,
            pagination: {
                available: true,
                size: 8
            }    
        };
    };

    getDataForGrid () {
        return this.$http.get('data/data1.json')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return this.$q.reject(error.data);
            })
    };
};

angular.module('app').service('demoService', Service);