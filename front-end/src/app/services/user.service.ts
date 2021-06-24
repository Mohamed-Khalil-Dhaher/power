import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "../models/user.model";

const helper = new JwtHelperService();
@Injectable({
  providedIn: "root"
})
export class UserService {
  readonly rootUrl = "http://localhost:3000";

  authToken: any;
  user: any;

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http: HttpClient) {}
  userAuthentification(email: any, password: any) {
    var data = {
      email: email,
      password: password
    };
    var requestHeader = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post(this.rootUrl + "/auth/login", data, this.httpOptions);
  }

  registerUser(user: User) {
    const body: User = {
      FirstName: user.FirstName,
      LastName: user.LastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      type: user.type
    };
    return this.http.post(
      this.rootUrl + "/user/auth/signup",
      body,
      this.httpOptions
    );
  }

  getAllUsers() {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.get(this.rootUrl, { headers: headers });
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders({
      Authorization: this.authToken,
      "Content-Type": "application/json"
    });
    return this.http.get(this.rootUrl + "/profile", { headers: headers });
  }

  getUser() {
    this.http.get(this.rootUrl + "/user", this.httpOptions);
  }

  storeUserData(token: string) {
    localStorage.setItem("id_token", token);
    // localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    return this.authToken;
    // this.user = user;
  }

  Logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  loggedIn() {
    let token = localStorage.getItem("id_token") || undefined;
    return !helper.isTokenExpired(token);
  }
}
