# MyTable

This project is a reusable grid component built using Angular 1.6 and then a new grid using Angular 2. Basic features mentioned below are same across both grid components:

 * Sorting columns
 * Filtering columns. Three kind of filters are available for use.
 	* Input text
 	* Select dropdown
 	* Radio buttons
 * Custom styling options on table header and table body cells
 * Custom templates for body cells
 * Pagination

## Features

##### Filtering
For filtering of data, each column of the table has an option to select one of the three filters available: 
* Input text
* Select dropdown
* Radio button

##### Custom Styling
Provide styling for your table header and body cells. The styles are applied to all the cells of a column. Individual cell styling can be overridden using relative CSS. The styles are provided as a JavaScript object and attached to *headerCellStyling* and *bodyCellStyling* properties.

````Javascript
headerCellStyling = {
	'color': 'green',
	'font-weight': '700',
    'width': '30%'
};
````

##### Custom Templates
Provide custom templates for table body cells. The custom template would then be applied for all the rows in that particular column. For example, last column of a table could be a delete (-) button which removes that row when clicked. The template could also be provided a collection of bindings through which the application could interact with the table component. A *row* object is exposed by the component which lets the application know about the current execution row. The template could be provided as:

````Javascript
bodyCell: { 
	template: `<button class="btn btn-primary" (click)="testClick(row)"> 
                 <i class="glyphicon glyphicon-minus"></i>
               </button>`, 
	bindings: { 
    	testClick: (row) => { console.log(row); }
    } 
} 
````

##### Pagination
The component provides pagination feature in case the data is huge and scrolling down to see all records is not needed. The pagination object provides the ability to choose number of records user wishes to see at a time. The remaining records are then paginated.

## Installation
Run the below command to install all project related dependencies 
```bash
npm install
```

## Development server

### Angular Grid

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### AngularJS Grid

Execute either of the below to start a local node server.
```bash
npm start
node server.js
```
Server will be running at: http://localhost:8080/