import { Component, OnInit } from '@angular/core';

import { MyTableService } from '../services/my-table.service';
import { myTableConfig } from '../services/my-table.constant';

import { MyTableDefaultPipe } from '../pipes/my-table-default-pipe.pipe';

@Component({
	selector: 'app-my-table',
	templateUrl: './my-table.component.html',
	styleUrls: ['./my-table.component.css'],
	inputs: [
		'tableData',
		'columnsConfig',
		'pagination'
	]
})
export class MyTableComponent implements OnInit {
	tableData: Array<any>;
	columnsConfig: Array<any>;
	shownRecords: Array<any>;
	paginationConfig: any;
	originalOrderedList: Array<any>;
	filteredRecords: Array<any>;
	myTableColumns: Array<any>;
	pagination: any;
	sortOrder: any;
	currentSortOrder: any;

	constructor(
		private myTableService: MyTableService,
		private myTableDefaultPipe: MyTableDefaultPipe
		) { 
		this.shownRecords = [];
		this.paginationConfig = {};
		this.sortOrder = {};
		this.filteredRecords = [];
		this.myTableColumns = [];
	};

	ngOnInit() {
		this.myTableColumns = this.myTableService.clone(this.columnsConfig);
		this.filteringInitializations();
		this.sortingInitializations();
	};

	ngOnChanges(changes) {
		if (!!changes.tableData.currentValue) {
			this.paginationInitializations();
		}
	};

	paginationInitializations(): void {
		if (this.pagination.available) {
			this.paginationConfig = this.myTableService.paginationInitializations(this.pagination, myTableConfig.paginationConfig, this.tableData);
			this.shownRecords = this.tableData.slice(0, this.paginationConfig.size);
		} else {
			this.shownRecords = this.tableData.slice(0);
		}
	};

	filteringInitializations(): void {
		this.myTableColumns = this.myTableService.filteringInitializations(this.myTableColumns, myTableConfig.defaultFilterName);
	};

	sortingInitializations(): void {
		const sortingInitializations = this.myTableService.sortingInitializations(this.myTableColumns, myTableConfig.sortOrder);
		this.sortOrder = sortingInitializations.sortOrder;
		this.currentSortOrder = sortingInitializations.currentSortOrder;
	};

    filterMyTable(filter: any) {
        this.filteredRecords = this.myTableDefaultPipe.transform(this.tableData, filter.columnName, filter.value) || [];
        if (this.pagination.available) {
            this.paginationConfig = this.myTableService.paginationInitializations(this.pagination, myTableConfig.paginationConfig, this.filteredRecords);
            this.shownRecords = this.filteredRecords.slice(0, this.paginationConfig.size);
        } else {
            this.shownRecords = this.filteredRecords.slice(0);
        }
    };

    sortColumn(config: any): boolean {
        this.originalOrderedList = this.originalOrderedList || this.tableData;
        if (config.enableSorting) {
            const sortedColumns = this.myTableService.sortColumn(this.originalOrderedList, this.sortOrder, this.currentSortOrder, config.name)
            this.tableData = sortedColumns.tableData;
            this.filteredRecords = sortedColumns.tableData;
            this.sortOrder = sortedColumns.sortOrder;
            this.currentSortOrder = sortedColumns.currentSortOrder;
            this.paginationInitializations();
        } else {
            return;
        }
    };

    fetchNewPage(event) {
        const start = (event.id - 1) * this.paginationConfig.size;
        const end = event.id * this.paginationConfig.size;
        this.shownRecords = this.filteredRecords.length ? this.filteredRecords.slice(start, end) : this.tableData.slice(start, end);
    };

}
