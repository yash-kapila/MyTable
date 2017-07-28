import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTableHeaderComponent } from './my-table-header.component';

describe('MyTableHeaderComponent', () => {
  let component: MyTableHeaderComponent;
  let fixture: ComponentFixture<MyTableHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTableHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
