import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthenticationService } from './authentication.service';
import { Actor } from './vocab/Actor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActorService implements Resolve<Actor> {
  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Actor | Observable<Actor> | Promise<Actor> {
    return this.http.get<Actor>(
      `${environment.apiUrl}/actor?identifier=${route.paramMap.get('identifier')}`
    );
  }

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
