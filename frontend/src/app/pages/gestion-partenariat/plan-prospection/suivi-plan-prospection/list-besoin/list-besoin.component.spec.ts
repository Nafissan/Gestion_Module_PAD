import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBesoinComponent } from './list-besoin.component';

describe('ListBesoinComponent', () => {
  let component: ListBesoinComponent;
  let fixture: ComponentFixture<ListBesoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBesoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBesoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
