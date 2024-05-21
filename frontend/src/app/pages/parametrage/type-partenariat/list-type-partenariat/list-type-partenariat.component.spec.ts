import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypePartenariatComponent } from './list-type-partenariat.component';

describe('ListTypePartenariatComponent', () => {
  let component: ListTypePartenariatComponent;
  let fixture: ComponentFixture<ListTypePartenariatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypePartenariatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypePartenariatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
