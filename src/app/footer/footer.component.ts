import { Component, OnInit } from "@angular/core";
import { languages } from "src/assets/i18n/langs";
import { AppLangService } from "../shared/app-lang.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styles: [
    `
      .mat-select-value {
        color: white !important;
      }
    `,
  ],
})
export class FooterComponent implements OnInit {
  allLangs = languages;
  selectedLang: string;

  constructor(private appLangService: AppLangService) {}

  ngOnInit(): void {
    this.selectedLang = this.appLangService.setIt();
  }

  switchLanguage(language: string) {
    this.appLangService.switchLang(language);
  }
}
