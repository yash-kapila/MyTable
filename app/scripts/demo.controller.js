(function () {

    'use strict';

    angular.module('app').controller('demoCtrl', Ctrl);

    Ctrl.$inject = ['demoService'];

    function Ctrl(demoService) {
        var vm = this;

        vm.init = function () {
            vm.gridConfig = demoService.gridConfiguration();
            demoService.getDataForGrid().then(function (data) {
                vm.gridData = data;
            })
            .catch(function (data) {
                vm.gridData = [];
            });

            vm.appScope = {
                testClick: vm.testClick
            };
        };

        vm.testClick = function (record) {
            var index = 0;
            for (var i=0;i<vm.gridData.length;i++) {
                if (vm.gridData[i].name === record.name) {
                    index = i;
                    break;
                }
            };
            vm.gridData.splice(index, 1);
        };

        vm.init();
    };
})();