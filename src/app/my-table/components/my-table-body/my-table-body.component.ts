import { Component, OnInit, Compiler, ComponentRef, Injector, Input, NgModule, NgModuleRef, Output, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-my-table-body',
  templateUrl: './my-table-body.component.html',
  styleUrls: ['./my-table-body.component.css']
})
export class MyTableBodyComponent implements OnInit {
	defaultTemplate: string;
	@Input() cellValue: any;
	@Input() cellConfig: any;
	@Input() row: any;
	componentRef: ComponentRef<any>;
	@ViewChild('bodyCell', {read: ViewContainerRef}) bodyCell: ViewContainerRef;

	constructor(
		private compiler: Compiler,
		private injector: Injector,
		private module: NgModuleRef<any>
	) { }

	ngOnInit() {
		this.defaultTemplate = `<span> ${this.cellValue} </span>`;
		this.cellConfig = this.cellConfig || { };
		this.compileBodyCell();
	};

	compileBodyCell() {
		const template = (this.cellConfig && this.cellConfig.template) ? this.cellConfig.template : this.defaultTemplate;
		const component = Component({
			template: template
		})(class { });
		const module = NgModule({
			declarations: [ component ]
		})(class { });

		this.compiler.compileModuleAndAllComponentsAsync(module)
		    .then((factories) => {
		      const f = factories.componentFactories[0];
		      this.componentRef = f.create(this.injector, [], null, this.module);
		      /* Attach bindings to component */
		      this.componentRef.instance.row = this.row;
		      for(let key in this.cellConfig.bindings) {
		      	this.componentRef.instance[key] = this.cellConfig.bindings[key];
		      }
		      this.bodyCell.insert(this.componentRef.hostView);
		    })
	};

	ngOnDestroy() {
		if(this.componentRef) {
    		this.componentRef.destroy();
  		}
	};

}
