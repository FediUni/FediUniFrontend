import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../timeline.service';
import { AuthenticationService } from '../authentication.service';
import { Activity } from '../vocab/Activity';
import { OrderedCollection } from '../vocab/Collection';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  activities: Activity[];
  loadingActivities: boolean;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private timeline: TimelineService,
  ) {
    this.activities = [];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(routeParams => {
      this.loadingActivities = true;
      // Remove all activities when the parameter changes.
      this.activities = [];
      switch (routeParams.get('timeline')) {
        case "personal":
          this.getPersonalTimeline();
          break;
        case "local":
          this.getLocalTimeline();
          break;
        case "public":
          this.getFederatedTimeline();
          break;
      }
    })
  }

  getPersonalTimeline(): void {
    this.loadingActivities = true;
    this.timeline.getPersonalTimelineCollection(this.auth.getUsername()).subscribe({
      next: (orderedCollection) => {
        let c = new OrderedCollection(orderedCollection);
        this.handleIncomingCollection(c);
      },
      error: () => this.loadingActivities = false,
    });
  }

  getLocalTimeline(): void {
    this.timeline.getLocalTimelineCollection().subscribe({
      next: (orderedCollection) => {
        let c = new OrderedCollection(orderedCollection);
        this.handleIncomingCollection(c);
      },
      error: () => this.loadingActivities = false,
    });
  }

  getFederatedTimeline(): void {
    this.timeline.getFederatedTimelineCollection().subscribe({
      next: (orderedCollection) => {
        let c = new OrderedCollection(orderedCollection);
        this.handleIncomingCollection(c);
      },
      error: () => this.loadingActivities = false,
    });
  }

  handleIncomingCollection(orderedCollection: OrderedCollection): void {
    if (orderedCollection === undefined) {
      return
    }
    this.timeline.getFirstPage(orderedCollection).subscribe({
      next: (page) => {
        let orderedItems = page.orderedItems ?? [];
        if (Array.isArray(orderedItems)) {
          orderedItems.map((item) => {
            let activity = item as Activity;
            if (activity === undefined) {
              return;
            }
            this.activities.push(activity);
          });
        } else if (orderedItems !== undefined) {
          this.activities.push(orderedItems as Activity);
        }
        this.loadingActivities = false;
      },
    })
  }
}
