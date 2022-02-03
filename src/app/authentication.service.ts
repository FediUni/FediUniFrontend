import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    console.log("Posting to " + environment.apiUrl)
    return this.http.post<JWTResponse>(`${environment.apiUrl}/login`, {email, password}).pipe(
      tap({
        next: (res) => console.log(res),
      })
    );
  }
}

interface JWTResponse {
  jwt: string
  expires: string
}
