import {Component, Input, OnInit} from '@angular/core';
import {ActivityPubObject} from "../vocab/ActivityPubObject";
import {Event} from "../vocab/Event";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  private _event: Event;

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set event(event: ActivityPubObject | undefined) {
    if (event?.type === 'Event') {
      this._event = new Event(event);
    }
  }

  get event(): Event {
    return this._event;
  }
}
