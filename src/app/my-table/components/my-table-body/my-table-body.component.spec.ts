import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTableBodyComponent } from './my-table-body.component';

describe('MyTableBodyComponent', () => {
  let component: MyTableBodyComponent;
  let fixture: ComponentFixture<MyTableBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTableBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTableBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
