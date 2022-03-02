import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderedCollection, OrderedCollectionPage } from './vocab/Collection';
import { Link } from './vocab/Link';

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  constructor(private http: HttpClient) { }

  getPersonalTimelineCollection(username: string) {
    return this.http.get(`${environment.apiUrl}/actor/${username}/inbox`);
  }

  getLocalTimelineCollection() {
    return this.http.get(`${environment.apiUrl}/inbox?local=true`);
  }

  getFederatedTimelineCollection() {
    return this.http.get(`${environment.apiUrl}/inbox`);
  }

  getFirstPersonalTimelinePage(c: OrderedCollection) {
    let url: string = '';
    if (c.first instanceof Link) {
      url = c.first.href;
    } else {
      url = c.first;
    }
    return this.http.get<OrderedCollectionPage>(url);
  }

  getNextPersonalTimelinePage(c: OrderedCollectionPage) {
    if (c?.next === undefined) {
      return;
    }
    return this.http.get<OrderedCollectionPage>(c.next.href);
  }
}
