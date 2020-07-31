import { Component, OnInit, AfterContentChecked } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { AppLangService } from "./shared/app-lang.service";
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
})
export class AppComponent implements OnInit, AfterContentChecked {
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private appLang: AppLangService,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {
    this.authService.autoLogin();
    this.appLang.switchLang("en");
  }

  ngAfterContentChecked() {
    this.appLang.setLang();
  }
}
