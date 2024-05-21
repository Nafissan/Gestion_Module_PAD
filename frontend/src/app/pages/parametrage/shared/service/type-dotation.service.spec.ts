import { TestBed } from '@angular/core/testing';

import { TypeDotationService } from './type-dotation.service';

describe('TypeDotationService', () => {
  let service: TypeDotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
