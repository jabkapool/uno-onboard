import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiVersionRoutingModule } from './api-version-routing.module';
import { ApiVersionComponent } from './api-version.component';

@NgModule({
  imports: [
    CommonModule,
    ApiVersionRoutingModule
  ],
  declarations: [ApiVersionComponent]
})
export class ApiVersionModule { }