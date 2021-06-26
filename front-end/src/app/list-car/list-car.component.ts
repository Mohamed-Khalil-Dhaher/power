import { Component, OnInit } from "@angular/core";

import { Car } from "../car";
import { CarService } from "../car.service";

@Component({
  selector: "app-list-cars",
  templateUrl: "./list-car.component.html",
  styleUrls: ["./list-car.component.css"]
})
export class ListCarComponent implements OnInit {
  cars: Car[] = [];
  brand: string;
  name: string;
  constructor(private CarService: CarService) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.CarService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
      // console.log(this.cars)
    });
  }

  Search() {
    if (this.brand != "") {
      this.cars = this.cars.filter((res) => {
        return res.brand
          .toLocaleLowerCase()
          .match(this.brand.toLocaleLowerCase());
      });
    } else if (this.brand == "") {
      this.ngOnInit();
    }
  }
}
