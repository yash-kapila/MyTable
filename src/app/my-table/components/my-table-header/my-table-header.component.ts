import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactory, ComponentRef, ComponentFactoryResolver } from '@angular/core';

import { InputFilterComponent } from './filters/input-filter/input-filter.component';
import { SelectFilterComponent } from './filters/select-filter/select-filter.component';
import { RadioFilterComponent } from './filters/radio-filter/radio-filter.component';

import { MyTableService } from '../../services/my-table.service';
import { myTableConfig } from '../../services/my-table.constant';

@Component({
  selector: 'app-my-table-header',
  templateUrl: './my-table-header.component.html',
  styleUrls: ['./my-table-header.component.css']
})
export class MyTableHeaderComponent implements OnInit {
	componentRef: ComponentRef<any>;
	filterType: any;
	@Input() column: any;
	@Input() currentSortOrder: any;
	@Output() sortColumn = new EventEmitter<any>();
	@Output() filterMyTable = new EventEmitter<any>();

	/*  
		The default return from the ViewChild decorator is the component instance or the DOM element, 
		but in our case, we need to get the element as ViewContainerRef.
	*/
	@ViewChild("columnFilter", { read: ViewContainerRef }) container;

	/*
		The ComponentFactoryResolver service exposes one important method, resolveComponentFactory.
		The resolveComponentFactory() method takes a component and returns a ComponentFactory.
		Think of ComponentFactory as an object that knows how to create a component.
	*/
	constructor(
		private myTableService: MyTableService,
		private resolver: ComponentFactoryResolver
	) { }

	ngOnInit() {
	};

	ngOnChanges(changes) {
		const filterEnabled = changes.column.currentValue.filter.enable;
		const filter = changes.column.currentValue.filter.type;
		this.filterType = (filterEnabled && filter) ? myTableConfig.filterType[filter]: '';
		this.createComponent();
	};

	createComponent() {
		if(this.filterType) {
			this.container.clear();
   			const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.filterType);
    		this.componentRef = this.container.createComponent(factory);
			switch(this.column.filter.type) {
				case 'input':
					this.componentRef.instance.filterByInput.subscribe(event => this.filterMyTable.emit({
						value: event, 
						column: this.column
					}));
					break;
				case 'select':
					this.componentRef.instance.selectModel = this.column.filter.selectModel;
					this.componentRef.instance.filterByInput.subscribe(event => this.filterMyTable.emit({
						value: event,
						column: this.column
					}));
			};
		}
	};

	ngOnDestroy() {
		this.componentRef.destroy();
	};

}
