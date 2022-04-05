import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Activity } from '../vocab/Activity';
import {Collection} from "../vocab/Collection";
import {ActivityService} from "../activity.service";
import {ActivityPubObject, isActivity} from "../vocab/ActivityPubObject";
import {Actor} from "../vocab/Actor";

@Component({
  selector: 'app-focused-activity',
  templateUrl: './focused-activity.component.html',
  styleUrls: ['./focused-activity.component.scss']
})
export class FocusedActivityComponent implements OnInit {
  inReplyTo: ActivityPubObject;
  post: ActivityPubObject;
  actor: Actor;
  replies: ActivityPubObject[];
  loading: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private activityService: ActivityService) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.queryParams.subscribe((params) => {
      this.activityService.getActivity(params['id']).subscribe({
        next: (res) => {
          let object: ActivityPubObject;
          if (isActivity(res)) {
            let a = new Activity(res);
            this.actor = new Actor(a?.actor);
            object = a;
          } else {
            object = res;
            this.actor = new Actor(object.attributedTo);
          }
          this.post = object;
          this.loading = false;
        },
        error: () => { this.loading = false },
      });
      this.activityService.getActivityWithReplies(params['id']).subscribe({
        next: (res) => {
          let object: ActivityPubObject;
          if (isActivity(res)) {
            let a = new Activity(res);
            if (a?.object === undefined) {
              return
            }
            object = a.object;
          } else {
            object = res;
          }
          if (object?.inReplyTo !== undefined) {
            this.inReplyTo = object?.inReplyTo;
          }
          this.replies = [];
          if (object?.replies !== undefined) {
            let collection = new Collection(object?.replies);
            let first = collection?.first;
            if (first !== undefined) {
              if (first.items instanceof Array) {
                first.items.map((o) => this.replies.push(o))
              } else {
                this.replies.push(first.items);
              }
              let next = first?.next;
              if (next !== undefined) {
                if (next.items instanceof Array) {
                  next.items.map((o) => this.replies.push(o))
                } else {
                  this.replies.push(next.items);
                }
              }
            }
          }
        },
      });
    });
  }
}
