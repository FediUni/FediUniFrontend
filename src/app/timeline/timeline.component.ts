import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../timeline.service';
import { AuthenticationService } from '../authentication.service';
import { Activity } from '../vocab/Activity';
import { OrderedCollection } from '../vocab/Collection';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  activities: Activity[];

  constructor(
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private timeline: TimelineService,
  ) {
    this.activities = [];
  }

  ngOnInit(): void {
    let identifier = String(this.route.snapshot.paramMap.get('timeline'));
    switch (identifier) {
      case "personal":
        this.getPersonalTimeline();
        break;
      case "local":
        this.getLocalTimeline();
        break;
      case "federated":
        this.getPersonalTimeline();
        break;
    }
  }

  getPersonalTimeline(): void {
    this.timeline.getPersonalTimelineCollection(this.auth.getUsername()).subscribe({
      next: (orderedCollection) => {
        let c = new OrderedCollection(orderedCollection);
        this.handleIncomingCollection(c);
      },
    });
  }

  getLocalTimeline(): void {
    this.timeline.getLocalTimelineCollection().subscribe({
      next: (orderedCollection) => {
        let c = new OrderedCollection(orderedCollection);
        this.handleIncomingCollection(c);
      },
    });
  }

  getFederatedTimeline(): void {
    this.timeline.getFederatedTimelineCollection().subscribe({
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
