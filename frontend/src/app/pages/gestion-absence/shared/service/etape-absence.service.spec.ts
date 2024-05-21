import { TestBed } from '@angular/core/testing';

import { EtapeAbsenceService } from './etape-absence.service';

describe('EtapeAbsenceService', () => {
  let service: EtapeAbsenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtapeAbsenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
