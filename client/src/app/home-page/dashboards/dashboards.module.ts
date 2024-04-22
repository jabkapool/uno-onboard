import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.component';
import { DashboardsComponent } from './dashboards.component';
import { ListDashboardsComponent } from './list-dashboards/list-dashboards.component';


@NgModule({
  declarations: [
    DashboardsComponent,
    ListDashboardsComponent
  ],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
  ]
})
export class DashboardsModule { }