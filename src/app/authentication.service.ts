import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { tap } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  register(username: string, password: string, name: string) {
    let registerForm: FormData = new FormData();
    registerForm.append("username", username);
    registerForm.append("password", password);
    registerForm.append("name", name);
    return this.http.post<JWTResponse>(`${environment.apiUrl}/register`, registerForm).pipe(
      tap({
        next: (res) => this.handleJWT(res),
      })
    );
  }

  login(username: string, password: string) {
    let loginForm: FormData = new FormData()
    loginForm.append("username", username)
    loginForm.append("password", password)
    return this.http.post<JWTResponse>(`${environment.apiUrl}/login`, loginForm).pipe(
      tap({
        next: (res) => this.handleJWT(res),
      })
    );
  }

  handleJWT(res: JWTResponse) {
    let expirationTime = Date.parse(res.expires)
    this.cookieService.set("jwt", res.jwt, expirationTime, "/", environment.domain, true, 'Strict')
  }
}

interface JWTResponse {
  jwt: string
  expires: string
}
