import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-table-pagination',
  templateUrl: './my-table-pagination.component.html',
  styleUrls: ['./my-table-pagination.component.css']
})
export class MyTablePaginationComponent implements OnInit {
	paginationBar: Array<any>;
	@Input() paginationConfig: any;
	@Output() fetchNewPage = new EventEmitter<any>();

	constructor() { 
		this.paginationBar = [];
	};

	ngOnInit() {
	};

	ngOnChanges(changes) {
	    if(changes.paginationConfig.currentValue) {
	    	this.paginationBar = [];
	        const numberOfPages = changes.paginationConfig.currentValue.totalPages;
	        for(let i=1;i<=numberOfPages;i++) {
	            this.paginationBar.push(i);
	        }
	    }
	}

    fetchNewPageData (pageID) {
        this.fetchNewPage.emit({
            id: pageID
        });
    };

}
