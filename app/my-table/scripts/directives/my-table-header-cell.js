(function () {

    'use strict';

    angular.module('myTableApp').directive('myTableHeaderCell', function ($compile, $timeout) {
        return {
            restrict: 'A',
            scope: {
                cols: '=',
                sortOrder: '='
            },
            compile: function (tElem, tAttrs) {
                return {
                    pre: function (scope, iElem, iAttrs) {
                        /* Wrapping in timeout to access the DOM after it has been rendered */
                        $timeout(function () {
                            if (scope.cols.headerCellTemplate) {
                                var cellElement = $compile(scope.cols.headerCellTemplate)(scope);
                                iElem.prepend(cellElement[0]);
                            } else {
                                var html = '<span> {{cols.heading}} </span>';
                                var cellElement = $compile(html)(scope);
                                iElem.prepend(cellElement[0]);
                            }
                        });
                    },
                    post: function (scope, iElem, iAttrs) {
                        var numberOfColumns = scope.cols.length ? scope.cols.length : 1;
                        var defaultCellWidth = (100 / numberOfColumns) + '%';

                        /* Wrapping in timeout to access the DOM after it has been rendered */
                        $timeout(function () {
                            setCellWidth(scope.cols, iElem, defaultCellWidth);
                            addCustomHeaderClass(scope.cols, iElem);
                        });
                    }
                }
            }
        };

        function setCellWidth(cols, elem, defaultCellWidth) {
            elem.parent().css('width', (cols.cellWidth ? cols.cellWidth + '%' : defaultCellWidth))
        };

        function addCustomHeaderClass(cols, elem) {
            elem.parent().addClass(cols.headerClass);
        };
    });
})();