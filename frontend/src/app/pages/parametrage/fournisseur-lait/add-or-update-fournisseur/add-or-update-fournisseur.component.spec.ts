import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateFournisseurComponent } from './add-or-update-fournisseur.component';

describe('AddOrUpdateFournisseurComponent', () => {
  let component: AddOrUpdateFournisseurComponent;
  let fixture: ComponentFixture<AddOrUpdateFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
