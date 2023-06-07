import { TestBed } from '@angular/core/testing';

import { DatamoveService } from './datamove.service';

describe('DatamoveService', () => {
  let service: DatamoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatamoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
