import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appMyTableCell]'
})
export class MyTableCellDirective implements OnInit {
	@Input() cellStyling: any;

	constructor(private element: ElementRef) { 
	};

	ngOnInit() {
		this.cellStyling = this.cellStyling || { };
		this.setHeadercellStyling(this.cellStyling);
	};

	setHeadercellStyling(cellStyling: any) {
		for(let key in cellStyling) {
			if (cellStyling.hasOwnProperty(key)) {
				this.element.nativeElement.style[key] = cellStyling[key];
			}
		};
	};

}
