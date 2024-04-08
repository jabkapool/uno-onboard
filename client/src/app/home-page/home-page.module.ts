import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { SensorsComponent } from './sensors/sensors.component';


@NgModule({
  declarations: [
    HomePageComponent,
    SideBarComponent,
    TopBarComponent,
    DashboardsComponent,
    SensorsComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule { }
