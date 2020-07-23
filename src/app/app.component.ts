import { Component, OnInit, AfterContentChecked } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { languages } from "src/assets/i18n/langs";
import { AppLangService } from "./shared/app-lang.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
})
export class AppComponent implements OnInit, AfterContentChecked {
  constructor(
    private authService: AuthService,
    private appLang: AppLangService
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.appLang.switchLang("en");
  }

  ngAfterContentChecked() {
    this.appLang.setLang();
  }
}
