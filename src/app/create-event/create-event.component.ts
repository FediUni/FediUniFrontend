import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {PostService} from "../post.service";
import {AuthenticationService} from "../authentication.service";
import {environment} from "../../environments/environment";
import * as moment from "moment";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  providers: [
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ],
})
export class CreateEventComponent implements OnInit {
  postInFlight: boolean = false;
  event: FormGroup

  constructor(private fb: FormBuilder, private postService: PostService, private auth: AuthenticationService) {
    this.event = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      summary: ['', [Validators.maxLength(500)]],
      eventRange: this.fb.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
      }),
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      location: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.event.invalid) {
      return;
    }
    this.postInFlight = true;
    let name = this.event.value['name'];
    let summary = this.event.value['summary'];
    let location = this.event.value['location'];
    let startTime = this.event.value['startTime'];
    let endTime = this.event.value['endTime'];
    let startDate = this.event.value['eventRange'].startDate;
    let endDate = this.event.value['eventRange'].endDate;
    let username = this.auth.getUsername();
    let userID = new URL(`${environment.apiUrl}/actor/${username}`);
    let to: String[] = ["https://www.w3.org/ns/activitystreams#Public"];
    let cc: String[] = [`${environment.apiUrl}/actor/${username}/followers`];
    let start: any = moment(`${startDate} ${startTime}`)
    let end: any = moment(`${endDate} ${endTime}`)
    this.postService.event(username, userID.toString(), name, summary, to, cc, start, end).subscribe({
      next:() => {
        this.postInFlight = false;
        this.event.reset()
      },
      error:() => { this.postInFlight = false },
    })
  }

}
