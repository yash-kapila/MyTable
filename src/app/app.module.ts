import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MyTableModule } from './my-table/my-table.module';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';

import { DemoService } from './demo/demo.service';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MyTableModule
  ],
  providers: [
  	DemoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }