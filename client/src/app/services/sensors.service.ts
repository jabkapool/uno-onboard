import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Sensor } from '../data/sensor';
import { HttpHeaders } from '@angular/common/http';
import { SensorData } from '../data/sensorData';
import { FavouriteSensor } from '../data/favourite-sensor';
import { IsSensorFavourite } from '../data/favourite-sensor';
import { SensorDataDto } from '../data/sensorDataDto';
import { FavouriteSensorsDataDto } from '../data/favouriteSensorsDataDto';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  private readonly sensorsUrl = environment.services.sensors;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public getAllSensors(): Observable<Sensor[]> {
    const url = `${this.sensorsUrl}/GetAllSensors`;
    return this.http.get<Sensor[]>(url);
  }

  public getSensorById(id: string): Observable<Sensor> {
    const params = {sensorId: id};
    const url = `${this.sensorsUrl}/GetSensorById`;
    return this.http.get<Sensor>(url, {params});
  }

  public listSensors(searchQuery: string, orderBy: string, direction: number): Observable<Sensor> {
    const params = {
      searchQuery: searchQuery,
      orderBy: orderBy,
      direction: direction
    };
    const url = `${this.sensorsUrl}/ListSensors`; 
    return this.http.get<Sensor>(url, {params});
  }

  public createSensor(sensor: Sensor): Observable<any> {
    const url = `${this.sensorsUrl}/CreateSensor`; 
    return this.http.post(url, sensor, this.httpOptions);
  }

  public addSensorData(sensorId: string, sensorData: SensorData[]): Observable<any> {
    const url = `${this.sensorsUrl}/data/Add`;
    return this.http.post(url+'?sensorId='+sensorId, sensorData, this.httpOptions);
  }

  public updateSensor(sensor: Sensor): Observable<any> {
    const url = `${this.sensorsUrl}/UpdateSensor`; 
    return this.http.put(url, sensor, this.httpOptions);
  } 

  public addRemoveFavouriteSensor(favouriteSensor : FavouriteSensor): Observable<any> {
    const url = `${this.sensorsUrl}/AddOrRemoveSensorAsFavourite`; 
    return this.http.post(url, favouriteSensor, this.httpOptions);
  }

  public checkIfSensorIsFavourite(sensorId: string): Observable<IsSensorFavourite> {
    const url = `${this.sensorsUrl}/CheckIfSensorIsFavourite`; 
    return this.http.get<IsSensorFavourite>(url+'?sensorId='+sensorId);
  }

  public getFavouriteSensorsData(fromDate: Date, toDate: Date): Observable<FavouriteSensorsDataDto[]> {
    console.log(fromDate);
    const params = new HttpParams()
                    .set('fromDate', fromDate.toISOString())
                    .set('toDate', toDate.toISOString());
    const url = `${this.sensorsUrl}/data/GetFavouriteSensorsData`; 
    return this.http.get<FavouriteSensorsDataDto[]>(url, {params});
  }
}
