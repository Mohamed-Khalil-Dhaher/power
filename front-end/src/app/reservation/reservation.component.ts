import { Component, OnInit } from "@angular/core";
import { ReservationService } from "app/reservation.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.css"],
})
export class ReservationComponent implements OnInit {
  reservationForm: FormGroup;
  constructor(
    private ReservationService: ReservationService,
    public fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    const id = parseInt(this.route.snapshot.paramMap.get("id")!);

    this.reservationForm = this.fb.group({
      takItAt: [""],
      returnItAt: [""],
      car_id: id,
      // user_id:
    });
  }

  ngOnInit(): void {}

  addReservation() {
    this.ReservationService.addReservation(
      this.reservationForm.value
    ).subscribe((newReservation) => {});
  }
}
