import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { LocalToken } from "../auth/auth.service";
import { tap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface UserResponse {
  userName: string;
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
  phone: number;
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  private configURL = environment.BaseURL + "user/";

  getUserData() {
    let username: string = "";
    let local: LocalToken = JSON.parse(
      localStorage.getItem("LoggedInUserData")
    );
    if (local) username = local.username;
    return this.http
      .get<UserResponse>(this.configURL + username)
      .pipe(catchError(this.handleErrors));
  }

  editUserData(userEditData) {
    let username: string = "";
    let local: LocalToken = JSON.parse(
      localStorage.getItem("LoggedInUserData")
    );
    if (local) username = local.username;
    return this.http
      .put<UserResponse>(this.configURL + username, userEditData)
      .pipe(catchError(this.handleErrors));
  }

  private handleErrors(errRes: HttpErrorResponse) {
    let errorMessage = "Unknown Error Occurred";
    if (errRes.error.errors) {
      return throwError(errorMessage);
    }
    switch (errRes.error.message) {
      case "NO_USERS":
        errorMessage = "No any users yet";
        break;
      case "USER_ALREADY_EXIST":
        errorMessage = "User already exist";
        break;
      case "USER_NOT_EXIST":
        errorMessage = "User not exist";
        break;
      case "USERNAME_OCCUPIED":
        errorMessage = "User occupied";
        break;
    }
    return throwError(errorMessage);
  }
}
