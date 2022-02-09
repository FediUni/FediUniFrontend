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
  profilePicture: Link | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.getProfilePicture(this.author)

  }

  getProfilePicture(authors: Actor[]) {
    if (authors?.length === 0) {
      return;
    }
    let author = authors[0];
    if (author?.icon?.length === 0) {
      return;
    }
    let icon = author.icon[0];
    if (!icon?.url) {
      return;
    }
    let url = icon.url[0]
    this.profilePicture = url ?? new Link();
  }
}
