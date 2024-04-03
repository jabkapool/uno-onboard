import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly loginUrl = environment.services.login;
  constructor(private http: HttpClient) { }

  /**
   * @remarks Send the user's login credentials to the User controller, Web Api endpoint.
   * @param email The user's email.
   * @param password The user's password.
   * @returns The user's authentication token.
   */
  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };
    return this.http.post(this.loginUrl, body);
  }

  storeToken(tokenValue: string) {
    sessionStorage.setItem('token', tokenValue);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }
  
}
