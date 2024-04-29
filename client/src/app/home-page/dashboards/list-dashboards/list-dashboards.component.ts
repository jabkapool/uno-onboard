import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { SensorsService } from 'src/app/services/sensors.service';
import { Subject, from } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as echarts from 'echarts';
import * as $ from 'jquery';
import { SensorDataDto } from 'src/app/data/sensorDataDto';
import { FavouriteSensorsDataDto } from 'src/app/data/favouriteSensorsDataDto';

@Component({
  selector: 'app-list-dashboards',
  templateUrl: './list-dashboards.component.html',
  styleUrls: ['./list-dashboards.component.css']
})
export class ListDashboardsComponent implements OnInit, OnDestroy {
  userId: string = sessionStorage?.getItem('userId') as string;
  //from and to Dates should be defined in the application settings in the Frontend.
  // Also on the frontend, the user should be able to select the date range for the data they want to see, with a calendar.
  // No time for that so it's hardcoded for now.  
  fromDate = new Date(2024, 3, 3);
  toDate = new Date(2024, 3, 27);
  sensorsDataDto: SensorDataDto[] = [];
  favouriteSensorsDataDto: FavouriteSensorsDataDto[] = [];
  data = [{
    legend: '',
    dataPoints: [] as number[]
  }];
  series: any[] = [];
  legends: any[] = [];
  displayWarningMessage: boolean = false;
  warningMessage: string = 'You don\'t have favourite sensors yet.';
  private unsubscribe$ = new Subject<void>();

  constructor(private sensorService: SensorsService,
    private elm: ElementRef) { }

  ngOnInit(): void {
    this.showFavouriteSensorsData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showFavouriteSensorsData(): void {
    this.sensorService.getFavouriteSensorsData(this.fromDate, this.toDate)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (sensorsDataList: FavouriteSensorsDataDto[]) => {

          if (sensorsDataList.length == 0) {
            this.displayWarningMessage = true;
            return;
          }
          this.favouriteSensorsDataDto = sensorsDataList;
          
          this.favouriteSensorsDataDto.forEach((x, idx) => {
            let chart = '#chart';
            this.data = [{
              legend: x.sensorDataDto[idx].sensorName,
              dataPoints: x.sensorDataDto.map(y => y.numericValues)
            }];

            chart = chart + idx;

            let stackchart = echarts.init($(this.elm.nativeElement).find(chart)[0]);
            this.data.forEach(x => {
              this.series = [{
                name: x.legend,
                type: 'line',
                areaStyle: { normal: {} },
                data: x.dataPoints
              }];

              this.legends.push(x.legend)
            })


            stackchart.setOption({
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  label: { backgroundColor: '#6a7985' }
                }
              },
              legend: { data: this.legends },
              grid: {
                left: '10%',
                right: '10%',
                bottom: '5%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  boundaryGap: false,
                  data: this.favouriteSensorsDataDto[idx].sensorDataDto.map(x => x.timeStamp)
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],

              series: this.series,
            },
            )
          });
        },
        error: (error: any) => {
          console.log(error);
        }
      });
  }

}
