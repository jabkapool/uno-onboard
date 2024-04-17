import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorsRoutingModule } from './sensors-routing.module';
import { SensorsComponent } from './sensors.component';
import { CreateSensorsComponent } from './create-sensors/create-sensors.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SensorsComponent,
    CreateSensorsComponent
  ],
  imports: [
    CommonModule,
    SensorsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class SensorsModule { }