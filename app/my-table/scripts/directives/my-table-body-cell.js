(function () {

    'use strict';
    
    angular.module('myTableApp').directive('myTableBodyCell', function ($compile, $timeout) {
        return {
            restrict: 'A',
            scope: {
                cols: '=',
                data: '=',
                appScope: '='
            },
            compile: function (tElem, tAttrs) {
                return {
                    pre: function (scope, iElem, iAttrs) {
                        if (scope.cols.cellTemplate) {
                            var cellElement = $compile(scope.cols.cellTemplate)(scope);
                            iElem.append(cellElement[0]);
                        } else {
                            var html = '<span> {{data[cols.name]}} </span>';
                            var cellElement = $compile(html)(scope);
                            iElem.append(cellElement[0]);
                        }
                    },
                    post: function (scope, iElem, iAttrs) {
                        /* Wrapping in timeout to access the DOM after it has been rendered */
                        $timeout(function () {
                            addCustomCellClass(scope.cols, iElem);
                        });

                        scope.$watch('rows', function (newValue, oldValue) {
                            /* Wrapping in timeout to access the DOM after it has been rendered */
                            if (newValue && oldValue) {
                                $timeout(function () {
                                    addCustomCellClass(scope.cols, iElem);
                                });
                            }
                        });
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