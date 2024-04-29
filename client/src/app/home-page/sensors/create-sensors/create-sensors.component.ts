import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SensorsService } from 'src/app/services/sensors.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Sensor } from 'src/app/data/sensor';

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
        name: ['',Validators.required],
        isPrivate: ['true'],
        description: ['', Validators.required],
        category: ['',Validators.required],
        color: ['',Validators.required]
      });
  }

  changeCategory(e: any) {
      this.createSensorForm.get('category')?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.sensor = this.createSensorForm.value;
    
    if(this.createSensorForm.invalid) {
      return;
    }

    this.sensorsService.createSensor(this.sensor)
      .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
            next: () => {
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
        });
    }

  goToUsersList(): void{
    this.router.navigate(['../listsensors'], {relativeTo: this.route});
  }

}
