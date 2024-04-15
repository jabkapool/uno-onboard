import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly usersUrl = environment.services.users;
  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<User> {
    return this.http.get<User>(this.usersUrl+'/GetAllUsers');
  }

  public listUsers(searchQuery: string): Observable<User> {
    return this.http.get<User>(this.usersUrl+'/ListUsers', {params: {searchQuery: searchQuery}});
  }
  
  public createUser(user: User): Observable<any> {
    const body = { name: user.name, email: user.email, role: user.role, phoneNumber: user.phoneNumber };
    console.log(this.usersUrl+'/Create')
    return this.http.post(this.usersUrl+'/Create', body);
  }
}