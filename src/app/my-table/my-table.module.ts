import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTablePaginationModule } from './my-table-pagination/my-table-pagination.module';

import { MyTableComponent } from './components/my-table.component';
import { MyTableService } from './services/my-table.service';
import { MyTableDefaultPipe } from './pipes/my-table-default-pipe.pipe';
import { MyTableHeaderComponent } from './components/my-table-header/my-table-header.component';
import { MyTableBodyComponent } from './components/my-table-body/my-table-body.component';

import { InputFilterComponent } from './components/my-table-header/filters/input-filter/input-filter.component';
import { SelectFilterComponent } from './components/my-table-header/filters/select-filter/select-filter.component';
import { RadioFilterComponent } from './components/my-table-header/filters/radio-filter/radio-filter.component';

@NgModule({
  imports: [
    CommonModule,
    MyTablePaginationModule
  ],
  entryComponents: [
    InputFilterComponent,
    SelectFilterComponent,
    RadioFilterComponent
  ],
  declarations: [
  	MyTableComponent,
  	MyTableDefaultPipe,
  	MyTableHeaderComponent,
  	MyTableBodyComponent,
    InputFilterComponent,
    SelectFilterComponent,
    RadioFilterComponent
  ],
  exports: [
  	MyTableComponent
  ],
  providers: [
  	MyTableService,
    MyTableDefaultPipe
  ]
})
export class MyTableModule { }
