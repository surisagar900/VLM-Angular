import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./main/home/home.component";
import { AuthComponent } from "./auth/auth.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { MovieListComponent } from "./main/movie-list/movie-list.component";
import { MoviesComponent } from "./main/movies/movies.component";
import { UserDashboardComponent } from "./main/user-dashboard/user-dashboard.component";
import { MainComponent } from "./main/main.component";
import { UserProfileComponent } from "./main/user-dashboard/user-profile/user-profile.component";
import { UserProfileEditComponent } from "./main/user-dashboard/user-profile-edit/user-profile-edit.component";
import { UserRecordsComponent } from "./main/user-dashboard/user-records/user-records.component";
import { UserGuard } from "./auth/user.guard";
import { AdminGuard } from "./auth/admin.guard";
import { AdminComponent } from "./admin/admin.component";
import { UserTableComponent } from "./admin/user-table/user-table.component";
import { MoviesTableComponent } from "./admin/movies-table/movies-table.component";
import { RecordsTableComponent } from "./admin/records-table/records-table.component";
import { AddMovieComponent } from "./admin/add-movie/add-movie.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "list/:type/:name",
        component: MovieListComponent,
      },
      {
        path: "movies/:name",
        component: MoviesComponent,
      },
      {
        path: "my",
        component: UserDashboardComponent,
        canActivate: [UserGuard],
        children: [
          { path: "profile", component: UserProfileComponent },
          { path: "profile/edit", component: UserProfileEditComponent },
          { path: "records", component: UserRecordsComponent },
        ],
      },
    ],
  },
  {
    path: "",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
    ],
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: "users", component: UserTableComponent },
      { path: "movies", component: MoviesTableComponent },
      { path: "records", component: RecordsTableComponent },
      { path: "addMovie", component: AddMovieComponent },
    ],
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
