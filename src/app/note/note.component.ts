import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../vocab/Note';
import { ActivityPubObject } from '../vocab/ActivityPubObject';
import { Actor } from '../vocab/Actor';
import { Link } from '../vocab/Link';
import { Image } from '../vocab/Image';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: ActivityPubObject = new Note();
  profilePicture: Link = new Link();
  private _author: Actor[] = [];


  constructor() {
  }

  ngOnInit(): void {
    this.getProfilePicture(this.author);
  }

  @Input()
  set author(actors: ActivityPubObject[] | ActivityPubObject) {
    if (!Array.isArray(actors)) {
      this._author = [actors as Actor];
      return;
    }
    this._author = actors as Actor[];
  }

  get author(): Actor[] {
    return this._author;
  }

  getProfilePicture(authors: ActivityPubObject[]): void {
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
    return authors?.[0] as Actor;
  }

  getIcon(author: Actor): Image | undefined {
    console.log(author?.icon);
    if (!Array.isArray(author?.icon)) {
      return author?.icon as Image
    }
    console.log("Returning the First Icon")
    return author?.icon?.[0] as Image;
  }

  getURL(icon: Image): Link | undefined {
    if (!Array.isArray(icon?.url)) {
      return icon?.url as Link;
    }
    console.log("Returning the First URL")
    return icon?.url?.[0];
  }
}
