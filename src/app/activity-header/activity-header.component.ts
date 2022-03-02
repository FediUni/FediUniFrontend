import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Actor } from '../vocab/Actor';
import { Image } from '../vocab/Image';

@Component({
  selector: 'app-activity-header',
  templateUrl: './activity-header.component.html',
  styleUrls: ['./activity-header.component.scss'],
})
export class ActivityHeaderComponent implements OnInit {
  profilePicture: string = '';
  private _author: Actor | undefined;
  private _publicationTime: Date | undefined;

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

  @Input()
  set publicationTime(published: Date | string | undefined) {
    if (published === undefined) {
      return;
    }
    if (published instanceof Date) {
      this._publicationTime = published;
      return;
    }
    this._publicationTime = new Date(published);
  }

  get publicationTime() {
    return this._publicationTime;
  }

  get relativeTime() {
    let publishedTime = moment(this.publicationTime);
    return publishedTime.fromNow();
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
      return author?.icon as Image;
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
    console.log('Returning the First URL');
    return icon?.url?.[0]?.href ?? '';
  }
}
