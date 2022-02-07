import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../timeline.service';
import { AuthenticationService } from '../authentication.service';
import { Object } from '../vocab/Object';
import { tap } from 'rxjs';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  objects: Object[];

  constructor(private auth: AuthenticationService, private timeline: TimelineService) {
    this.objects = [];
  }

  ngOnInit(): void {
    this.getPersonalTimeline();
  }

  getPersonalTimeline(): void {
    this.timeline.getPersonalTimeline(this.auth.getUsername()).subscribe({
      next: (orderedCollection) => this.handleIncomingCollection(orderedCollection.orderedItems),
    })
  }

  handleIncomingCollection(orderedItems: Object | Object[]): void {
    if (!Array.isArray(orderedItems)) {
      this.objects.push(orderedItems)
      return
    }
    for (let object of orderedItems) {
      this.objects.push(object);
    }
  }
}
