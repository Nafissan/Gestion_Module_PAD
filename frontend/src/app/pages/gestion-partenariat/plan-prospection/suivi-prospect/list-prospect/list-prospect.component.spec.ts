import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProspectComponent } from './list-prospect.component';

describe('ListProspectComponent', () => {
  let component: ListProspectComponent;
  let fixture: ComponentFixture<ListProspectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProspectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
