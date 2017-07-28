import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioFilterComponent } from './radio-filter.component';

describe('RadioFilterComponent', () => {
  let component: RadioFilterComponent;
  let fixture: ComponentFixture<RadioFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
