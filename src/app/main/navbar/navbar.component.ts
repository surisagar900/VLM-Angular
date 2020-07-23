import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: [
    `
      .mat-toolbar-single-row {
        height: auto;
        padding: 10px 0 10px;
      }
      h1.navbar-brand {
        font-size: 30px;
      }
      .nav-btn {
        padding: 0 5px;
        line-height: 0;
      }
    `,
  ],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.loggedInUser.subscribe((res) => {
      this.isLoggedIn = !!res;
    });
  }

  onLogoutBtn() {
    this.authService.logOut();
  }
}
