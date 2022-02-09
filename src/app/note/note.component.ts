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
    this.getProfilePicture(this.author);
  }

  getProfilePicture(authors: Object[]): void {
    let author = this.getAuthor(authors as Actor[]);
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
    console.log("Returning the First Author")
    return authors?.[0];
  }

  getIcon(author: Actor): Image | undefined {
    console.log("Returning the First Icon")
    return author?.icon?.[0];
  }

  getURL(icon: Image): Link | undefined {
    console.log("Returning the First URL")
    return icon?.url?.[0];
  }
}
