import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';

const routes: Routes = [
{
      path: '',
      component: HomePageComponent,
      children: [
          {
              path: '',
              loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
          },
          {
              path: '',
              loadChildren: () => import('./sensors/sensors.module').then(m => m.SensorsModule)
          }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
