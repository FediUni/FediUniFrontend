import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../vocab/Activity';
import {Collection} from "../vocab/Collection";
import {ActivityService} from "../activity.service";

@Component({
  selector: 'app-focused-activity',
  templateUrl: './focused-activity.component.html',
  styleUrls: ['./focused-activity.component.scss']
})
export class FocusedActivityComponent implements OnInit {
  activity: Activity;
  replies: Collection;

  constructor(private route: ActivatedRoute, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.activity = new Activity(res['activity']);
      this.activityService.getActivityWithReplies(this.activity.id).subscribe((res) => this.replies = new Collection(res?.object?.replies))
    });
  }

}
