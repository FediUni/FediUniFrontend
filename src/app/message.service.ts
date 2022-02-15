import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  message = new Subject<string>();

  constructor() {}

  sendMessage(message: string) {
    this.message.next(message);
  }

  clearMessages() {
    this.message = new Subject<string>();
  }

  onMessage(): Observable<string> {
    return this.message.asObservable();
  }
}
