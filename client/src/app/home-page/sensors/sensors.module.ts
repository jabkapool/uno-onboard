import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorsRoutingModule } from './sensors-routing.module';
import { FormsModule } from '@angular/forms';
import { SensorsComponent } from './sensors.component';
import { CreateSensorsComponent } from './create-sensors/create-sensors.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ListSensorsComponent } from './list-sensors/list-sensors.component';
import { SensorDetailsComponent } from './sensor-details/sensor-details.component';
import { EditSensorsComponent } from './edit-sensors/edit-sensors.component';


@NgModule({
  declarations: [
    SensorsComponent,
    CreateSensorsComponent,
    ListSensorsComponent,
    SensorDetailsComponent,
    EditSensorsComponent
  ],
  imports: [
    CommonModule,
    SensorsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SensorsModule { }