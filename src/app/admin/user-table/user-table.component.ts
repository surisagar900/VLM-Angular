import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UserResponse } from "src/app/main/user.service";

@Component({
  selector: "app-user-table",
  templateUrl: "./user-table.component.html",
  styles: [],
})
export class UserTableComponent implements OnInit {
  constructor(private http: HttpClient) {}

  allUserData: UserResponse[] = [];

  private configURL = environment.BaseURL + "user";

  ngOnInit() {
    this.http
      .get<UserResponse[]>(this.configURL, {
        params: { showDeleted: "true" },
      })
      .subscribe((res) => (this.allUserData = res));
  }
}
