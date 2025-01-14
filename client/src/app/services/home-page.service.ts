import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  private homePageUrl = environment.services.homePage;

  constructor(private http: HttpClient) { }

  public getHomePage(): Observable<string> {
    return this.http.get<string>(this.homePageUrl);
  }
}
