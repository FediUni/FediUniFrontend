import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient) { }

  sendFollowRequest(id: string) {
<<<<<<< HEAD
    return this.http.post(`${environment.apiUrl}/follow`, { actorID: id });
  }

  followerStatus(id: string) {
    return this.http.post(`${environment.apiUrl}/follow/status`, { actorID: id })
  }
}

export enum FollowStatus {
  NOT_FOLLOWER,
  FOLLOW_REQUEST_PENDING,
  FOLLOWER
=======
    return this.http.post(`{environment.apiUrl}/follow`, { actorID: id });
  }
>>>>>>> ffc9e0072c049fc947b4c803e3b120b6f4087cf5
}
