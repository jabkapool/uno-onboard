import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardsComponent } from './dashboards.component';
import { ListDashboardsComponent } from './list-dashboards/list-dashboards.component';

const routes: Routes = [
  { path: '', 
    component: DashboardsComponent,
    children: [
      {
          path: 'listdashboards',
          component: ListDashboardsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }