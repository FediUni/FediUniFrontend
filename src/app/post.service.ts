import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Note } from './vocab/Note';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  post(userID: URL, username: string, content: string, to: string, cc: string) {
    let note: Note = {
      type: "Note",
      content: content,
      published: new Date(),
      to: [to],
      cc: [cc],
      attributedTo: userID,
    }
    return this.http.post(`${environment.apiUrl}/actor/${username}/outbox`, note)
  }
}
