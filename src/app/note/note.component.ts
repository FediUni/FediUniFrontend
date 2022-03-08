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
  attachments: Array<any> = [];

  constructor() { }

  ngOnInit(): void { }

  @Input()
  set note(note: ActivityPubObject | undefined) {
    if (note?.type === 'Note') {
      this._note = note as Note;
      if (Array.isArray(note?.attachment)) {
        if (note?.attachment?.length === 1) {
          this.attachments = [{
            attachment: note.attachment[0],
            colspan: 2,
            rowspan: 1,
          }]
        } else {
          note?.attachment?.map((o) => {
            this.attachments.push({
              attachment: o,
              colspan: 1,
              rowspan: 1,
            })
          });
          if (note?.attachment?.length % 2 == 1) {
            this.attachments[0].rowspan = 2;
          }
        }
      } else if (note?.attachment !== undefined) {
        this.attachments.push({
          attachment: note?.attachment,
          colspan: 2,
          rowspan: 1,
        });
      }
    }
  }

  get note(): Note {
    return this._note;
  }
}
