import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Users } from '../data/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly usersUrl = environment.services.users;
  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<Users> {
    return this.http.get<Users>(this.usersUrl+'GetAllUsers');
  }

  public listUsers(searchQuery: string): Observable<Users> {
    return this.http.get<Users>(this.usersUrl+'ListUsers', {params: {searchQuery: searchQuery}});
  }

}