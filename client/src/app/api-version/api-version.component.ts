import { Component, OnInit } from '@angular/core';
import { ApiVersionService } from '../services/api-version.service';
import { ApiVersion } from '../data/api-version';

@Component({
  selector: 'app-api-version',
  templateUrl: './api-version.component.html',
  styleUrls: ['./api-version.component.css']
})
export class ApiVersionComponent implements OnInit {
  public apiVersion: ApiVersion = { 
    version: '', 
    timestamp: ''
  };

  constructor(private apiVersionService: ApiVersionService) { }

  ngOnInit(): void {
    this.getApiVersion();
  }

  getApiVersion(): void {
    this.apiVersionService.getApiVersion().subscribe( {
        next: (apiVersion: ApiVersion) => {this.apiVersion = apiVersion},
        error: (error: any) => {console.log(error)}
      });
  }
}
