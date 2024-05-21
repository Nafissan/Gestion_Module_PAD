import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesDemandesAtestationComponent } from './mes-demandes-atestation.component';

describe('MesDemandesAtestationComponent', () => {
  let component: MesDemandesAtestationComponent;
  let fixture: ComponentFixture<MesDemandesAtestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesDemandesAtestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesDemandesAtestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
