import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeColonsComponent } from './liste-colons.component';

describe('ListeColonsComponent', () => {
  let component: ListeColonsComponent;
  let fixture: ComponentFixture<ListeColonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeColonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeColonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
