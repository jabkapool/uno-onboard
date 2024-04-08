import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { SensorsComponent } from './sensors/sensors.component';
import { ListUsersComponent } from './list-users/list-users.component';


@NgModule({
  declarations: [
    HomePageComponent,
    SideBarComponent,
    TopBarComponent,
    DashboardsComponent,
    SensorsComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MatTableModule,
    FormsModule
  ]
})
export class HomePageModule { }
