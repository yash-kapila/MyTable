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
    
    let columnsConfig: Array<any> = [
      { heading: 'Name', name: 'name', enableFiltering: true, filter: 'input' },
      { heading: 'Gender', name: 'gender', enableSorting: false, enableFiltering: true, filter: 'select', selectModel: selectModel },
      { heading: 'Company', name: 'company', enableFiltering: false },
      { heading: 'Action', name: 'action', enableSorting: false }
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
