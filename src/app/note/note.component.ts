import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../vocab/Note';
import { ActivityPubObject } from '../vocab/ActivityPubObject';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  private _note: Note = new Note();

  constructor() {
  }

  ngOnInit(): void {
  }

  @Input()
  set note(note: ActivityPubObject | undefined) {
    if (note?.type === "Note") {
      this._note = note as Note;
    }
  }

  get note(): Note {
    return this._note;
  }
}
