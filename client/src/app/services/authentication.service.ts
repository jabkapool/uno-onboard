import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly loginUrl = environment.services.login;

  constructor(private http: HttpClient) {}

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

  storeUserData(id: string, userName: string, roleName: string, tokenValue: string): void {
    sessionStorage.setItem('userId', id);
    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('role', roleName);
    sessionStorage.setItem('token', tokenValue);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  hasPermission(route: any): boolean {
    if(sessionStorage.getItem('role') === 'Admin') {
      return true;
    }
    return false;
  }

}
