import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../vocab/Note';
import { Object } from '../vocab/Object';
import { Actor } from '../vocab/Actor';
import { Link } from '../vocab/Link';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Object = new Note();
  @Input() author: Actor[] = [];
  profilePicture: Link[] = [];

  constructor() {
  }

  ngOnInit(): void {
    let icon = this.note.icon;
    if (this.note.icon !== undefined && this.note.icon.length > 0) {
      this.profilePicture = this.note.icon[0].url
    }
  }

}
