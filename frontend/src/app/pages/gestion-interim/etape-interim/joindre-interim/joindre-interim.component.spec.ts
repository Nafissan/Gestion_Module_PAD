import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoindreInterimComponent } from './joindre-interim.component';

describe('JoindreInterimComponent', () => {
  let component: JoindreInterimComponent;
  let fixture: ComponentFixture<JoindreInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoindreInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoindreInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
