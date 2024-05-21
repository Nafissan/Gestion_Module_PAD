import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsNiveauHierarchiqueComponent } from './details-niveau-hierarchique.component';

describe('DetailsNiveauHierarchiqueComponent', () => {
  let component: DetailsNiveauHierarchiqueComponent;
  let fixture: ComponentFixture<DetailsNiveauHierarchiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsNiveauHierarchiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsNiveauHierarchiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
