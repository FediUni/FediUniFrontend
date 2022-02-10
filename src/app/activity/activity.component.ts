import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../vocab/Activity';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  private _activity: Activity | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set activity(activity: Activity | undefined) {
    if (activity !== undefined) {
      this._activity = activity as Activity;
    }
  }

  get activity(): Activity | undefined {
    return this._activity;
  }
}
