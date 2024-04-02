import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public readonly loginUrl = 'https://localhost:7211/api/User/Login';

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
  
}
