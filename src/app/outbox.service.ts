import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OutboxService {
  constructor(private http: HttpClient) {}

  getOutboxPage(identifier: String, page: Number) {
    return this.http.get(
      `${environment.apiUrl}/actor/outbox?identifier=${identifier}&page=${page}`
    );
  }
}
