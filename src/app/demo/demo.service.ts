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
      * styles.headerCellStyling: CSS styles in key/value pair for table header cells
      * styles.bodyCellStyling: CSS styles in key/value pair for table body cells
      * bodyCell: object containing information to create table cells; template: provides custom template; bindings: attach bindings to body cells
    */
    let columnsConfig: Array<any> = [
      { 
        heading: 'Name', 
        name: 'name', 
        enableSorting: false, 
        filter: {
          enable: true,
          type: 'input',
          customFilter: null
        },
        styles: { 
          headerCellStyling: nameHeaderCellStyling
        } 
      },
      { 
        heading: 'Gender', 
        name: 'gender', 
        enableSorting: false, 
        filter: {
          enable: true,
          type: 'select',
          selectModel: selectModel,
          customPipe: (tableData: Array<any>, filterName: string, filterValue: any) => {
            let filteredList = [];
            if (filterValue.toLowerCase() === 'male') {
              let pattern = /^male$/;
              filteredList = tableData.filter((el, key) => {
                  return el[filterName].match(pattern);
              });
            } else if (filterValue.toLowerCase() === 'female') {
              let pattern = /^female$/;
              filteredList = tableData.filter((el, key) => {
                  return el[filterName].match(pattern);
              });
            } else {
              filteredList = tableData;
            }
            return filteredList;
          }
        },
        styles: { 
          headerCellStyling: genderHeaderCellStyling 
        } 
      },
      { 
        heading: 'Company', 
        name: 'company', 
        enableSorting: false, 
        filter: {
          enable: false
        },
        styles: { 
          bodyCellStyling: companyBodyCellStyling 
        } 
      },
      { 
        heading: 'Action', 
        name: 'action', 
        enableSorting: false, 
        filter: {
          enable: false
        },
        styles: { 
          headerCellStyling: actionHeaderCellStyling 
        }, 
        bodyCell: { 
          template: template, 
          bindings: { } 
        } 
      }
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
