import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Reservation } from './reservation';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservationUrl = 'http://localhost:3000/reservation'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }

  addReservation(reservation:Reservation):Observable<Reservation>{
    return this.http.post<Reservation>(this.reservationUrl, reservation, this.httpOptions)
  }
}
