import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorsComponent } from './sensors.component';
import { CreateSensorsComponent } from './create-sensors/create-sensors.component';
import { ListSensorsComponent } from './list-sensors/list-sensors.component';
import { SensorDetailsComponent } from './sensor-details/sensor-details.component';
import { EditSensorsComponent } from './edit-sensors/edit-sensors.component';

const routes: Routes = [
  {
      path: '',
      component: SensorsComponent,
      children: [
          {
              path: 'createsensor',
              component: CreateSensorsComponent
          },
          {
              path: 'listsensors',
              component: ListSensorsComponent
          },
          {
              path: 'sensordetails/:id',
              component: SensorDetailsComponent
          },
          {
              path: 'editsensor/:id',
              component: EditSensorsComponent
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensorsRoutingModule { }