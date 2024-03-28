import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiVersion } from '../data/api-version';

@Injectable({
  providedIn: 'root'
})
export class ApiVersionService {
  public readonly ApiUrl = 'https://localhost:7211/api/';

  constructor(private http: HttpClient) { }

  //Get Api Version
  public getApiVersion(): Observable<ApiVersion> {
    return this.http.get<ApiVersion>(this.ApiUrl + 'UnoWebApi/Version');
  }
}
