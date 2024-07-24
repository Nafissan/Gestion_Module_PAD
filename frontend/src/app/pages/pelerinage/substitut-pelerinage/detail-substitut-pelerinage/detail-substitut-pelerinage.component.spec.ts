import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSubstitutPelerinageComponent } from './detail-substitut-pelerinage.component';

describe('DetailSubstitutPelerinageComponent', () => {
  let component: DetailSubstitutPelerinageComponent;
  let fixture: ComponentFixture<DetailSubstitutPelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSubstitutPelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSubstitutPelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
