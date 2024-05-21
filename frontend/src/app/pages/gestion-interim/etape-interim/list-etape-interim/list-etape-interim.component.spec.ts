import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEtapeInterimComponent } from './list-etape-interim.component';

describe('ListEtapeInterimComponent', () => {
  let component: ListEtapeInterimComponent;
  let fixture: ComponentFixture<ListEtapeInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEtapeInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEtapeInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
