class MyTableHeaderCell {
    constructor ($compile, $timeout, myTableConstant) {
        this.restrict = 'A';
        this.$compile = $compile;
        this.$timeout = $timeout;
        this.myTableConstant = myTableConstant;
    };

    compile (tElem, tAttrs) {
        return {
            pre: (scope, iElem, iAttrs) => {
                /* Wrapping in timeout to access the DOM after it has been rendered */
                this.$timeout(() => {
                    this.compileHeaderCellTemplate(scope, iElem);
                    this.appendFilterOnHeaderCell(scope, iElem);
                });
            },
            post: (scope, iElem, iAttrs) => {
                let numberOfColumns = scope.cols.length ? scope.cols.length : 1;
                let defaultCellWidth = (100 / numberOfColumns) + '%';
                let parentScope = scope.$parent.$ctrl;

                /* Wrapping in timeout to access the DOM after it has been rendered */
                this.$timeout(() => {
                    this.setCellWidth(scope.cols, iElem, defaultCellWidth);
                    this.addCustomHeaderClass(scope.cols, iElem);
                });

                scope.$watch('cols.filterModel', (newValue, oldValue) => {
                    /* Call My-Table controller method when filter value changes */
                    let parent = scope.$parent.$ctrl;
                    parent.filterColumn();
                });
            }
        }
    };

    compileHeaderCellTemplate (scope, elem) {
        if (scope.cols.headerCellTemplate) {
            let cellElement = this.$compile(scope.cols.headerCellTemplate)(scope);
            elem.prepend(cellElement[0]);
        } else {
            let html = '<span> {{cols.heading}} </span>';
            let cellElement = this.$compile(html)(scope);
            elem.prepend(cellElement[0]);
        }
    };

    appendFilterOnHeaderCell (scope, elem) {
        if (scope.cols.enableFiltering) {
            let filterTemplate = scope.cols.filterTemplate ? scope.cols.filterTemplate : this.myTableConstant.defaultFilterTemplate;
            let modifiedFilterTemplate = '<div class="my-table-filter-container" ng-click="$event.stopPropagation()">' + filterTemplate + '</div>';
            let template = this.$compile(modifiedFilterTemplate)(scope);
            elem.append(template[0]);
        }
    };

    setCellWidth (cols, elem, defaultCellWidth) {
        elem.parent().css('width', (cols.cellWidth ? cols.cellWidth + '%' : defaultCellWidth))
    };

    addCustomHeaderClass (cols, elem) {
        elem.parent().addClass(cols.headerClass);
    };

    static directive ($compile, $timeout, myTableConstant) {
        return new MyTableHeaderCell($compile, $timeout, myTableConstant);
    };
};

angular.module('myTableApp').directive('myTableHeaderCell', MyTableHeaderCell.directive);