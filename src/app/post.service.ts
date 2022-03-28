import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  post(userID: URL, username: string, content: string, to: string, cc: string) {
    return this.http.post(`${environment.apiUrl}/actor/${username}/outbox`, {
      '@context': ['https://www.w3.org/ns/activitystreams'],
      'type': 'Note',
      'content': content,
      'published': new Date(),
      'to': [to],
      'cc': [cc],
      'attributedTo': userID,
    })
  }

  like(userID: URL, username: string, objectToLike: URL | string, authorID: URL | string) {
    return this.http.post(`${environment.apiUrl}/actor/${username}/outbox`, {
      '@context': ['https://www.w3.org/ns/activitystreams'],
      'type': 'Like',
      'actor': userID,
      'object': objectToLike,
      'publish': new Date(),
      'to': authorID,
    })
  }

  likeStatus(objectID: URL | string) {
    return this.http.post(`${environment.apiUrl}/activity/likes/status`, { objectID: objectID })
  }

  announce(userID: URL, username: String, objectID: URL | String, to: (URL | string)[], cc: (URL | string)[]) {
    return this.http.post(`${environment.apiUrl}/actor/${username}/outbox`, {
      '@context': ['https://www.w3.org/ns/activitystreams'],
      'type': 'Announce',
      'actor': userID,
      'object': objectID,
      'publish': new Date(),
      'to': to,
      'cc': cc,
    })
  }

  announceStatus(objectID: URL | string) {
    return this.http.post(`${environment.apiUrl}/activity/announce/status`, { objectID: objectID })
  }

  event(username: String, userID: String, name: String, content: String, to: String[], cc: String[], startTime: Date, endTime: Date) {
    let body = {
      '@context': ['https://www.w3.org/ns/activitystreams'],
      'type': 'Event',
      'content': content,
      'published': new Date(),
      'startTime': startTime,
      'endTime': endTime,
      'to': [to],
      'cc': [cc],
      'attributedTo': userID,
    };
    console.log(body);
    return this.http.post(`${environment.apiUrl}/actor/${username}/outbox`, body)
  }
}
