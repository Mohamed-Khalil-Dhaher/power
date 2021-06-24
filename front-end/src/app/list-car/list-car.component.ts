import { Component, OnInit } from '@angular/core';

import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.css']
})
export class ListCarComponent implements OnInit {

 cars:Car[]=[];
 name:string; 
  constructor(private CarService : CarService) {}

  ngOnInit(): void {
    this.getCars()
  }
   
  getCars(){
    this.CarService.getCars()
    .subscribe((cars: Car[])=>{
      this.cars=cars
      // console.log(this.cars)
    })
  }

//   search (){
//     if(this.name!==""){
//      this.cars = this.cars.filter(res=>res.brand.toLocaleLowerCase().match(this.name.toLocaleLowerCase()))
//       this.ngOnInit()
//       console.log(this.name);
      
//     }else if (this.name==''){
//       this.getCars()
//     }
// };

  
}
