import { TestBed } from '@angular/core/testing';

import { CategorieLaitService } from './categorie-lait.service';

describe('CategorieLaitService', () => {
  let service: CategorieLaitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieLaitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
