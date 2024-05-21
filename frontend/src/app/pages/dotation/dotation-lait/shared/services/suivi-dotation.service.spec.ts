import { TestBed } from '@angular/core/testing';

import { SuiviDotationService } from './suivi-dotation.service';

describe('SuiviDotationService', () => {
  let service: SuiviDotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuiviDotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
