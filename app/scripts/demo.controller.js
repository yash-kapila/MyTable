(function () {
    
    'use strict';

    angular.module('app').controller('demoCtrl', Ctrl);

    Ctrl.$inject = ['demoService'];

    function Ctrl(demoService) {
        var vm = this;

        vm.init = function () {
            vm.columnsConfig = demoService.gridConfiguration();
            demoService.getDataForGrid().then(function (data) {
                vm.gridData = data;
            })
            .catch(function (data) {
                vm.gridData = [];  
            });

            vm.appScope = {
                testClick: vm.testClick,
                test: 10
            };
        };

        vm.testClick = function () {
            console.log('inside click');
        };

        vm.init();
    };
})();