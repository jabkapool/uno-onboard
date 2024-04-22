import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sensor } from 'src/app/data/sensor';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SensorsService } from 'src/app/services/sensors.service';
import * as Papa from 'papaparse';
import { SensorData } from 'src/app/data/sensorData';

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.css']
})
export class SensorDetailsComponent implements OnInit, OnDestroy {
  sensor: Sensor = {} as Sensor;
  private unsubscribe$ = new Subject<void>();
  fileData: SensorData[] = [];
  fileDataContent: any;

  constructor(private router:Router,
              private route: ActivatedRoute,
              private sensorsService: SensorsService) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        const id = params['id'];
        this.sensorsService.getSensorById(id)
        .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: (sensor: Sensor) => {
              this.sensor = sensor;
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

  uploadFile(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();

    reader.onload = () => {
        const csvData = reader.result as string;
        let fileContent: SensorData[] = [];

        Papa.parse(csvData, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                fileContent = result.data as SensorData[];

                this.sensorsService.addSensorData(this.sensor.id, fileContent)
                  .pipe(takeUntil(this.unsubscribe$))
                  .subscribe({
                    next: () => {},
                    error: (error: any) => {
                      console.log(error);
                    }
                });
            }
        });
    };

    reader.readAsText(file);
  }

  editSensor(id: string): void {
    this.router.navigate(['../../editsensor', id], {relativeTo: this.route});
  }

}
