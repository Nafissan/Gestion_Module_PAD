import { TestBed } from '@angular/core/testing';

import { DossierInterimService } from './dossier-interim.service';

describe('DossierInterimService', () => {
  let service: DossierInterimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DossierInterimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
