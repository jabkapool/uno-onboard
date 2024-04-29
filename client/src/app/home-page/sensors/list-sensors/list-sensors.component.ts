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
  isUserAdmin: boolean = false;
  sensors: Sensor[] = [];
  searchText!: string;
  noData: boolean = false;
  noDataMessage: string = 'There are no sensors with that name or category';
  displayedColumns: string[] = ['nome', 'category', 'status'];
  searchCategory: string = 'Name';
  orderBy: number = 0;
  private unsubscribe$ = new Subject<void>();
 
  constructor(private sensorService: SensorsService, 
              private router: Router, 
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isUserAdmin = this.authenticationService.hasPermission(this.route.snapshot);
    this.showSensorsByUser();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  searchSensors(): void {
    if(this.searchText === '' || this.searchText === 'undefined') {
      this.searchText = 'undefined';
    }
    this.sensorService.listSensors(this.searchText, this.searchCategory, this.orderBy)
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
      if(this.searchText === '' || this.searchText === 'undefined') {
        this.searchText = '';
      }
  }

  onOrderChange(e: any) {
    this.searchCategory = e.target.value;
  }

  onAscendingChange(e: any) {
    this.orderBy = e.target.value;
  }

  createSensor(): void {
    this.router.navigate(['../createsensor'], {relativeTo: this.route});
  }

  goToSensorDetails(id: string): void {
    this.router.navigate(['../sensordetails', id], {relativeTo: this.route});
  }

  showSensorsByUser(): void {
    let userId = sessionStorage?.getItem('userId') as string;
    this.sensorService.getSensorsByUser(userId)
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

}


