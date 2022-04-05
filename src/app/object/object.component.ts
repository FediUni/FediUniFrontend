import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../vocab/Actor";
import {ActivityPubObject} from "../vocab/ActivityPubObject";
import {Router} from "@angular/router";

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit {
  @Input()
  object: ActivityPubObject;
  @Input()
  private _actor: Actor;
  @Input()
  focused: boolean;

  constructor(private router: Router) { }

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

  redirectTo(id: string | URL){
    if (id instanceof URL) {
      id = id.toString();
    }
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigateByUrl(`/activity?id=${id}`));
  }
}
