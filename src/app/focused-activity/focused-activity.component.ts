import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../vocab/Activity';
import {Collection} from "../vocab/Collection";
import {ActivityService} from "../activity.service";
import {ActivityPubObject} from "../vocab/ActivityPubObject";

@Component({
  selector: 'app-focused-activity',
  templateUrl: './focused-activity.component.html',
  styleUrls: ['./focused-activity.component.scss']
})
export class FocusedActivityComponent implements OnInit {
  activity: Activity;
  replies: ActivityPubObject[];

  constructor(private route: ActivatedRoute, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.activity = new Activity(res['activity']);
      this.activityService.getActivityWithReplies(this.activity.id).subscribe((res) => {
        console.log(`Initial Response = ${res}`)
        this.replies = [];
        let collection = new Collection(res?.object?.replies);
        let first = collection?.first;
        if (first === undefined) {
          return
        }
        console.log(`First Page = ${first}`)
        first.items.map((o) => this.replies.push(o))
        let next = first.next;
        if (next === undefined) {
          return
        }
        console.log(`Next Page = ${next}`)
        next.items.map((o) => this.replies.push(o))
        console.log(this.replies)
      })
    });
  }

}
