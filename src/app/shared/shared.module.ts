import { NgModule } from "@angular/core";
import { TextshortPipe } from "./textshort.pipe";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";

export function translateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [TextshortPipe],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
  ],
  exports: [TextshortPipe, TranslateModule],
})
export class SharedModule {}
