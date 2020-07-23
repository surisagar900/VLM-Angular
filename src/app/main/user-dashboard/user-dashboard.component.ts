import { Component, OnInit } from "@angular/core";
import { LocalStorageService } from "src/app/shared/local-storage.service";

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styles: [],
})
export class UserDashboardComponent implements OnInit {
  constructor(private local: LocalStorageService) {}

  username: string;

  ngOnInit(): void {
    this.username = this.local.getUsernameLocal();
  }
}
