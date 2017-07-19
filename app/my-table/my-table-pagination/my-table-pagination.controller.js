class MyTablePaginationCtrl {
    $onChanges (changes) {
        if(changes.paginationConfig.currentValue) {
            this.paginationBar = [];
            let numberOfPages = changes.paginationConfig.currentValue.totalPages;
            for(let i=1;i<=numberOfPages;i++) {
                this.paginationBar.push(i);
            }
        }
    };

    fetchNewPageData (pageID) {
        this.paginationConfig.currentPage = pageID;
        this.fetchNewPage({
            id: pageID
        });
    };
};

angular.module('myTableApp').controller('myTablePaginationCtrl', MyTablePaginationCtrl);