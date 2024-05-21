import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapeValidationComponent } from './etape-validation.component';

describe('EtapeValidationComponent', () => {
  let component: EtapeValidationComponent;
  let fixture: ComponentFixture<EtapeValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtapeValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapeValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
