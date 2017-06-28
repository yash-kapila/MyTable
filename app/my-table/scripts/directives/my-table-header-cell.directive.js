(function () {

    'use strict';

    angular.module('myTableApp').directive('myTableHeaderCell', function ($compile, $timeout, myTableConstant) {
        return {
            restrict: 'A',
            compile: function (tElem, tAttrs) {
                return {
                    pre: function (scope, iElem, iAttrs) {
                        /* Wrapping in timeout to access the DOM after it has been rendered */
                        $timeout(function () {
                            compileHeaderCellTemplate(scope, iElem);
                            appendFilterOnHeaderCell(scope, iElem);
                        });
                    },
                    post: function (scope, iElem, iAttrs) {
                        var numberOfColumns = scope.cols.length ? scope.cols.length : 1;
                        var defaultCellWidth = (100 / numberOfColumns) + '%';
                        var parentScope = scope.$parent.$ctrl;

                        /* Wrapping in timeout to access the DOM after it has been rendered */
                        $timeout(function () {
                            setCellWidth(scope.cols, iElem, defaultCellWidth);
                            addCustomHeaderClass(scope.cols, iElem);
                        });

                        scope.$watch('cols.filterModel', function(newValue, oldValue) {
                            /* Call My-Table controller method when filter value changes */
                            var parent = scope.$parent.$ctrl;
                            parent.filterColumn();
                        });
                    }
                }
            }
        };

        function compileHeaderCellTemplate (scope, elem) {
            if (scope.cols.headerCellTemplate) {
                var cellElement = $compile(scope.cols.headerCellTemplate)(scope);
                elem.prepend(cellElement[0]);
            } else {
                var html = '<span> {{cols.heading}} </span>';
                var cellElement = $compile(html)(scope);
                elem.prepend(cellElement[0]);
            }
        };

        function appendFilterOnHeaderCell (scope, elem) {
            if (scope.cols.enableFiltering) {
                var filterTemplate = scope.cols.filterTemplate ? scope.cols.filterTemplate : myTableConstant.defaultFilterTemplate;
                var modifiedFilterTemplate = '<div class="my-table-filter-container" ng-click="$event.stopPropagation()">' + filterTemplate + '</div>';
                var template = $compile(modifiedFilterTemplate)(scope);
                elem.append(template[0]);
            }
        };

        function setCellWidth (cols, elem, defaultCellWidth) {
            elem.parent().css('width', (cols.cellWidth ? cols.cellWidth + '%' : defaultCellWidth))
        };

        function addCustomHeaderClass (cols, elem) {
            elem.parent().addClass(cols.headerClass);
        };
    });
})();