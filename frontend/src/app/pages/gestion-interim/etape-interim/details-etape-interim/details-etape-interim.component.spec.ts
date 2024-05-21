import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEtapeInterimComponent } from './details-etape-interim.component';

describe('DetailsEtapeInterimComponent', () => {
  let component: DetailsEtapeInterimComponent;
  let fixture: ComponentFixture<DetailsEtapeInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEtapeInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEtapeInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
