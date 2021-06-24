import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Car } from '../car';
// import { User } from '../user';
import { CarService } from '../car.service';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car : Car | undefined
  // user : User | undefined
  constructor(
    private route: ActivatedRoute,
    private CarService: CarService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCar()
  }
  getCar() : void{
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    console.log(id)
    this.CarService.getCar(id)
      .subscribe(car => this.car = car);
  }

  
}
