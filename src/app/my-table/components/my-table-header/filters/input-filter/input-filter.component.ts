import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-filter',
  templateUrl: './input-filter.component.html',
  styleUrls: ['./input-filter.component.css']
})
export class InputFilterComponent implements OnInit {
	@Output() filterByInput = new EventEmitter<string>();

	constructor() { 
	}

	ngOnInit() {
	}

}
