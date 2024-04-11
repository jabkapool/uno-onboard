import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.component';
import { DashboardsComponent } from './dashboards.component';


@NgModule({
  declarations: [
    DashboardsComponent
  ],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
  ]
})
export class DashboardsModule { }