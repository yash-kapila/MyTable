import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Demo } from '../models/demo';

@Injectable()
export class DemoService {

  constructor(private http: HttpClient) { }

  gridConfiguration() {
    const selectModel = [{
      id: 0,
      value: 'Male' 
    }, {
      id: 1,
      value: 'Female'
    }];

    const nameHeaderCellStyling = {
      'color': 'red',
      'width': '30%'
    };

    const companyBodyCellStyling = {
      'color': 'green',
      'font-weight': '700'
    };

    const genderHeaderCellStyling = {
      'width': '30%'
    };

    const actionHeaderCellStyling = {
      'width': '5%'
    };

    /* 
      testClick is binding passed to the My-Table component. 
      'row' object is exposed by the component for outside world to access a record
    */
    const template = `<button class="btn btn-primary" (click)="testClick(row)"> 
                        <i class="glyphicon glyphicon-minus"></i>
                      </button>`;

    /*
      MY-TABLE configuration properties:
      * Array of objects; One object per column
      * heading: Column Heading
      * name: identifier of column
      * enableSorting: flag to enable/disable sorting of column
      * enableFiltering: flag to enable/disable filtering of column
      * filter: input/select/radio filter of column if filtering is enabled
      * selectModel: select filter input model; contains list of dropdown options
      * headerCellStyling: CSS styles in key/value pair for table header cells
      * bodyCellStyling: CSS styles in key/value pair for table body cells
      * bodyCell: object containing information to create table cells; template: provides custom template; bindings: attach bindings to body cells
    */
    let columnsConfig: Array<any> = [
      { heading: 'Name', name: 'name', enableSorting: false, enableFiltering: true, filter: 'input', headerCellStyling: nameHeaderCellStyling },
      { heading: 'Gender', name: 'gender', enableSorting: false, enableFiltering: true, filter: 'select', selectModel: selectModel, headerCellStyling: genderHeaderCellStyling },
      { heading: 'Company', name: 'company', enableSorting: false, enableFiltering: false, bodyCellStyling: companyBodyCellStyling },
      { heading: 'Action', name: 'action', enableSorting: false, headerCellStyling: actionHeaderCellStyling, bodyCell: { template: template, bindings: { } } }
    ];

    return {
    	columnsConfig: columnsConfig,
    	pagination: {
    		available: true,
    		size: 8
    	}
    };
  };

  // include catch and finally block for error handling and final execution steps
  getDataForGrid(): Observable<Demo[]> {
	  return this.http.get('assets/data.json');
  };

};
