import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSuiviDemandeLaitComponent } from './details-suivi-demande-lait.component';

describe('DetailsSuiviDemandeLaitComponent', () => {
  let component: DetailsSuiviDemandeLaitComponent;
  let fixture: ComponentFixture<DetailsSuiviDemandeLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSuiviDemandeLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSuiviDemandeLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
