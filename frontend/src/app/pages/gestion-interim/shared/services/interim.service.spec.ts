import { TestBed } from '@angular/core/testing';

import { InterimService } from './interim.service';

describe('InterimService', () => {
  let service: InterimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
