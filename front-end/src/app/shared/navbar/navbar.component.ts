import { Component, OnInit, ElementRef } from "@angular/core";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
// import { ToastrService } from 'ngx-toastr';
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  public loggedIn: boolean = false;
  constructor(
    private userService: UserService,
    public location: Location,
    private element: ElementRef,
    private router: Router,
    private toastr: ToastrService
  ) {}

  btnClick = function () {
    this.router.navigateByUrl("/signup");
  };
  bClick = function () {
    this.router.navigateByUrl("/examples/login");
  };
  btClick = function () {
    this.router.navigateByUrl("/examples/profile");
  };
  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.sidebarVisible = false;
    if (this.userService.loggedIn()) this.loggedIn = true;
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName("html")[0];
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);
    html.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    // console.log(html);
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee === "/documentation") {
      return true;
    } else {
      return false;
    }
  }

  Logout() {
    this.toastr.success("Logged out!", "", {
      timeOut: 4000
    });
    this.userService.Logout();
    this.router.navigate(["/examples/login"]);
  }

  getUserProfile() {
    this.userService.getUser();
    console.log(this.userService.getUser());
  }
}
