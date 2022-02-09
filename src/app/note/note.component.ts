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
  profilePicture: Link = new Link();

  constructor() {
  }

  ngOnInit(): void {
    this.getProfilePicture(this.author)
  }

  getProfilePicture(author: Actor[]) {
    if (author?.length === 0) {
      return;
    }
    let icons = author[0].icon ?? [];
    if (icons?.length === 0) {
      return;
    }
    let urls = icons[0].url
    if (!urls || urls.length > 0) {
      return;
    }
    this.profilePicture = urls[0] ?? new Link();
  }
}
