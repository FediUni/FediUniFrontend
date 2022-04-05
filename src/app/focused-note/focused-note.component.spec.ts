import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusedNoteComponent } from './focused-note.component';

describe('FocusedNoteComponent', () => {
  let component: FocusedNoteComponent;
  let fixture: ComponentFixture<FocusedNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FocusedNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusedNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
