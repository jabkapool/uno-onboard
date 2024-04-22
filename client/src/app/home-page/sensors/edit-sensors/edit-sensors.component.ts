import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sensor } from 'src/app/data/sensor';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SensorsService } from 'src/app/services/sensors.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-sensors',
  templateUrl: './edit-sensors.component.html',
  styleUrls: ['./edit-sensors.component.css']
})
export class EditSensorsComponent implements OnInit, OnDestroy {
  sensor: Sensor = {} as Sensor;
  errorFlag: boolean = false;
  errorMessage: string = '';
  sensorEditForm: FormGroup = {} as FormGroup;
  submitted: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private router:Router,
              private route: ActivatedRoute,
              private sensorsService: SensorsService) { }

  ngOnInit(): void {

    this.sensorEditForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      isPrivate: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required])
    });

    this.route.params.pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        const id = params['id'];
        this.sensorsService.getSensorById(id)
        .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: (sensor: Sensor) => {
              this.sensor = sensor;
              this.setFormValues();
            },
            error: (error: any) => {
              console.log(error);
            }
      });
    });
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setFormValues(): void {
    this.sensorEditForm.get('name')?.setValue(this.sensor.name);
    this.sensorEditForm.get('isPrivate')?.setValue(this.sensor.isPrivate);
    this.sensorEditForm.get('description')?.setValue(this.sensor.description);
    this.sensorEditForm.get('category')?.setValue(this.sensor.category);
    this.sensorEditForm.get('color')?.setValue(this.sensor.color);
  }  

  get formControls() {
    return this.sensorEditForm.controls;
  }

  onSubmit(): void {

    this.submitted = true;
    this.sensor.name = this.sensorEditForm.get('name')?.value;
    this.sensor.isPrivate = this.sensorEditForm.get('isPrivate')?.value === 'true' ? true : false;
    this.sensor.description = this.sensorEditForm.get('description')?.value;
    this.sensor.category = this.sensorEditForm.get('category')?.value;
    this.sensor.color = this.sensorEditForm.get('color')?.value;

    if(this.sensorEditForm.invalid) {
      return;
    }

    this.sensorsService.updateSensor(this.sensor)
    .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.router.navigate(['../../listsensors'], {relativeTo: this.route});
        },
        error: (error: any) => {
          this.router.navigate(['../../listsensors'], {relativeTo: this.route});
        }
    });
  }

  cancelEditSensor(): void {
    this.router.navigate(['../../listsensors'], {relativeTo: this.route});
  }

  changeCategory(e: any) {
    this.sensorEditForm.get('category')?.setValue(e.target.value, {
    onlySelf: true
  });
}

}
