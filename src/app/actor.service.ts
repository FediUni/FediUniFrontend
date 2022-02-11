import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actor } from './vocab/Actor';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  constructor(private http: HttpClient) { }

  getActor(username: string) {
    return this.http.get<Actor>(`${environment.apiUrl}/actor/${username}`);
  }

}
