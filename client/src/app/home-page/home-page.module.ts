import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CreateUsersComponent } from './users/create-users/create-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';

@NgModule({
  declarations: [
    HomePageComponent,
    SideBarComponent,
    TopBarComponent,
    ListUsersComponent,
    CreateUsersComponent,
    UserDetailsComponent,
    EditUsersComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomePageModule { }
