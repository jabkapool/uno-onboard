import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorsComponent } from './sensors.component';
import { CreateSensorsComponent } from './create-sensors/create-sensors.component';

const routes: Routes = [
  {
      path: '',
      component: SensorsComponent,
      children: [
          {
              path: 'createsensor',
              component: CreateSensorsComponent
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensorsRoutingModule { }