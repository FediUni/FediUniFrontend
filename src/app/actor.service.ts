import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthenticationService } from './authentication.service';
import { Actor } from './vocab/Actor';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  getActor(identifier: string) {
    return this.http.get<Actor>(
      `${environment.apiUrl}/actor?identifier=${identifier}`
    );
  }

  getCurrentActor() {
    let username = this.auth.getUsername();
    return this.http.get(`${environment.apiUrl}/actor/${username}`);
  }
}
