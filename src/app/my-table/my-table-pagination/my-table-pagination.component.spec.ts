import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTablePaginationComponent } from './my-table-pagination.component';

describe('MyTablePaginationComponent', () => {
  let component: MyTablePaginationComponent;
  let fixture: ComponentFixture<MyTablePaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTablePaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
