import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient) { }

  sendFollowRequest(id: string) {
    return this.http.post(`{environment.apiUrl}/follow`, { actorID: id });
  }
}
