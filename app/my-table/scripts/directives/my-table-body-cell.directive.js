(function () {

    'use strict';

    angular.module('myTableApp').directive('myTableBodyCell', function ($compile, $timeout) {
        return {
            restrict: 'A',
            scope: {
                cols: '=',
                row: '=',
                appScope: '='
            },
            compile: function (tElem, tAttrs) {
                return {
                    pre: function (scope, iElem, iAttrs) {
                        if (scope.cols.cellTemplate) {
                            var cellElement = $compile(scope.cols.cellTemplate)(scope);
                            iElem.append(cellElement[0]);
                        } else {
                            var html = '<span> {{row[cols.name]}} </span>';
                            var cellElement = $compile(html)(scope);
                            iElem.append(cellElement[0]);
                        }
                    },
                    post: function (scope, iElem, iAttrs) {
                        scope.$watch('row', function () {
                            addCustomCellClass(scope.cols, iElem);
                        })
                    }
                };
            }
        };

        function addCustomCellClass(cols, elem) {
            if (cols.cellClass) {
                elem.parent().addClass(cols.cellClass)
            } else {
                return;
            }
        };
    });
})();