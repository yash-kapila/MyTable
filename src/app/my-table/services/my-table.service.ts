import { Injectable, ComponentRef } from '@angular/core';

@Injectable()
export class MyTableService {
  unsortedList: Array<any>;

  constructor() { }

  	/* 
		Temporary method for deep cloning of objects in Angular. 
    No angular.copy style method in Angular
		Object.assign() for shallow copy.
  	*/
  	clone(source: any): any {
  		if(source === null || typeof source !== 'object') return source;

  		if(source instanceof Array) {
  			let destination = [];
  			for(let i=0;i<source.length;i++) {
  				destination[i] = this.clone(source[i]);
  			}
  			return destination;
  		}

  		if(source instanceof Object) {
  			let destination = {};
	  		for(let attr in source) {
	  			if(source.hasOwnProperty(attr)) destination[attr] = this.clone(source[attr]);
	  		}
  			return destination;
  		}
  	};

  	paginationInitializations(pagination: any, paginationConfig: any, records: Array<any>): any {
  		const config = {
  		    available: pagination.available ? pagination.available : paginationConfig.available,
  		    size: pagination.size ? pagination.size : paginationConfig.defaultSize,
  		    currentPage: 1,
  		    totalPages: 1
  		};

  		config.totalPages = (records.length%config.size) === 0 ? records.length/config.size : Math.floor(records.length/config.size) + 1

  		return config;
  	};

    filteringInitializations(myTableColumns: Array<any>, defaultFilterName: string): Array<any> {
      myTableColumns.forEach(function (el, id) {
          el.enableFiltering = (el.enableFiltering === true) ? true : false;
          if (el.enableFiltering) {
              el.filter = el.filter ? el.filter : defaultFilterName;
          }
      });

      return myTableColumns;
    };

    sortingInitializations(myTableColumns: Array<any>, sortOrderConfig: any): any {
      let sortOrder = {}, currentSortOrder = {};

      /* 
          Set default sorting behavior of columns to TRUE unless specified FALSE explicitly 
      */
      myTableColumns.forEach(function (el, id) {
          if (el.enableSorting === undefined || el.enableSorting === true || el.enableSorting === null || el.enableSorting === '') {
              el.enableSorting = true;
              sortOrder[el.name] = sortOrderConfig;
              currentSortOrder[el.name] = sortOrder[el.name][0];
          } else {
              el.enableSorting = false;
          }
      });

      return {
          sortOrder,
          currentSortOrder
      };
    };

    sortColumn (originalOrderedList: Array<any>, sortOrder: any, currentSortOrder: any, fieldName: string) {
      this.unsortedList = this.unsortedList || originalOrderedList;

      let tableData: Array<any> = [];
      /*  
          If current sort order is NONE, do ASCENDING sort;
          If current sort order is ASCENDING, do DESCENDING sort;
          If current sort order is DESCENDING, bring table to ORIGINAL state
      */
      if (currentSortOrder[fieldName] === sortOrder[fieldName][0]) {
          currentSortOrder[fieldName] = sortOrder[fieldName][1];
          tableData = this.sortAscending(originalOrderedList, fieldName);
      } else if (currentSortOrder[fieldName] === sortOrder[fieldName][1]) {
          currentSortOrder[fieldName] = sortOrder[fieldName][2];
          // tableData = this.$filter('orderBy')(originalOrderList, fieldName, true);
      } else {
          currentSortOrder[fieldName] = sortOrder[fieldName][0];
          // tableData = this.$filter('orderBy')(originalOrderList, null);
      }
      /* Reset Sort Order of other columns to NONE */
      for (let key in currentSortOrder) {
          if (key !== fieldName) {
              currentSortOrder[key] = sortOrder[key][0];
          }
      };

      return {
          tableData: tableData,
          currentSortOrder: currentSortOrder,
          sortOrder: sortOrder
      };
    };

    sortAscending(list: Array<any>, fieldName: string): Array<any> {
      return list.sort();
    };

}