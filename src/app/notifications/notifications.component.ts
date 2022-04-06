import { Component, OnInit } from '@angular/core';
import {OrderedCollection, OrderedCollectionPage} from "../vocab/Collection";
import {Activity} from "../vocab/Activity";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {TimelineService} from "../timeline.service";
import {Actor} from "../vocab/Actor";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  orderedCollection: OrderedCollection
  currentPage: OrderedCollectionPage
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
    this.loadingActivities = true;
    // Remove all activities when the parameter changes.
    this.activities = [];
    this.getNotifications();
  }

  getNotifications(): void {
    this.loadingActivities = true;
    this.timeline.getPersonalNotificationsCollection(this.auth.getUsername()).subscribe({
      next: (orderedCollection) => {
        this.orderedCollection = new OrderedCollection(orderedCollection);
        this.handleIncomingCollection(this.orderedCollection);
      },
      error: () => this.loadingActivities = false,
    });
  }

  nextPage(): void {
    this.timeline.getNextPage(this.currentPage)?.subscribe({
      next: (orderedCollectionPage) => {
        this.currentPage = new OrderedCollectionPage(orderedCollectionPage);
        this.handleOrderedCollectionPage(this.currentPage);
      },
    });
  }

  handleIncomingCollection(orderedCollection: OrderedCollection): void {
    if (orderedCollection === undefined) {
      return
    }
    this.timeline.getFirstPage(orderedCollection).subscribe({
      next: (page) => {
        this.currentPage = page;
        this.handleOrderedCollectionPage(page);
      },
      error: () => this.loadingActivities = false,
    })
  }

  handleOrderedCollectionPage(page: OrderedCollectionPage): void {
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
  }

  identifier(activity: Activity): string {
    console.log(activity);
    let actor = new Actor(activity?.actor);
    return `${actor.identifier()}`
  }
}
