import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../timeline.service';
import { AuthenticationService } from '../authentication.service';
import { Activity } from '../vocab/Activity';
import { OrderedCollection } from '../vocab/Collection';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  activities: Activity[];

  constructor(private auth: AuthenticationService, private timeline: TimelineService) {
    this.activities = [];
  }

  ngOnInit(): void {
    this.getPersonalTimeline();
  }

  getPersonalTimeline(): void {
    this.timeline.getPersonalTimeline(this.auth.getUsername()).subscribe({
      next: (orderedCollection) => this.handleIncomingCollection(orderedCollection),
    })
  }

  handleIncomingCollection(orderedCollection: OrderedCollection): void {
    if (orderedCollection?.orderedItems?.length > 0) {
      let orderedItems = orderedCollection.orderedItems ?? [];
      orderedItems.map((item) => {
        let activity = item as Activity;
        if (activity === undefined) {
          return
        }
        console.log(`Converting Actor=${activity.actor} to array`)
        activity.actor = activity.actor?.concat(activity.actor);
        console.log(`Converted Actor=${activity.actor} to array`)
        this.activities.push(activity);
      });
    }
  }
}
