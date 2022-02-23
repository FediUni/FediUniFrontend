import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activity-footer',
  templateUrl: './activity-footer.component.html',
  styleUrls: ['./activity-footer.component.scss'],
})
export class ActivityFooterComponent implements OnInit {
  private _publicationTime: Date | undefined;
  liked: boolean = false
  constructor() { }

  ngOnInit(): void { }

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
}
