import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myTableDefaultPipe'
})
export class MyTableDefaultPipe implements PipeTransform {

	transform(tableData: Array<any>, fieldName: string, filterValue: any, customPipe: any): Array<any> {
		if(!!customPipe) {
			return customPipe(tableData, fieldName, filterValue);
		} else {
			if (!!tableData) {
			    if (filterValue) {
			        let filter = tableData.filter((val, key) => {
			        	return val[fieldName].toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
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

}