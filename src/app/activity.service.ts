
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from './vocab/Activity';
import { environment } from '../environments/environment';
import {ActivityPubObject} from "./vocab/ActivityPubObject";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) { }

  getActivity(activityID: string) {
    if (activityID === "") {
      throw Error("Activity ID must be specified")
    }
    return this.http.get<ActivityPubObject>(`${environment.apiUrl}/activity?id=${activityID}`);
  }

  getActivityWithReplies(activityID: URL | string) {
    return this.http.get<ActivityPubObject>(`${environment.apiUrl}/activity?id=${activityID}&replies=true`);
  }
}
