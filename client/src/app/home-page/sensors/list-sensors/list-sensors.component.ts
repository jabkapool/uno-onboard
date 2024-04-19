import { Component, OnInit, OnDestroy } from '@angular/core';
import { SensorsService } from 'src/app/services/sensors.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Sensor } from 'src/app/data/sensor';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-list-sensors',
  templateUrl: './list-sensors.component.html',
  styleUrls: ['./list-sensors.component.css']
})
export class ListSensorsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  isUserAdmin: boolean = false;
  sensors: Sensor[] = [];
  searchText!: string;
  noData: boolean = false;
  noDataMessage: string = 'There are no sensors with that name or category';
  displayedColumns: string[] = ['nome', 'category', 'status'];
 
  constructor(private sensorService: SensorsService, 
              private router: Router, 
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isUserAdmin = this.authenticationService.hasPermission(this.route.snapshot);
    this.showAllSensors();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showAllSensors(): void {
    this.sensorService.getAllSensors()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (sensorsList: Sensor[]) => { 
          this.sensors = sensorsList;
        },
        error: (error: any) => {
          console.log(error);
          this.sensors = [];
        }
      });
  } 

  filterSensors(): void {
    this.sensorService.listSensors(this.searchText, 'Name', 0)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (sensorsList: any) => {
          this.sensors = sensorsList;
          this.noData = false;
        },
        error: () => {
          this.sensors = [];
          this.noData = true;
        }
      });
  }

  createSensor(): void {
    if(this.isUserAdmin) {
      this.router.navigate(['../createsensor'], {relativeTo: this.route});
    }
    else {
      alert('You do not have permission to create a new sensor');
    }
  }

  goToSensorDetails(id: string): void {
    this.router.navigate(['../sensordetails', id], {relativeTo: this.route});
  }

}


