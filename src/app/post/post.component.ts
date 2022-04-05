import {Component, Input, OnInit} from '@angular/core';
import {Activity} from "../vocab/Activity";
import {Actor} from "../vocab/Actor";
import {ActivityPubObject} from "../vocab/ActivityPubObject";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input()
  post: ActivityPubObject | Activity | undefined;
  private _actor: Actor | undefined;
  @Input()
  focused: boolean;

  constructor() { }

  ngOnInit(): void {
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

  isActivity(): boolean {
    let type: string = this.post?.type || '';
    switch (type) {
      case "Create":
        return true;
      case "Announce":
        return true;
      case "Invite":
        return true;
      default:
        return false;
    }
  }
}
