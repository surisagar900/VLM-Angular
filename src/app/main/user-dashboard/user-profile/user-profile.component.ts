import { Component, OnInit } from "@angular/core";
import { UserService, UserResponse } from "../../user.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styles: [],
})
export class UserProfileComponent implements OnInit {
  constructor(private userService: UserService) {}

  userData: UserResponse;

  ngOnInit(): void {
    this.userService.getUserData().subscribe((resData) => {
      this.userData = resData;
    });
  }
}
