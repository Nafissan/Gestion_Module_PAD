import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesCongesComponent } from './mes-conges.component';

describe('MesCongesComponent', () => {
  let component: MesCongesComponent;
  let fixture: ComponentFixture<MesCongesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesCongesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesCongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
