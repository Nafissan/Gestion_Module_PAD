import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateCategorieLaitComponent } from './add-or-update-categorie-lait.component';

describe('AddOrUpdateCategorieLaitComponent', () => {
  let component: AddOrUpdateCategorieLaitComponent;
  let fixture: ComponentFixture<AddOrUpdateCategorieLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateCategorieLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateCategorieLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
