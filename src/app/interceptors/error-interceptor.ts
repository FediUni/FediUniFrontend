import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from '../message.service';
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private msg: MessageService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((httpErrorResponse: HttpErrorResponse, _: Observable<HttpEvent<any>>) => {
        this.msg.sendMessage(`${httpErrorResponse.status}: ${httpErrorResponse.error}`);
        if (httpErrorResponse.status == HttpStatusCode.Unauthorized) {
          this.router.navigate(['/signin']);
        }
        return throwError(() => httpErrorResponse);
      })
    );
  }
}
