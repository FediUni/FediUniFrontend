import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from '../message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private msg: MessageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        this.msg.sendMessage(error.error);
        return throwError(() => error)
      })
    );
  }
}
