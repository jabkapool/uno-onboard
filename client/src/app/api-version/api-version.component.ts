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

  ngOnInit(): void {
    this.getApiVersion();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getApiVersion(): void {
    this.apiVersionService.getApiVersion()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (apiVersion: ApiVersion) => {this.apiVersion = apiVersion},
        error: (error: any) => {console.log(error)}
      });
  }
}
