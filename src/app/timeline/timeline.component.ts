import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../timeline.service';
import { AuthenticationService } from '../authentication.service';
import { Activity } from '../vocab/Activity';

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
      next: (orderedCollection) => this.handleIncomingCollection(orderedCollection.orderedItems),
    })
  }

  handleIncomingCollection(orderedItems: Activity | Activity[]): void {
    if (!Array.isArray(orderedItems)) {
      this.activities.push(orderedItems);
      return;
    }
    orderedItems.forEach((item: Activity) => {
      this.activities.push(item);
    })
  }
}
