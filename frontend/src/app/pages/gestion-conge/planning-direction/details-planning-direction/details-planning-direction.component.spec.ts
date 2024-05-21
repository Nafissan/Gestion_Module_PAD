import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPlanningDirectionComponent } from './details-planning-direction.component';

describe('DetailsPlanningDirectionComponent', () => {
  let component: DetailsPlanningDirectionComponent;
  let fixture: ComponentFixture<DetailsPlanningDirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPlanningDirectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPlanningDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
