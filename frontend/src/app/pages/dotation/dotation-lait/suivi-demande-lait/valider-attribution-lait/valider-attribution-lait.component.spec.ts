import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderAttributionLaitComponent } from './valider-attribution-lait.component';

describe('ValiderAttributionLaitComponent', () => {
  let component: ValiderAttributionLaitComponent;
  let fixture: ComponentFixture<ValiderAttributionLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValiderAttributionLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderAttributionLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
