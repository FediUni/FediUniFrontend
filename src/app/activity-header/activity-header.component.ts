import { Component, OnInit, Input } from '@angular/core';
import { ActivityPubObject } from '../vocab/ActivityPubObject';
import { Actor } from '../vocab/Actor';
import { Image } from '../vocab/Image';

@Component({
  selector: 'app-activity-header',
  templateUrl: './activity-header.component.html',
  styleUrls: ['./activity-header.component.scss']
})
export class ActivityHeaderComponent implements OnInit {
  profilePicture: string = '';
  private _authors: Actor[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getProfilePicture(this.author);
  }

  @Input()
  set authors(authors: any) {
    if (!Array.isArray(authors)) {
      this._authors = [authors as Actor];
      return;
    }
    this._authors = authors as Actor[];
  }

  get author(): Actor[] {
    return this._authors
  }

  getProfilePicture(authors: ActivityPubObject[]): void {
    let author = this.getAuthor(authors as Actor[]);
    if (author === undefined) {
      return;
    }
    let icon = this.getIcon(author);
    if (icon === undefined) {
      return;
    }
    this.profilePicture = this.getURL(icon);
  }

  getAuthor(authors: Actor[]): Actor | undefined {
    return authors?.[0] as Actor;
  }

  getIcon(author: Actor): Image | undefined {
    if (!Array.isArray(author?.icon)) {
      return author?.icon as Image
    }
    return author?.icon?.[0] as Image;
  }

  getURL(icon: Image): string {
    if (typeof icon?.url === 'string') {
      return icon?.url;
    }
    if (!Array.isArray(icon?.url)) {
      return icon?.url?.href ?? '';
    }
    console.log("Returning the First URL")
    return icon?.url?.[0]?.href ?? '';
  }

}
