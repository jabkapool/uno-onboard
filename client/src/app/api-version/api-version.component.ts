import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiVersionService } from '../services/api-version.service';
import { ApiVersion } from '../data/api-version';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-api-version',
  templateUrl: './api-version.component.html',
  styleUrls: ['./api-version.component.css']
})
export class ApiVersionComponent implements OnInit, OnDestroy {
  public apiVersion: ApiVersion = { 
    version: '', 
    timestamp: ''
  };
  private unsubscribe$ = new Subject<void>();

  constructor(private apiVersionService: ApiVersionService) { }

  /**
   * @remarks A callback method that is invoked immediately after the default change detector has checked the directive's
   *  data-bound properties for the first time, and before any of the view or content children have been checked. 
   * It is invoked only once when the directive is instantiated.
   */
  ngOnInit(): void {
    this.getApiVersion();
  }

  /**
   * @remarks A lifecycle hook that is called when a directive, pipe, or service is destroyed. 
   * Use for any custom cleanup that needs to occur when the instance is destroyed.
   * Used to unsubscribe from the getApiVersion observable.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
  /**
   * @remarks Get the API version from the UnoWebApi controller.
   * @param None
   * @returns The API version and the timestamp in ISO 8601 format (e.g. "2021-08-31T12:00:00Z").
   */
  getApiVersion(): void {
    this.apiVersionService.getApiVersion()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (apiVersion: ApiVersion) => {this.apiVersion = apiVersion},
        error: (error: any) => {console.log(error)}
      });
  }
}
