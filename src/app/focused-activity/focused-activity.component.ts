import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../vocab/Activity';
import {Collection} from "../vocab/Collection";

@Component({
  selector: 'app-focused-activity',
  templateUrl: './focused-activity.component.html',
  styleUrls: ['./focused-activity.component.scss']
})
export class FocusedActivityComponent implements OnInit {
  activity: Activity;
  replies: Collection;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.activity = new Activity(res['activity']);
      console.log(this.activity)
      this.replies = new Collection(this.activity?.object?.replies);
      console.log(this.replies);
    });
  }

}
