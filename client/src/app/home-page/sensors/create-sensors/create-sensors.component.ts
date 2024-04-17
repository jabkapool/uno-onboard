import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SensorsService } from 'src/app/services/sensors.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Sensor } from 'src/app/data/sensor';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-create-sensors',
  templateUrl: './create-sensors.component.html',
  styleUrls: ['./create-sensors.component.css']
})
export class CreateSensorsComponent implements OnInit {
  sensor: Sensor = {} as Sensor;
  errorFlag: boolean = false;
  errorMessage: string = '';
  createSensorForm: FormGroup = {} as FormGroup;
  submitted: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private sensorsService: SensorsService,
              private router: Router, 
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.createSensorForm = this.formBuilder.group({
        name: new FormControl('', [Validators.required]),
        isPrivate: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        category: new FormControl('',[Validators.required]),
        color: new FormControl('',[Validators.required]),
      });
  }

  get formControls() {
    return this.createSensorForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.sensor.id = uuidv4();
    this.sensor.name = this.createSensorForm.get('name')?.value;
    this.sensor.isPrivate = Boolean(this.createSensorForm.get('isPrivate')?.value);
    this.sensor.description = this.createSensorForm.get('description')?.value;
    this.sensor.category = this.createSensorForm.get('category')?.value;
    this.sensor.color = this.createSensorForm.get('color')?.value;
    this.sensor.userId = uuidv4();

    if(this.createSensorForm.invalid) {
      return;
    }

    this.sensorsService.createSensor(this.sensor)
      .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
            next: () => {
                console.log('Sensor subscribe');
                this.goToUsersList();
            },
            error: (error: any) => {
                console.log(error);
                this.errorFlag = true;
                try {
                    this.errorMessage = "The sensor has not been created. Try again later."
                    return;
                }
                catch {}
            }
        })
    }

  goToUsersList(): void{
    this.router.navigate(['../../listusers'], {relativeTo: this.route});
  }

}
