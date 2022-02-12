import { Component, OnInit, Input } from '@angular/core';
import { Actor } from '../vocab/Actor';
import { Image } from '../vocab/Image';

@Component({
  selector: 'app-activity-header',
  templateUrl: './activity-header.component.html',
  styleUrls: ['./activity-header.component.scss']
})
export class ActivityHeaderComponent implements OnInit {
  profilePicture: string = '';
  private _author: Actor | undefined;
  constructor() { }

  ngOnInit(): void {
    this.getProfilePicture();
  }

  @Input()
  set author(author: any) {
    if (author === undefined) {
      return;
    }
    this._author = new Actor(author);
  }

  get author(): Actor | undefined {
    return this._author;
  }

  getProfilePicture(): void {
    if (this.author === undefined) {
      return;
    }
    let icon = this.getIcon(this.author);
    if (icon === undefined) {
      return;
    }
    this.profilePicture = this.getURL(icon);
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
