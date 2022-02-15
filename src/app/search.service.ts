import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  query(identifier: String) {
    return this.http.get(`${environment.apiUrl}/actor?identifier=${identifier}`)
  }
}
