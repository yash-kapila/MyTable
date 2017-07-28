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
	appScope: any;

	constructor(private demoService: DemoService) { }

	ngOnInit(): void {
		this.gridConfig = this.demoService.gridConfiguration();
        this.demoService.getDataForGrid()
        	.subscribe(data => {
        		this.gridData = data;
        	},
        	err => {
        		this.gridData = [];
        	});
        this.appScope = {
            testClick: this.testClick
        };
	};

	testClick(): void {
        // console.log(record);
        // let index = 0;
        // for (let i=0;i<this.gridData.length;i++) {
        //     if (this.gridData[i].name === record.name) {
        //         index = i;
        //         break;
        //     }
        // };

        // this.gridData.splice(index, i);
	};

};