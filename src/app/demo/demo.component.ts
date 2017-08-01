import { Component, OnInit } from '@angular/core';

import { DemoService } from './demo.service';
import { Demo } from '../models/demo';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
	gridConfig: any;
	gridData: Array<Demo>;

	constructor(private demoService: DemoService) { }

	ngOnInit(): void {
		this.gridConfig = this.demoService.gridConfiguration();
        /* Add bindings to table body cell */
        this.gridConfig.columnsConfig[3].bodyCell.bindings = {
            'testClick': this.testClick
        };
        this.demoService.getDataForGrid()
        	.subscribe(data => {
        		this.gridData = data;
        	},
        	err => {
        		this.gridData = [];
        	});
	};

    /* 
        Arrow function used as this method is passed to the My-Table component as a callback.
        Need to remember the 'this' value
    */
	testClick = (row: any) => {
        const filteredList = this.gridData.filter((el, index) => {
            return el.name !== row.name;
        });

        this.gridData = filteredList;
	};

};