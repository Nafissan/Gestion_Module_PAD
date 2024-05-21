import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypePartenariatComponent } from './add-type-partenariat.component';

describe('AddTypePartenariatComponent', () => {
  let component: AddTypePartenariatComponent;
  let fixture: ComponentFixture<AddTypePartenariatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypePartenariatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypePartenariatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
