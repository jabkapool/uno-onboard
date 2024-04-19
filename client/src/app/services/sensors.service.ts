import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Sensor } from '../data/sensor';
import { HttpHeaders } from '@angular/common/http';
import { SensorData } from '../data/sensorData';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  private readonly usersUrl = environment.services.sensors;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public getAllSensors(): Observable<Sensor[]> {
    const url = `${this.usersUrl}/GetAllSensors`;
    return this.http.get<Sensor[]>(url);
  }

  public getSensorById(id: string): Observable<Sensor> {
    const params = {sensorId: id};
    const url = `${this.usersUrl}/GetSensorById`;
    return this.http.get<Sensor>(url, {params});
  }

  public listSensors(searchQuery: string, orderBy: string, direction: number): Observable<Sensor> {
    const params = {
      searchQuery: searchQuery,
      orderBy: orderBy,
      direction: direction
    };
    const url = `${this.usersUrl}/ListSensors`; 
    return this.http.get<Sensor>(url, {params});
  }

  public createSensor(sensor: Sensor): Observable<any> {
    const url = `${this.usersUrl}/CreateSensor`; 
    return this.http.post(url, sensor, this.httpOptions);
  }

  public addSensorData(sensorId: string, sensorData: SensorData[]): Observable<any> {
    const url = `${this.usersUrl}/data/Add`;  
    return this.http.post(url+'?sensorId='+sensorId, sensorData, this.httpOptions);
  }

  public updateSensor(sensor: Sensor): Observable<any> {
    const url = `${this.usersUrl}/UpdateSensor`; 
    return this.http.put(url, sensor, this.httpOptions);
  } 
}
