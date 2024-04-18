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
    return this.http.post(this.usersUrl+'/Create', body);
  }

  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.usersUrl+'/GetUserById/'+id);
  }

  public logoff(user: User): Observable<any> {
    const body = { id: user.id };
    return this.http.post(this.usersUrl+'/Logout', body);
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete(this.usersUrl+'/DeleteUserById/'+id);
  }


}