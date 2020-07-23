import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./main/navbar/navbar.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { HomeComponent } from "./main/home/home.component";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";
import { HomesliderComponent } from "./main/home/homeslider/homeslider.component";
import { MoviesSliderComponent } from "./main/home/movies-slider/movies-slider.component";
import { MovieCardComponent } from "./main/home/movies-slider/movie-card/movie-card.component";
import { TextshortPipe } from "./shared/textshort.pipe";
import { MovieListComponent } from "./main/movie-list/movie-list.component";
import { MoviesComponent } from "./main/movies/movies.component";
import { CarouselModule } from "ngx-owl-carousel-o";
import { UserDashboardComponent } from "./main/user-dashboard/user-dashboard.component";
import { MainComponent } from "./main/main.component";
import { AuthInterceptor } from "./auth/auth-interceptor.service";
import { UserActionsComponent } from "./main/user-dashboard/user-actions/user-actions.component";
import { UserProfileComponent } from "./main/user-dashboard/user-profile/user-profile.component";
import { UserRecordsComponent } from "./main/user-dashboard/user-records/user-records.component";
import { UserProfileEditComponent } from "./main/user-dashboard/user-profile-edit/user-profile-edit.component";
import { AdminComponent } from "./admin/admin.component";
import { TopNavbarComponent } from "./admin/top-navbar/top-navbar.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { FooterComponent } from "./footer/footer.component";
import { AgGridModule } from "ag-grid-angular";
import { UserTableComponent } from "./admin/user-table/user-table.component";
import { MoviesTableComponent } from "./admin/movies-table/movies-table.component";
import { RecordsTableComponent } from "./admin/records-table/records-table.component";
import { AppMaterialModule } from "./app-material.module";
import { AddMovieComponent } from './admin/add-movie/add-movie.component';

export function translateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HomesliderComponent,
    MoviesSliderComponent,
    MovieCardComponent,
    TextshortPipe,
    MovieListComponent,
    MoviesComponent,
    UserDashboardComponent,
    MainComponent,
    UserActionsComponent,
    UserProfileComponent,
    UserRecordsComponent,
    UserProfileEditComponent,
    AdminComponent,
    TopNavbarComponent,
    FooterComponent,
    UserTableComponent,
    MoviesTableComponent,
    RecordsTableComponent,
    AddMovieComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule.withComponents([]),
    CarouselModule,
    AppMaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
