import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myTableDefaultPipe'
})
export class MyTableDefaultPipe implements PipeTransform {

	transform(tableData: Array<any>, fieldName: string, filterValue: any): Array<any> {
		if (!!tableData) {
		    if (filterValue) {
		        let filter = tableData.filter((val, key) => {
		            if (typeof val[fieldName] === 'string')
		                return val[fieldName].toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
		            else
		                return val[fieldName].indexOf(filterValue) !== -1;
		        });
		        return filter;
		    } else {
		        return tableData;
		    }
		} else {
		    return tableData;
		};
	}

}