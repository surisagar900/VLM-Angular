import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { LocalStorageService } from "../shared/local-storage.service";
import { environment } from "src/environments/environment";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface UserRecord {
  recordsId: number;
  takenDate: Date;
  returnDate: Date;
  fine: number;
  movieTitle: string;
}

@Injectable({
  providedIn: "root",
})
export class RecordsService {
  constructor(private http: HttpClient, private local: LocalStorageService) {}

  private configURL = environment.BaseURL + "user/";

  addRecordByUser(movieId: number) {
    let username: string = this.local.getUsernameLocal();
    let req = { username: username, movieId: movieId };
    return this.http
      .post(this.configURL + username + "/records", req)
      .pipe(catchError(this.handleErrors));
  }

  getUserRecords() {
    let username: string = this.local.getUsernameLocal();
    return this.http
      .get<UserRecord>(this.configURL + username + "/records")
      .pipe(catchError(this.handleErrors));
  }

  deleteRecord(recordId: number) {
    let username: string = this.local.getUsernameLocal();
    return this.http
      .delete(this.configURL + username + "/records/" + recordId)
      .pipe(catchError(this.handleErrors));
  }

  private handleErrors(errRes: HttpErrorResponse) {
    let errorMessage = "Unknown Error Occurred";
    if (errRes.error.errors) {
      return throwError(errorMessage);
    }
    switch (errRes.error.message) {
      case "NO_USERRECORDS":
        errorMessage = "No any user records yet";
        break;
      case "USERRECORD_ALREADY_EXIST":
        errorMessage = "user record already exist";
        break;
      case "USERRECORD_NOT_EXIST":
        errorMessage = "user record not exist";
        break;
    }
    return throwError(errorMessage);
  }
}
