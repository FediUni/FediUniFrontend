import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  register(username: string, password: string, name: string) {
    let registerForm: FormData = new FormData();
    registerForm.append('username', username);
    registerForm.append('password', password);
    registerForm.append('name', name);
    return this.http
      .post<JWTResponse>(`${environment.apiUrl}/register`, registerForm)
      .pipe(
        tap({
          next: (res) => {
            let expirationTime = Date.parse(res.expires);
            this.handleJWT(res.jwt, expirationTime);
            this.handleUsername(username, expirationTime);
          },
        })
      );
  }

  login(username: string, password: string) {
    let loginForm: FormData = new FormData();
    loginForm.append('username', username);
    loginForm.append('password', password);
    return this.http
      .post<JWTResponse>(`${environment.apiUrl}/login`, loginForm)
      .pipe(
        tap({
          next: (res) => {
            let expirationTime = Date.parse(res.expires);
            this.handleJWT(res.jwt, expirationTime);
            this.handleUsername(username, expirationTime);
          },
        })
      );
  }

  handleJWT(token: string, expirationTime: number): void {
    this.cookieService.set(
      'jwt',
      token,
      expirationTime,
      '/',
      environment.domain,
      true,
      'Strict'
    );
  }

  getJWT(): string {
    return this.cookieService.get('jwt');
  }

  handleUsername(username: string, expirationTime: number): void {
    this.cookieService.set(
      'username',
      username,
      expirationTime,
      '/',
      environment.domain,
      true,
      'Strict'
    );
  }

  getUsername(): string {
    return this.cookieService.get('username');
  }

  isAuthenticated(): boolean {
    let username = this.getUsername();
    let jwt = this.getJWT();
    return username !== "" && jwt !== "";
  }
}

interface JWTResponse {
  jwt: string;
  expires: string;
}
