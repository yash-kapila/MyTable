import { TestBed, inject } from '@angular/core/testing';

import { MyTableService } from './my-table.service';

describe('MyTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyTableService]
    });
  });

  it('should be created', inject([MyTableService], (service: MyTableService) => {
    expect(service).toBeTruthy();
  }));
});
