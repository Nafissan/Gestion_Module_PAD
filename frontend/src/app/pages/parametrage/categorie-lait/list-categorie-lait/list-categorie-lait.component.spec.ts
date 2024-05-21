import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategorieLaitComponent } from './list-categorie-lait.component';

describe('ListCategorieLaitComponent', () => {
  let component: ListCategorieLaitComponent;
  let fixture: ComponentFixture<ListCategorieLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCategorieLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategorieLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
