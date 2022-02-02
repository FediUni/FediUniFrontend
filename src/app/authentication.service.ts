import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post('/api/login', {email, password}).pipe(catchError((err) => throwError(() => err)));
  }
}
