import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../vocab/Note';
import { ActivityPubObject } from '../vocab/ActivityPubObject';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  private _note: Note = new Note();
  attachments: any = [];

  constructor() {}

  ngOnInit(): void {}

  @Input()
  set note(note: ActivityPubObject | undefined) {
    if (note?.type === 'Note') {
      this._note = note as Note;
      console.log(note?.attachment);
      if (Array.isArray(note?.attachment)) {
        note?.attachment?.map((o) => {
          this.attachments.push(o as ActivityPubObject);
        })
      } else {
        this.attachments.push(note?.attachment);
      }
    }
  }

  get note(): Note {
    return this._note;
  }
}
