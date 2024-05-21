import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesInterimsComponent } from './mes-interims.component';

describe('MesInterimsComponent', () => {
  let component: MesInterimsComponent;
  let fixture: ComponentFixture<MesInterimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesInterimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesInterimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
