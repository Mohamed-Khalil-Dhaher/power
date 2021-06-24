import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { User } from "../models/user.model";
//import { NgForm } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  // isLoginError: boolean = false;
  // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  user: User = new User();
  FirstName: string;
  LastName: string;
  email: string;
  phoneNumber: number;
  password: string;
  confirmPassword: string;
  type: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
  }
  // OnSubmitLogin(email: any, password: any) {
  //   this.userService.userAuthentification(email, password).subscribe(
  //     (data: any) => {
  //       if (data.success) {
  //         this.userService.storeUserData(data.jwt, data.user);
  //         this.toastr.success('Awesome!', 'You are logged in!', {
  //           timeOut: 4000,
  //         });
  //         this.router.navigate(['/']);
  //       } else {
  //         this.isLoginError = true;
  //         this.toastr.error('Oops!', data.errors.email , {
  //           timeOut: 4000,
  //         });
  //       }
  //     },
  //     (err: HttpErrorResponse) => {
  //       this.isLoginError = true;
  //     }
  //   );
  // }

  OnSubmit() {
    // console.log(form);
    if(this.password != this.confirmPassword) alert('Make sure the passords match')
    else {
      const user = {
      FirstName: this.FirstName,
      LastName: this.LastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
      type: this.type
    };
    this.userService.registerUser(user).subscribe((data) => {
      console.log(data);
      if (data) {
        // this.resetForm(form);
        this.toastr.success("Awesome!", "Welcome to ADN²", {
          timeOut: 4000
        });
        this.router.navigate(["/examples/login"]);
      }
      else {
        this.toastr.error("Error -", this.FirstName);
      }
    });
    }
}
  // onClick() {
  // if(this.type === "company") {

  // }
  // }
  // resetForm(form?: NgForm) {
  //   if (form != null) form.reset();
  //   this.user = {
  //     FirstName: "",
  //     LastName: "",
  //     email: "",
  //     phoneNumber: null,
  //     password: ""
  //   };
  // }
}
