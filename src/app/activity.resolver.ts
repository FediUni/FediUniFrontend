import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivityService } from './activity.service';
import { Activity } from './vocab/Activity';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ActivityResolver implements Resolve<Activity> {
  constructor(private activity: ActivityService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Activity | Observable<Activity> | Promise<Activity> {
    let activityID = route.queryParamMap.get("id") || "";
    return this.activity.getActivity(activityID);
  }
}
