import { TestBed } from '@angular/core/testing';

import { MotifService } from './motif.service';

describe('MotifService', () => {
  let service: MotifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
