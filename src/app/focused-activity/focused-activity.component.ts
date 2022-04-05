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
  inReplyTo: ActivityPubObject;
  activity: Activity;
  replies: ActivityPubObject[];

  constructor(private route: ActivatedRoute, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.activity = new Activity(res['activity']);
      this.activityService.getActivityWithReplies(this.activity.id).subscribe((res) => {
        if (res?.object?.inReplyTo !== undefined) {
          this.inReplyTo = res?.object?.inReplyTo;
        }
        this.replies = [];
        let collection = new Collection(res?.object?.replies);
        let first = collection?.first;
        if (first !== undefined) {
          first.items.map((o) => this.replies.push(o))
          let next = first?.next;
          if (next !== undefined) {
            next.items.map((o) => this.replies.push(o))
          }
        }
      })
    });
  }

}
