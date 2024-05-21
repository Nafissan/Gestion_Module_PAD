import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoindrePvComponent } from './joindre-pv.component';

describe('JoindrePvComponent', () => {
  let component: JoindrePvComponent;
  let fixture: ComponentFixture<JoindrePvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoindrePvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoindrePvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
