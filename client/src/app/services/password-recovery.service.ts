import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {
  private readonly passwordRecoveryUrl = environment.services.passwordRecovery;
  constructor(private http: HttpClient) { }

  /**
   * @remarks Send the user's email PasswordRecovery endpoint of User controller.
   * @param email The user's email.
   * @returns Message with password changed successfully or not.
   */
  passwordRecovery(email: string): Observable<any> {
    const body = { email: email};
    return this.http.put(this.passwordRecoveryUrl, body);
  }
}