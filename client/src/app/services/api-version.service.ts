import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiVersion } from '../data/api-version';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiVersionService {
  private readonly apiUrl = environment.services.apiVersion;

  constructor(private http: HttpClient) { }

  /**
   * @remarks Get the API version from the UnoWebApi controller.
   * @param None
   * @returns The API version and the timestamp in ISO 8601 format (e.g. "2021-08-31T12:00:00Z").
   */
  public getApiVersion(): Observable<ApiVersion> {
    return this.http.get<ApiVersion>(this.apiUrl);
  }
}
