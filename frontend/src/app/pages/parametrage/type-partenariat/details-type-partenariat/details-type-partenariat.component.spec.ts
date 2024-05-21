import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTypePartenariatComponent } from './details-type-partenariat.component';

describe('DetailsTypePartenariatComponent', () => {
  let component: DetailsTypePartenariatComponent;
  let fixture: ComponentFixture<DetailsTypePartenariatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTypePartenariatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTypePartenariatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
