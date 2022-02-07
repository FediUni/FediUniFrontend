import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Object } from './vocab/Object';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient) { }

  getPersonalTimeline(username: string) {
    return this.http.get<Object[]>(`${environment.apiUrl}/actor/${username}/inbox`)
  }
}