import { TestBed } from '@angular/core/testing';

import { EtapeInterimService } from './etape-interim.service';

describe('EtapeInterimService', () => {
  let service: EtapeInterimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtapeInterimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
