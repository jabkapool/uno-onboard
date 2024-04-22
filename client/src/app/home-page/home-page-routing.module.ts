import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { CreateUsersComponent } from './users/create-users/create-users.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { AuthGuard } from '../helpers/auth.guard';

const routes: Routes = [
  {
      path: '',
      component: HomePageComponent,
      canActivate: [AuthGuard],
      children: [
          {
              path: 'dashboards',
              loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
          },
          {
              path: 'sensors',
              loadChildren: () => import('./sensors/sensors.module').then(m => m.SensorsModule)
          },
          {
            path: 'listusers',
            component: ListUsersComponent
         },
          {
            path: 'createuser',
            component: CreateUsersComponent
          },
          {
            path: 'userdetails/:id',
            component: UserDetailsComponent
          },
          {
            path: 'edituser/:id',
            component: EditUsersComponent
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
