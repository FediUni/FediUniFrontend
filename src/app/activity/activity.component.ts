import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../vocab/Activity';
import { Actor } from '../vocab/Actor';
import {Router} from "@angular/router";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  private _activity: Activity | undefined;
  private _actor: Actor | undefined;
  @Input()
  focused: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  @Input()
  set activity(activity: Activity | undefined) {
    if (activity !== undefined) {
      this._activity = activity as Activity;
    }
  }

  get activity(): Activity | undefined {
    return this._activity;
  }

  @Input()
  set actor(actor: any) {
    if (actor === undefined) {
      return;
    }
    if (Array.isArray(actor)) {
      this._actor = new Actor(actor[0]);
      return;
    }
    this._actor = new Actor(actor);
  }

  get actor() {
    return this._actor;
  }

  redirectTo(id: string | URL){
    if (id instanceof URL) {
      id = id.toString();
    }
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigateByUrl(`/activity?id=${id}`));
  }

}
