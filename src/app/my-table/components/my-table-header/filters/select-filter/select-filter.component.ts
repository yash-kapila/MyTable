import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.css']
})
export class SelectFilterComponent implements OnInit {
	@Input() selectOption: any;
	@Input() selectModel: Array<any>;
	@Output() filterByInput = new EventEmitter<string>();

	constructor() { 
		this.selectModel = [];
	};

	ngOnInit() {
	};

}
