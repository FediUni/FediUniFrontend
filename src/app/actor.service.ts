import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  constructor(private http: HttpClient) { }

  getActor(identifier: string) {
    return this.http.get(`${environment.apiUrl}/actor?identifier=${username}`);
  }
}
