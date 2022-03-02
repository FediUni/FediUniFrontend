import { Component, OnInit } from '@angular/core';
import {Activity} from "../vocab/Activity";
import {AuthenticationService} from "../authentication.service";
import {TimelineService} from "../timeline.service";
import {OrderedCollection} from "../vocab/Collection";

@Component({
  selector: 'app-personal-timeline',
  templateUrl: './personal-timeline.component.html',
  styleUrls: ['./personal-timeline.component.scss']
})
export class PersonalTimelineComponent implements OnInit {
  activities: Activity[];

  constructor(
    private auth: AuthenticationService,
    private timeline: TimelineService
  ) {
    this.activities = [];
  }

  ngOnInit(): void {
    this.getPersonalTimeline();
  }

  getPersonalTimeline(): void {
    this.timeline.getPersonalTimelineCollection(this.auth.getUsername()).subscribe({
      next: (orderedCollection) => {
        let c = new OrderedCollection(orderedCollection);
        this.handleIncomingCollection(c);
      },
    });
  }

  handleIncomingCollection(orderedCollection: OrderedCollection): void {
    if (orderedCollection == undefined) {
      return
    }
    if (orderedCollection?.orderedItems?.length > 0) {
      let orderedItems = orderedCollection.orderedItems ?? [];
      orderedItems.map((item) => {
        let activity = item as Activity;
        if (activity === undefined) {
          return;
        }
        this.activities.push(activity);
      });
    } else {
      this.timeline.getFirstPersonalTimelinePage(orderedCollection).subscribe({
        next: (page) => {
          let orderedItems = page.orderedItems ?? [];
          orderedItems.map((item) => {
            let activity = item as Activity;
            if (activity === undefined) {
              return;
            }
            this.activities.push(activity);
          });
        },
      })
    }
  }
}
