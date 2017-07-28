import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTablePaginationComponent } from './my-table-pagination.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  	MyTablePaginationComponent
  ],
  exports: [
  	MyTablePaginationComponent
  ]
})
export class MyTablePaginationModule { }
