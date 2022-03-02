import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTimelineComponent } from './personal-timeline.component';

describe('PersonalTimelineComponent', () => {
  let component: PersonalTimelineComponent;
  let fixture: ComponentFixture<PersonalTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
