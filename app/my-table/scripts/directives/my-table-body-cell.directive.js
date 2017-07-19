class MyTableBodyCell {
    constructor ($compile, $timeout) {
        this.restrict = 'A';
        this.scope = {
            cols: '=',
            row: '=',
            appScope: '='
        };
        this.$compile = $compile;
        this.$timeout = $timeout;
    };

    compile (tElem, tAttrs) {
        return {
            pre: (scope, iElem, iAttrs) => {
                if (scope.cols.cellTemplate) {
                    let cellElement = this.$compile(scope.cols.cellTemplate)(scope);
                    iElem.append(cellElement[0]);
                } else {
                    let html = '<span> {{row[cols.name]}} </span>';
                    let cellElement = this.$compile(html)(scope);
                    iElem.append(cellElement[0]);
                }
            },
            post: (scope, iElem, iAttrs) => {
                scope.$watch('row', () => {
                    this.addCustomCellClass(scope.cols, iElem);
                });
            }
        };
    };

    addCustomCellClass (cols, elem) {
        if (cols.cellClass) {
            elem.parent().addClass(cols.cellClass)
        } else {
            return;
        }
    };

    static directive ($compile, $timeout) {
        return new MyTableBodyCell($compile, $timeout);
    };
};

angular.module('myTableApp').directive('myTableBodyCell', MyTableBodyCell.directive);