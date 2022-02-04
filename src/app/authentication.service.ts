import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { tap } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  login(username: string, password: string) {
    let loginForm: FormData = new FormData()
    loginForm.append("username", username)
    loginForm.append("password", password)
    return this.http.post<JWTResponse>(`${environment.apiUrl}/login`, loginForm).pipe(
      tap({
        next: (res) => {
          let expirationTime = Date.parse(res.expires)
          this.cookieService.set("jwt", res.jwt, expirationTime, "/", environment.domain, true, 'Strict')
        },
      })
    );
  }
}

interface JWTResponse {
  jwt: string
  expires: string
}
