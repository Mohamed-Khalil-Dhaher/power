import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import {Car} from './car'

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carUrl = 'http://localhost:3000/car'

  constructor( private http: HttpClient) { }
  
  getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(this.carUrl)
  }
  
  getCar(id: number): Observable<Car> {
    const url = `${this.carUrl}/${id}`;
    return this.http.get<Car>(url)
  }
}
