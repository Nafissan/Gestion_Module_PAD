import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubstitutPelerinageComponent } from './list-substitut-pelerinage.component';

describe('ListSubstitutPelerinageComponent', () => {
  let component: ListSubstitutPelerinageComponent;
  let fixture: ComponentFixture<ListSubstitutPelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSubstitutPelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubstitutPelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
