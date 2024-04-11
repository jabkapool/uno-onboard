import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomePageComponent,
    SideBarComponent,
    TopBarComponent,
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
