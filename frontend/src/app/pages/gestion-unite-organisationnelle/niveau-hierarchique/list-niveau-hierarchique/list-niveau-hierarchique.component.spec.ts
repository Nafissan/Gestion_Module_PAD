import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNiveauHierarchiqueComponent } from './list-niveau-hierarchique.component';

describe('ListNiveauHierarchiqueComponent', () => {
  let component: ListNiveauHierarchiqueComponent;
  let fixture: ComponentFixture<ListNiveauHierarchiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNiveauHierarchiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNiveauHierarchiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
