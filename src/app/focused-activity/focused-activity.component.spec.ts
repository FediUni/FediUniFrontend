import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusedActivityComponent } from './focused-activity.component';

describe('FocusedActivityComponent', () => {
  let component: FocusedActivityComponent;
  let fixture: ComponentFixture<FocusedActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FocusedActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusedActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
