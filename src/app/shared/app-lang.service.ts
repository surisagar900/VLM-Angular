import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class AppLangService {
  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang("en");
  }

  switchLang(lang: string) {
    localStorage.setItem("AppLang", lang);
  }

  setIt(): string {
    return localStorage.getItem("AppLang");
  }

  setLang() {
    let lang = this.setIt();
    this.translateService.use(lang);
  }
}
