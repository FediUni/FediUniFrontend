import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../vocab/Note';
import { Object } from '../vocab/Object';
import { Actor } from '../vocab/Actor';
import { Link } from '../vocab/Link';
import { Image } from '../vocab/Image';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Object = new Note();
  @Input() author: Object[] = [];
  profilePicture: Link = new Link();

  constructor() {
  }

  ngOnInit(): void {
    this.getProfilePicture(this.author as Actor[])
  }

  getProfilePicture(authors: Actor[]): void {
    let author = this.getAuthor(authors);
    if (author === undefined) {
      console.log("Author is Undefined");
      return;
    }
    let icon = this.getIcon(author);
    if (icon === undefined) {
      console.log("Icon is Undefined")
      return;
    }
    this.profilePicture = this.getURL(icon) ?? new Link();
  }

  getAuthor(authors: Actor[]): Actor | undefined {
    return authors?.[0];
  }

  getIcon(author: Actor): Image | undefined {
    return author?.icon?.[0];
  }

  getURL(icon: Image): Link | undefined {
    return icon?.url?.[0];
  }
}
