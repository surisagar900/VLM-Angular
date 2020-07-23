import { Injectable } from "@angular/core";
import { LocalToken } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  private localData: LocalToken = JSON.parse(
    localStorage.getItem("LoggedInUserData")
  );

  constructor() {}

  getUsernameLocal() {
    if (this.localData) return this.localData.username;
    return null;
  }
}
