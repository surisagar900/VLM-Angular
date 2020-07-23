import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { tap, catchError } from "rxjs/operators";
import { BehaviorSubject, throwError, Observable } from "rxjs";
import { UserData } from "../shared/user-data.model";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

export interface TokenResponse {
  username: string;
  token: string;
  expireInSec: number;
  role: string;
}

export interface LocalToken {
  username: string;
  role: string;
  _token: string;
  _ExpiryDate: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  role: string;
}

export interface RegisterRequest {
  username: string;
  firstname: string;
  lastname: string;
  dob: Date;
  email: string;
  phone: number;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  loggedInUser = new BehaviorSubject<UserData>(null);
  private tokenTime: any;

  private configURL: string = environment.BaseURL + "user";

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  login(req: LoginRequest) {
    return this.http.post<TokenResponse>(this.configURL + "/auth", req).pipe(
      catchError(this.handleErrors),
      tap((response) => {
        this.handleToken(response);
      })
    );
  }

  autoLogin() {
    const userData: LocalToken = JSON.parse(
      localStorage.getItem("LoggedInUserData")
    );

    if (!userData) {
      return;
    }

    const loadedUser = new UserData(
      userData.username,
      userData.role,
      userData._token,
      new Date(userData._ExpiryDate)
    );
    if (loadedUser.token) {
      this.loggedInUser.next(loadedUser);
      const expiryDuration =
        new Date(userData._ExpiryDate).getTime() - new Date().getTime();
      this.autoLogOut(expiryDuration);
    }
  }

  logOut() {
    this.loggedInUser.next(null);
    localStorage.removeItem("LoggedInUserData");
    if (this.tokenTime) {
      clearTimeout(this.tokenTime);
    }
    this.tokenTime = null;
    this._snackBar.open("Logout Successfully !!", "close", {
      duration: 4000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
    this.router.navigate(["/"]);
  }

  autoLogOut(expirationDuration: number) {
    this.tokenTime = setTimeout(() => {
      this.logOut;
    }, expirationDuration);
  }

  register(req: RegisterRequest) {
    return this.http.post<TokenResponse>(this.configURL, req).pipe(
      catchError(this.handleErrors),
      tap((response) => {
        this.handleToken(response);
      })
    );
  }

  private handleErrors(errRes: HttpErrorResponse) {
    let errorMessage = "Unknown Error Occurred";
    if (errRes.error.errors) {
      return throwError(errorMessage);
    }
    switch (errRes.error.message) {
      case "USERNAME_NOT_FOUND":
        errorMessage = "Username does not exist";
        break;
      case "INCORRECT_PASSWORD":
        errorMessage = "Password is invalid";
        break;
      case "USER_ALREADY_EXIST":
        errorMessage = "User already exist";
        break;
    }
    return throwError(errorMessage);
  }

  private handleToken(res: TokenResponse) {
    const expiryDate = new Date(new Date().getTime() + res.expireInSec * 1000);
    const userData = new UserData(
      res.username,
      res.role,
      res.token,
      expiryDate
    );
    this.loggedInUser.next(userData);
    localStorage.setItem("LoggedInUserData", JSON.stringify(userData));
  }
}
