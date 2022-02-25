import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  getActor(identifier: string) {
    return this.http.get(
      `${environment.apiUrl}/actor?identifier=${identifier}`
    );
  }

  getCurrentActor() {
    let username = this.auth.getUsername();
    return this.http.get(`${environment.apiUrl}/actor/${username}`);
  }
}
