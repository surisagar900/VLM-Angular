import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./main/navbar/navbar.component";
import { HomeComponent } from "./main/home/home.component";
import { HomesliderComponent } from "./main/home/homeslider/homeslider.component";
import { MoviesSliderComponent } from "./main/home/movies-slider/movies-slider.component";
import { MovieCardComponent } from "./main/home/movies-slider/movie-card/movie-card.component";
import { MovieListComponent } from "./main/movie-list/movie-list.component";
import { MoviesComponent } from "./main/movies/movies.component";
import { MainComponent } from "./main/main.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { FooterComponent } from "./footer/footer.component";
import { AppMaterialModule } from "./app-material.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

export function translateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    HomeComponent,
    HomesliderComponent,
    MoviesSliderComponent,
    MoviesComponent,
    MovieCardComponent,
    MovieListComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SharedModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
