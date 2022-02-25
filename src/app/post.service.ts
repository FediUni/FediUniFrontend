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
}
