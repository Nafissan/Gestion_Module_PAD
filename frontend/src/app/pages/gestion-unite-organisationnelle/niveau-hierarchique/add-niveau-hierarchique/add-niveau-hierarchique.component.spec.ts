import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNiveauHierarchiqueComponent } from './add-niveau-hierarchique.component';

describe('AddNiveauHierarchiqueComponent', () => {
  let component: AddNiveauHierarchiqueComponent;
  let fixture: ComponentFixture<AddNiveauHierarchiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNiveauHierarchiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNiveauHierarchiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
