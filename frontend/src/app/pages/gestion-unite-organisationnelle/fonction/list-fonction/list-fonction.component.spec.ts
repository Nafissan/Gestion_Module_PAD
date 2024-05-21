import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFonctionComponent } from './list-fonction.component';

describe('ListFonctionComponent', () => {
  let component: ListFonctionComponent;
  let fixture: ComponentFixture<ListFonctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFonctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
