import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Sensor } from '../data/sensor';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  private readonly usersUrl = environment.services.sensors;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public getAllSensors(): Observable<Sensor> {
    const url = `${this.usersUrl}/GetAllSensors`;
    return this.http.get<Sensor>(url);
  }

  public getSensorById(id: string): Observable<Sensor> {
    const url = `${this.usersUrl}/GetSensorById/${id}`;
    return this.http.get<Sensor>(url);
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
}
