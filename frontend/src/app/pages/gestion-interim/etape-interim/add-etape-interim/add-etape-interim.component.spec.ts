import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtapeInterimComponent } from './add-etape-interim.component';

describe('AddEtapeInterimComponent', () => {
  let component: AddEtapeInterimComponent;
  let fixture: ComponentFixture<AddEtapeInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEtapeInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEtapeInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
